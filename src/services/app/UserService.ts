import { NextFunction } from "express";
import { ServiceResponseInterface } from "../../interfaces/ServiceResponseInterface";
import { deleteAccount, UserInterface } from "../../interfaces/modelInterfaces/UserInterface"
import { serviceResponse } from "../../utils/ServiceResponse";
import * as mongoose from "mongoose";
import User from "../../models/User";
import FileUploadHelper from "../../helpers/FileUploadHelper";
import Connection from "../../models/Connection";
import { ObjectId } from "mongoose";
import Auth from "../../utils/Auth";
import JwtHelper from "../../helpers/JwtHelper";
class UserService {

    /*******************************************************************************************************************
     *                                             CLASS DESCRIPTION
     * This class is responsible for user related data                                                                 *
     * functions in the class                                                                                          *
     * @method userInfo -  Return User Profile Info along with meta data.                                              *
     * @method getFollowingsOrFollowers -  Return Followers Or the Followings of a user. takes userId as the Param.    *
     * @method followerCount - Returns the number of followers of a user, Takes userId as the Param.                   *
     * @method followeeCount - Returns the number of Following of a user, Takes userId as the Param.                   *                  *
     * @method followerQuery and @method followingQuery return queries for the getFollowingOrFollowers method.  
     * @method searchUser
     * @method changePassword 
     * @method deleteAccount                                                                                           *
     *******************************************************************************************************************/



    /**
     * Get User Info
     * @param id  User Id
     * @param next 
     * @returns 
     */
    async userInfo(id: string): Promise<ServiceResponseInterface> {
        const userId = new mongoose.Types.ObjectId(id);
        let user = await User.findOne({ _id: userId }).populate('preferences', 'name', 'Preference');
        if (!user) {
            return serviceResponse(true, "USER NOT FOUND", {}, "USER_NOT_FOUND");
        }
        if (user && user.profile_image) {
            user.profile_image = FileUploadHelper.getSignedS3Urls(user.profile_image);
        }
        let responseObject = {
            followersCount: user ? await this.followerCount(user._id) : 0,
            followingCount: user ? await this.followeeCount(user._id) : 0,
            likes: 0,
            trips: 0
        }
        return serviceResponse(false, "success!", user ? { user, meta: responseObject } : {}, "SUCCESS");
    }


    /**
     * Get followers Or Followings
     * @param param0 
     * @returns 
     */
    async getFollowingsOrFollowers({ userId, type, page }: { userId: string, type: string, page: any }): Promise<ServiceResponseInterface> {
        const options = {
            page: page || 1,
            limit: 10,
            collation: {
                locale: 'en',
            },
            sort: {
                created_at: -1
            }
        }
        let query: any = [];
        let message: string = "";
        if (type === 'FOLLOWER') {
            message = "Follower List!";
            query = this.followerQuery(userId);
        }
        if (type === 'FOLLOWING') {
            message = "Following List!";
            query = this.followingQuery(userId);
        }
        let aggregate = Connection.aggregate(query);
        let connections: any = await Connection.aggregatePaginate(aggregate, options);
        if (connections) {
            connections.docs = connections.docs.map((item: any) => {
                if (item.profile_image) {
                    item.profile_image = FileUploadHelper.getSignedS3Urls(item.profile_image);
                }
                return item;
            })
        }
        return serviceResponse(false, message, connections ? connections : {}, "SUCCESS");
    }


    /**
     * Follower Count
     * @param userId 
     */
    async followerCount(userId: string | ObjectId) {
        const count = await Connection.find({ followee: userId }).countDocuments();
        return count;
    }

    /**
     * Followee Count
     * @param userId 
     */
    async followeeCount(userId: string | ObjectId) {
        const count = await Connection.find({ follower: userId }).countDocuments();
        return count;
    }

    /**
     * Delete User Account
     * @param userId 
     * @param username 
     * @param password 
     * @returns 
     */
    async deleteAccount(userId: string | ObjectId, username: string, password: string, loginBy: string): Promise<ServiceResponseInterface> {
        if (loginBy === 'manual') {
            const { error, message } = await this.ValidateUser(userId, username, password);
            if (error) {
                return serviceResponse(true, message, {}, "FAILED")
            }
        }
        let currentTime = new Date().getTime();
        let days = 5 * 24 * 60 * 60000;
        let deleteAt = currentTime + days;
        const date = new Date(deleteAt);
        await User.updateOne({ _id: userId }, { "$set": { delete_at: deleteAt, is_deleted: true } });
        return serviceResponse(false, `Account will be deleted on ${date}`, { date: date }, "SUCCESS")
    }


    async ValidateUser(userId: string | ObjectId, username: string, password: string): Promise<{ error: boolean, message: string }> {
        let user: UserInterface = await User.findOne({ username: username }).select('+password');
        if (!user) {
            return { error: true, message: "User Not Found" };
        }
        const checkPassword: Boolean = await Auth.comparePassword(password, user.password);
        if (!checkPassword) {
            return { error: true, message: "Invalid Password" };
        }
        if (user._id.toString() != userId.toString()) {
            console.log(user._id);
            console.log(userId)
            return { error: true, message: "You are not authorized for this action!" };
        }
        return { error: false, message: "Success" }
    }

