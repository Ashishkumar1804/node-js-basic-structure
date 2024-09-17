import { NextFunction } from "express";
import { ServiceResponseInterface } from "../../interfaces/ServiceResponseInterface";
import Preference from "../../models/Preference";
import { serviceResponse } from "../../utils/ServiceResponse";
import * as mongoose from "mongoose";
import { ObjectId } from "mongoose";
import User from "../../models/User";
import Connection from "../../models/Connection"
import FileUploadHelper from "../../helpers/FileUploadHelper";
class PreferenceService {

    /**
     * Preferences
     * @returns 
     */
    public async getPreferences(): Promise<ServiceResponseInterface> {
        const preferences = await Preference.find({});
        return serviceResponse(false, "Preferences List", { preferences: preferences });
    }


    /**
     * Store Preference
     * @param data 
     * @param next 
     * @returns 
     */
    public async storePreference(data: any, next: NextFunction): Promise<ServiceResponseInterface> {
        await Preference.create({ name: data.name });
        const preferences = await this.getPreferences();
        return serviceResponse(false, "Created", preferences.data);
    }


    /**
     * 
     * @param userId 
     * @param preferences 
     * @returns 
     */
    public async suggestedUsers(userId: ObjectId, preferences: [ObjectId], page: any): Promise<ServiceResponseInterface> {
        const options = {
            page: page || 1,
            limit: 10,
            collation: {
                locale: 'en',
            }
        }

        let query = [
            {
                '$unwind': { 'path': '$preferences', 'preserveNullAndEmptyArrays': true }
            }, {
                '$match': { 'preferences': { '$in': preferences }, '_id': { $ne: userId } }
            }, {
                '$group': {
                    '_id': '$_id', 'first_name': { '$first': '$first_name' },
                    'last_name': { '$first': '$last_name' }, 'email': { '$first': '$email' },
                    'profile_image': { '$first': '$profile_image' }
                }
            }
        ];
        let aggregate = User.aggregate(query);
        let suggestedUsers = await User.aggregatePaginate(aggregate, options);
        suggestedUsers.docs.map(item => {
            if (item.profile_image) {
                item.profile_image = FileUploadHelper.getSignedS3Urls(item.profile_image)
                return item;
            } else {
                return item;
            }
        });
        return serviceResponse(false, "Success", suggestedUsers);
    }


    /**
     * Follow Users
     * @param userId 
     * @param userIds 
     * @returns 
     */
    public async followUsers(userId: ObjectId, userIds: any): Promise<ServiceResponseInterface> {
        const followee = userIds;
        let connection = await Connection.findOne({ followee: followee, follower: userId });
        if (!connection) {
            connection = await Connection.create({ followee: followee, follower: userId });
        }
        return serviceResponse(false, "Followed user successfully!", connection);
    }

    /**
     * 
     * @param follower 
     * @param followee 
     * @param next 
     * @returns 
     */
    public async unFollowUsers(follower: string, followee: string, next: NextFunction): Promise<ServiceResponseInterface> {
        const followerId = new mongoose.Types.ObjectId(follower);
        const followeeId = new mongoose.Types.ObjectId(followee);
        await Connection.deleteOne({ follower: followerId, followee: followeeId });
        return serviceResponse(false, "User un-followed successfully!", {});
    }

    /**
     * mass Follow Users
     * @param param0 
     */
    async massFollowUsers({ userId, followees }: { userId: string, followees: [string] }): Promise<ServiceResponseInterface> {
        let data = [];
        if (followees.length > 0) {
            data = followees.map(item => {
                return { follower: userId, followee: item }
            })
        }
        if (data.length > 0) {
            let connections = await Connection.insertMany(data);
        }
        return serviceResponse(false, "User un-followed successfully!", {}, "SUCCESS");
    }

}

export default new PreferenceService();