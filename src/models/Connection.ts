import * as mongoose from 'mongoose';
import { model, AggregatePaginateModel } from 'mongoose';
import { PreferenceInterface } from "../interfaces/modelInterfaces/PreferenceInterface";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const ConnectionSchema = new Schema({
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
mongoose.plugin(aggregatePaginate);

export default model<PreferenceInterface, AggregatePaginateModel<any>>('Connection', ConnectionSchema);