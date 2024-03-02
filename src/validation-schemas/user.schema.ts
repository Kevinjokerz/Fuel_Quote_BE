import Joi, { object } from 'joi';
import { CreateUserDTO } from '../dtos';

interface CreateUserPayload {
    payload: CreateUserDTO;
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
                state: Joi.string().required(),
                zipcode: Joi.string().required(),
            })
        })
        .required(),
});

;
export { userCreateValidator };