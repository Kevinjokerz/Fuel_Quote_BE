import { NextFunction } from 'express';
import { UserProfile, UserProfileDoc } from '../models'
import { authService } from '../services'
import { CatchAsyncDecorator } from '../decorators'
import { UpdateProfileDTO } from '../dtos'

@CatchAsyncDecorator(UserService.name)
class UserService {
    async getProfileByUsername(username: string) {
        const existedUser = await UserProfile.findOne({ username });
        if (!existedUser) {
            throw new Error('User is not existed!!');
        }
        return existedUser;
    }

    async editProfile(username : string, dto: UpdateProfileDTO) {
        const existedUser = await UserProfile.findOne({ username });
        if (!existedUser) {
            throw new Error('User is not existed!!');
        }
        existedUser.name = dto.name;
        existedUser.avatar = dto.avatar || 'default URL';
        existedUser.email = dto.email;
        existedUser.phoneNumber = dto.phoneNumber;
        existedUser.address = dto.address;
        await existedUser.save();
        return existedUser;
    }
}

const userService = new UserService();

export { userService };