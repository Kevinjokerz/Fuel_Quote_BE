import Joi, { object } from 'joi';
import { CreateUserDTO, LoginDTO, UpdatePasswordDTO } from '../dtos';

interface CreateUserPayload {
    payload: CreateUserDTO;
}

interface LoginPayload {
    payload : LoginDTO
}

interface UpdatePasswordPayload {
    payload : UpdatePasswordDTO
}

const userCreateValidator = Joi.object<CreateUserPayload>().keys({
    payload: Joi.object<CreateUserDTO>()
        .keys({
            name: Joi.string().min(2).max(20).required(),
            username: Joi.string().alphanum().min(4).max(20).required(),
            password: Joi.string().min(8).max(20).required(),
            avatar: Joi.string().optional(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().required(),
            address: Joi.object().keys({
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().min(2).max(2).required(),
                zipcode: Joi.string().required(),
            })
        })
        .required(),
});

const userLoginValidator = Joi.object<LoginPayload>().keys({
    payload: Joi.object<LoginDTO>()
    .keys({
        username : Joi.string().min(2).max(20).required(),
        password: Joi.string().min(8).max(20).required(),
    })
    .required(),
});

const updatePasswordValidator = Joi.object<UpdatePasswordPayload>().keys({
    payload: Joi.object<UpdatePasswordDTO>()
    .keys({
        oldPassword : Joi.string().min(8).max(20).required(),
        newPassword : Joi.string().min(8).max(20).required(),
    })
    .required(),
});

export { userCreateValidator, userLoginValidator, updatePasswordValidator };