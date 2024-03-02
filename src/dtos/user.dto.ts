interface CreateUserDTO {
    name: string;
    username: string;
    password: string;
    avatar?: string;
    email: string;
    phoneNumber: string;
    address: { street: string, city: string, state: string, zipcode: string };
}

export {CreateUserDTO};