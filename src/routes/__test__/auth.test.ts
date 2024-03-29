import request from 'supertest';
import app from '../../app';

describe("Authentication Features", () => {
    describe("Register Feature", () => {
        const path = '/api/auth/register';
        it('must have a route handler listening to /api/auth/register for post request', async () => {
            const response = await request(app).post(path).send({});
            expect(response.status).not.toEqual(404);
        })

        it('must return a bad request error if username is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": 123456,
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })
        
        it('must return a bad request error the client sending no payload', async () => {
            const response = await request(app).post(path).send({});
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error if the payload is empty', async () => {
            const data = { }
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error if name is not a string', async () => {
            const data = {
                "name": 123456,
                "username": "kevinjpro123",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if name is having less than 2 character', async () => {
            const data = {
                "name": "K",
                "username": "kevinjpro123",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if name is having more than 20 character', async () => {
            const data = {
                "name": "asdfasdfasdfasdfsdfasdfasdfasdfasdfasdfasd",
                "username": "kevinjpro123",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if name is missing', async () => {
            const data = {
                "name": "",
                "username": "kevinjpro123",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if username is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": 123456789,
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if username is having less than 4 character', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kev",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if name is having special character', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123!!!",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        it('must return a bad request error if name is having more than 20 character', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro12345678913245678966",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            }
            const response = await request(app).post(path).send({payload : data})
            expect(response.status).toEqual(400)
        })

        

        it('must return a conflict error if the username is already existed', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            //register the first time
            await request(app).post(path).send({ payload: data });
            //register the second time with the same user info
            const respose = await request(app).post(path).send({ payload: data });
            expect(respose.status).toEqual(409);
        })

        it('must return a bad request if the password is empty', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request if the password is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": 123456789,
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request if the password is containing less than 8 characters', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "1234567",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request if the password is containing more than 20 characters', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456789123456789123456789",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })
        

        it('must return a bad request if the avatar is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456789",
                "avatar" : 123456789,
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the email is invalid', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "12345",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the email is empty', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the email is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": 123456,
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the phone number is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "test@gmail.com",
                "phoneNumber": 8329385610,
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the phone number is missing', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "test@gmail.com",
                "phoneNumber": "",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the adress object is empty', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "test@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the street adress is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "test@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": 123456,
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the street adress is empty', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "test@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })

        it('must return bad request if the city is not a string', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "123456",
                "email": "test@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": 123456,
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(400);
        })
        
        it('must return a 204 (Created) status code when it gets valid user information', async () => {
            const data = {
                "name": "Khoi Vo",
                "username": "kevinjpro123",
                "password": "12345678",
                "email": "Test1@gmail.com",
                "phoneNumber": "8329385610",
                "address": {
                    "street": "8815 Beawood Dr",
                    "city": "Houston",
                    "state": "TX",
                    "zipcode": "77083"
                }
            };
            const response = await request(app).post(path).send({ payload: data });
            expect(response.status).toEqual(201);
        })

    })

    describe("Login Feature", () => {
        const pathLogin = '/api/auth/login';
        const pathRegister = '/api/auth/register';
        const dataRegister = {
            "name": "Khoi Vo",
            "username": "kevinjpro123",
            "password": "12345678",
            "email": "Test1@gmail.com",
            "phoneNumber": "8329385610",
            "address": {
                "street": "8815 Beawood Dr",
                "city": "Houston",
                "state": "TX",
                "zipcode": "77083"
            }
        };
        
        it('must have a route handler listening to /api/auth/register for post request', async () => {
            const response = await request(app).post(pathLogin).send({});
            expect(response.status).not.toEqual(404);
        })

        it('must return a not found error when the user is not existed', async () => {
            const data = {
                "username": "kevinjpro",
                "password": "12345678",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response =await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(404);
        })

        it('must return a bad request error when the user enters the wrong password', async () => {
            const data = {
                "username": "kevinjpro123",
                "password": "1234567890",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user enters username that is not a string', async () => {
            const data = {
                "username": 123456,
                "password": "1234567890",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user enters less than 2 character for username', async () => {
            const data = {
                "username": "k",
                "password": "1234567890",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user enters more than 20 characters for username', async () => {
            const data = {
                "username": "kevinjpro123456789123456",
                "password": "1234567890",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        
        it('must return a bad request error when the user left username empty', async () => {
            const data = {
                "username": "",
                "password": "1234567890",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user enters password that is not a string', async () => {
            const data = {
                "username": "kevinjpro123",
                "password": 123456,
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user enters more than 20 character for password', async () => {
            const data = {
                "username": "kevinjpro123",
                "password": "1234567891324567891234569789",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user enters less than 2 character for password', async () => {
            const data = {
                "username": "kevinjpro123",
                "password": "1",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a bad request error when the user left password empty', async () => {
            const data = {
                "username": "kevinjpro123",
                "password": "",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(400);
        })

        it('must return a 200 if the user enter username and password in a correct format', async () => {
            const data = {
                "username": "kevinjpro123",
                "password": "12345678",
            };
            await request(app).post(pathRegister).send({ payload: dataRegister });
            const response = await request(app).post(pathLogin).send({ payload : data });
            expect(response.status).toEqual(200);
        })

    })

    describe("Login Feature", () => {
        const pathLogin = '/api/auth/login';
        const pathRegister = '/api/auth/register';
        const pathUpdatePassword = '/api/auth/change-password';
        const dataRegister = {
            "name": "Khoi Vo",
            "username": "kevinjpro123",
            "password": "12345678",
            "email": "Test1@gmail.com",
            "phoneNumber": "8329385610",
            "address": {
                "street": "8815 Beawood Dr",
                "city": "Houston",
                "state": "TX",
                "zipcode": "77083"
            }
        };

        it('must have a route handler listening to /api/auth/change-password for patch request', async () => {
            const response = await request(app).patch(pathUpdatePassword).send({});
            expect(response.status).not.toEqual(404);
        })

        it('must only access via authentication key', async () => {
            const response = await request(app).patch(pathUpdatePassword).send({});
            expect(response.status).toEqual(400);
        })



    })
})