    /**
     * Change Password
     * @param userId 
     * @param old_password 
     * @param new_password 
     * @param next 
     * @returns 
     */
    async changePassword(userId: string | ObjectId, old_password: string, new_password: string, next: NextFunction): Promise<ServiceResponseInterface> {
        const user: UserInterface = await User.findOne({ _id: userId }).select('+password').populate('preferences', 'name', 'Preference');;
        const checkPassword: Boolean = await Auth.comparePassword(old_password, user.password);
        if (!checkPassword) {
            return serviceResponse(true, "Invalid Old Password", {}, "PASSWORD_NOT_MATCH");
        }
        const password = await Auth.encryptPassword(new_password);
        user.password = password;
        let userObj = {
            _id: user._id,
            first_name: user.first_name,
            created_at: user.created_at,
            account_locked: user.is_locked
        }
        let jwtToken = await Auth.getToken(userObj, 100000, next);
        user.last_login = new Date();
        await user.save();
        user.password = undefined;
        const responseData = { user, token: jwtToken };
        return serviceResponse(false, "Password changed Successfully!", responseData, "SUCCESS");
    }


    /**
     * Search User
     * @param userId 
     * @param search 
     * @param page 
     * @returns 
     */
    async searchUser(userId: string | ObjectId, search: string, page: number): Promise<ServiceResponseInterface> {
        const options = {
            page: page || 1,
            limit: 10,
            collation: {
                locale: 'en',
            },
            lean: true,
            sort: {
                time_stamp: -1
            }
        };
        const query = this.searchQuery(userId, search);
        let userAggregate = User.aggregate(query);
        let users = await User.aggregatePaginate(userAggregate, options);
        if (users) {
            users.docs = users.docs.map((item: any) => {
                if (item.profile_image) {
                    item.profile_image = FileUploadHelper.getSignedS3Urls(item.profile_image);
                }
                return item;
            })
        }
        return serviceResponse(false, "Users", users, "SUCCESS");
    }


    /**
     * Following Query
     * @param userId 
     * @returns 
     */
    private followingQuery(userId: string) {
        let query = [
            {
                '$match': {
                    'follower': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$lookup': {
                    'from': 'users', 'localField': 'followee', 'foreignField': '_id', 'as': 'followee'
                }
            }, {
                '$unwind': {
                    'path': '$followee', 'preserveNullAndEmptyArrays': false
                }
            }, {
                '$project': {
                    'followee': true
                }
            }, {
                '$addFields': {
                    'first_name': '$followee.first_name', 'middle_name': '$followee.middle_name', 'last_name': '$followee.last_name', 'profile_image': '$followee.profile_image', 'email': '$followee.email', 'followee_id': '$followee._id'
                }
            }, {
                '$project': {
                    '_id': true, 'first_name': true, 'middle_name': true, 'last_name': true, 'profile_image': true, 'email': true, 'followee_id': true
                }
            }
        ];

        return query;
    }


    /**
     * Follower Query
     * @param userId 
     * @returns 
     */
    private followerQuery(userId: string) {
        let query = [
            {
                '$match': {
                    'followee': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$lookup': {
                    'from': 'users', 'localField': 'follower', 'foreignField': '_id', 'as': 'follower'
                }
            }, {
                '$unwind': {
                    'path': '$follower', 'preserveNullAndEmptyArrays': false
                }
            }, {
                '$project': {
                    'follower': true
                }
            }, {
                '$addFields': {
                    'first_name': '$follower.first_name', 'middle_name': '$follower.middle_name', 'last_name': '$follower.last_name', 'profile_image': '$follower.profile_image', 'email': '$follower.email', 'follower_id': '$follower._id'
                }
            }, {
                '$project': {
                    '_id': true, 'first_name': true, 'middle_name': true, 'last_name': true, 'profile_image': true, 'email': true, 'follower_id': true
                }
            }
        ];

        return query;
    }


    /**
 * Search Query
 * @param userId 
 * @param search 
 * @returns 
 */
    private searchQuery(userId: string | ObjectId, search: string) {
        return [
            {
                "$match": {
                    "$and": [
                        { _id: { $ne: userId } },
                        {
                            "$or": [
                                {
                                    first_name: {
                                        '$regex': search,
                                        '$options': 'i'
                                    }
                                },
                                {
                                    last_name: {
                                        '$regex': search,
                                        '$options': 'i'
                                    }
                                },
                                {
                                    username: {
                                        '$regex': search,
                                        '$options': 'i'
                                    }
                                }
                            ],

                        }
                    ]
                },

            },

            {
                "$project": {
                    first_name: 1, middle_name: 1, last_name: 1, profile_image: 1, email: 1, phone: 1
                }
            }

        ]
    }


}

export default new UserService();