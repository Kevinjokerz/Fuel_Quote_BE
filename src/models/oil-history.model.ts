import { number, string } from 'joi';
import mongoose, { Schema, Document, Model, CallbackWithoutResultAndOptionalError } from 'mongoose';
import { UserProfile } from './user.model';

interface OilHistoryInterface {
    user_username: string;
    price: number;
    currency: string;
    state: string;
}

interface OilHistoryDoc extends OilHistoryInterface, Document {

}

interface OilHistoryModel extends Model<OilHistoryDoc> { }

type OilHistorySchema = Schema<OilHistoryDoc, OilHistoryModel>;

const oilHistorySchema: OilHistorySchema = new Schema(
    {
        user_username: {
            type: String,
            ref: UserProfile.collection.collectionName,
            foreignField: 'username',
            required: false,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            },
        },
    },
);

oilHistorySchema.pre('save', function (done: CallbackWithoutResultAndOptionalError) {
    done();
})

oilHistorySchema.index({ username: 1, state: 1 });

const OilHistory: OilHistoryModel = mongoose.model<OilHistoryDoc, OilHistoryModel>(
    'OilHistory',
    oilHistorySchema,
    'OilHistory',
)

export { OilHistoryInterface, OilHistory, OilHistoryDoc };