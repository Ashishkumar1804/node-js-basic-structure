import * as mongoose from 'mongoose';
import { model, AggregatePaginateModel } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
import { HotelBookingInterface } from '../interfaces/modelInterfaces/HotelBookingInterface';
const Schema = mongoose.Schema;

const HotelBooking = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        default: null
    },
    booking_id: {
        type: String,
        default: null
    },
    providerConfirmationId: {
        type: String,
        default: null
    },
    associatedRecords: [{
        reference: {
            type: String,
            default: null
        },
        originSystemCode: {
            type: String,
            default: null
        }
    }],
    time_stamp: {
        type: String,
        default: Math.round(new Date().getTime())
    },
}, {
    timestamps: { createdAt: 'created_at' }
});




mongoose.plugin(aggregatePaginate);
HotelBooking.set('toObject', { virtuals: true })
HotelBooking.set('toJSON', { virtuals: true })

export default model<HotelBookingInterface, AggregatePaginateModel<any>>('HotelBooking', HotelBooking);

