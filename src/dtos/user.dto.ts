interface CreateUserDTO {
    name: string;
    username: string;
    password: string;
    avatar?: string;
    email: string;
    phoneNumber: string;
    address: { street: string, city: string, state: string, zipcode: string };
}

interface UpdateProfileDTO {
    name: string;
    avatar?: string;
    email: string;
    phoneNumber: string;
    address: { street: string, city: string, state: string, zipcode: string };
}

interface UpdatePasswordDTO {
    oldPassword: string;
    newPassword : string;
    newPasswordConfirm : string;
}

interface LoginDTO {
    username : string;
    password : string;
}


export {CreateUserDTO, UpdateProfileDTO, UpdatePasswordDTO, LoginDTO};