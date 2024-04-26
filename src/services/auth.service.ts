import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserProfile, UserProfileDoc } from '../models'
import { CreateUserDTO, UpdatePasswordDTO, LoginDTO } from '../dtos'
import { CatchAsyncDecorator } from '../decorators'
import { ConflictError, BadRequestError, NotFoundError, UnAuthorizedError } from '../types/http-error.type'

@CatchAsyncDecorator(AuthService.name)
class AuthService {

    async register(dto: CreateUserDTO) {
        const { username, password } = dto;
        const userInfo = await UserProfile.findOne({ username });
        if (userInfo) {
            throw new ConflictError('User is already existed!!');
        }
        const hashPassword = await hash(password, 10);
        dto.password = hashPassword
        const newUser = await UserProfile.create(dto);
        return newUser;
    }

    async login(dto: LoginDTO) {
        const { username, password } = dto;
        const existedUser = await UserProfile.findOne({ username });
        if (!existedUser) {
            throw new NotFoundError('User is not existed!!');
        }
        const passwordCheck = await compare(password, existedUser.password);
        if (!passwordCheck) {

            throw new BadRequestError('Wrong Password!!');
        }
        const userInfo = { name: existedUser.name, username, city: existedUser.address.city, state: existedUser.address.state }
        const accessToken = sign(userInfo, 'secretKey', { expiresIn: '1d' });
        return accessToken;
    }

    async updatePassword(username: string, dto: UpdatePasswordDTO) {
        const existedUser = await UserProfile.findOne({ username });
        if (!existedUser) {
            throw new NotFoundError('User is not existed!!');
        }
        const { oldPassword, newPassword, newPasswordConfirm } = dto;
        if (oldPassword === newPassword) {
            throw new BadRequestError('New password cannot be the same as the old password');
        }
        if (newPassword !== newPasswordConfirm) {
            throw new BadRequestError('New password and Confirm New Password does not match');
        }
        const passwordCheck = await compare(oldPassword, existedUser.password);
        if (!passwordCheck) {
            throw new BadRequestError('Wrong current password!!');
        }
        const hashPassword = await hash(newPassword, 10);
        existedUser.password = hashPassword;
        await existedUser.save();
        return true;
    }
}

const authService = new AuthService();

export { authService };
