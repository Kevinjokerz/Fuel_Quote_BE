import { required, string } from 'joi';
import mongoose, { Schema, Document, Model, CallbackWithoutResultAndOptionalError } from 'mongoose';

interface UserProfileInterface {
    name: string;
    username: string;
    password : string;
    avatar?: string;
    email: string;
    phoneNumber: string;
    address: { street: string, city: string, state: string, zipcode: string };
}

interface UserProfileDoc extends UserProfileInterface, Document {

}

interface UserProfileModel extends Model<UserProfileDoc> { }

type UserProfileSchema = Schema<UserProfileDoc, UserProfileModel>;

const userProfileSchema: UserProfileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
            default: '',
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: {
                street: { type: String, required: true,},
                city: { type: String, required: true,},
                state: {type: String, required: true,},
                zipcode: {type: String, required: true,},
            },
            _id : false,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.password;
            },
        },
    },
);

userProfileSchema.pre('save', function (done: CallbackWithoutResultAndOptionalError) {
    done();
});

userProfileSchema.index({ username: 1 }, { unique: true });
userProfileSchema.index({email: 1}, {unique: true});

const UserProfile: UserProfileModel = mongoose.model<UserProfileDoc, UserProfileModel>(
    'UserProfile',
    userProfileSchema,
    'UserProfile',
);

export { UserProfileInterface, UserProfile, UserProfileDoc };