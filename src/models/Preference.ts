import * as mongoose from 'mongoose';
import { model, AggregatePaginateModel } from 'mongoose';
import { PreferenceInterface } from "../interfaces/modelInterfaces/PreferenceInterface";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const PreferenceSchema = new Schema({
    name: {
        type: String,
        require: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

mongoose.plugin(aggregatePaginate);
PreferenceSchema.set('toObject', { virtuals: true })
PreferenceSchema.set('toJSON', { virtuals: true })

export default model<PreferenceInterface, AggregatePaginateModel<any>>('Preference', PreferenceSchema);