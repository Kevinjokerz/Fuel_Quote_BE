import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { UserProfile, UserProfileDoc } from '../models'
import { CreateUserDTO } from '../dtos'
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
        const userInfo = { name: existedUser.name, username, city: existedUser.address.city, state: existedUser.address.city }
        const accessToken = sign(userInfo, 'secretKey');
        return accessToken;
    }
}

const authService = new AuthService();

export { authService };
