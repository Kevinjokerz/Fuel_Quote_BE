import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { UserProfile, UserProfileDoc } from '../models'
import { CreateUserDTO, UpdatePasswordDTO } from '../dtos'
import { getMessageError, getFunctionCallerName } from '../utils';
import { CatchAsyncDecorator } from '../decorators'

@CatchAsyncDecorator(AuthService.name)
class AuthService {

    async register(dto: CreateUserDTO) {
        const { username, password } = dto;
        const userInfo = await UserProfile.findOne({ username });
        if (userInfo) {
            throw new Error('User is already existed!!');
        }
        const hashPassword = await hash(password, 10);
        dto.password = hashPassword
        const newUser = await UserProfile.create(dto);
        return newUser;
    }

    async login(username: string, password: string) {
        const existedUser = await UserProfile.findOne({ username });
        if (!existedUser) {
            throw new Error('User is not existed!!');
        }
        const passwordCheck = await compare(password, existedUser.password);
        if (!passwordCheck) {

            throw new Error('Wrong Password!!');
        }
        const userInfo = { name: existedUser.name, username, city: existedUser.address.city, state: existedUser.address.state }
        const accessToken = sign(userInfo, 'secretKey', {expiresIn : '1d'});
        return accessToken;
    }

    async updatePassword(username: string, dto: UpdatePasswordDTO) {
        const existedUser = await UserProfile.findOne({ username });
        if (!existedUser) {
            throw new Error('User is not existed!!');
        }
        const { oldPassword, newPassword } = dto;
        if (oldPassword == newPassword) {
            throw new Error('New password cannot be the same as the old password');
        }
        const passwordCheck = await compare(oldPassword, existedUser.password);
        if (!passwordCheck) {

            throw new Error('Wrong current password!!');
        }
        const hashPassword = await hash(newPassword, 10);
        existedUser.password = hashPassword;
        await existedUser.save();
        return true;
    }
}

const authService = new AuthService();

export { authService };
