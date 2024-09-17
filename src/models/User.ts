import * as mongoose from 'mongoose';
import { model, AggregatePaginateModel } from 'mongoose';
import { UserInterface } from '../interfaces/modelInterfaces/UserInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const User = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    username: {
        type: String,
        default: null
    },
    profile_verified: {
        type: Boolean,
        default: false
    },
    ssid: {
        type: String,
        default: null,
    },
    login_by: {
        type: String,
        enum: ['manual', 'google', 'apple'],
        default: 'manual'
    },
    password: {
        type: String,
        default: null,
        select: false
    },
    first_name: {
        type: String,
        default: null
    },
    middle_name: {
        type: String,
        default: null
    },
    profile_image: {
        type: String,
        default: null
    },
    is_profile_completed: {
        type: Boolean,
        default: false,
    },
    preferences: [
        {
            type: mongoose.Types.ObjectId,
            default: null
        }
    ],
    last_name: {
        type: String,
        default: null
    },
    phone: {
        type: Number,
        default: null
    },
    otp: {
        otp: {
            type: String,
            default: null
        },
        is_expired: {
            type: Boolean,
            default: false
        },
        expiration_time: {
            type: Number,
            default: null
        },
        is_verified: {
            type: Boolean,
            default: false
        },
    },
    gender: {
        type: String,
        enum: ['man', 'women', 'transgender_women', 'transgender_men', 'genderqueer', 'other', 'no']
    },
    ethnicity: {
        type: String,
        enum: ['american_indian', 'black', 'asian_american', 'hispanic ', 'native_hawaiian', 'white_american', 'no']
    },
    date_of_birth: {
        type: Date,
        default: null
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    delete_at: {
        type: Number,
        default: null
    },
    last_login: {
        type: Date,
        default: null
    },
    is_locked: {
        type: Boolean,
        default: false
    },
    terms_accepted: {
        type: Boolean,
        require: true,
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

mongoose.plugin(aggregatePaginate);
User.set('toObject', { virtuals: true })
User.set('toJSON', { virtuals: true })

export default model<UserInterface, AggregatePaginateModel<any>>('User', User);