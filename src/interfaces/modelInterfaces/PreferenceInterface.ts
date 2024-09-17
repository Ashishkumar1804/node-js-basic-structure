import { Document, ObjectId } from 'mongoose';
export interface PreferenceInterface extends Document {
    _id: ObjectId,
    name: string,
    created_at: Date,
    updated_at: Date,
}  