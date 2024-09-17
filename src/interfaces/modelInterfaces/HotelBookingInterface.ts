import { Document, ObjectId } from 'mongoose';
export interface HotelBookingInterface extends Document {
    _id: ObjectId,
    user_id: ObjectId,
    type: string,
    booking_id: string,
    providerConfirmationId: string,
    associatedRecords: [{ reference: string, originSystemCode: string }],
    time_stamp: string,
    created_at: Date
}