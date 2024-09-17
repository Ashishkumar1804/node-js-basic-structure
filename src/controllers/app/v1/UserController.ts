import { NextFunction } from 'express';
import { ResInterface, ReqInterface } from "../../../interfaces/RequestInterface"
import UserService from "../../../services/app/UserService";
import _RS from "../../../helpers/ResponseHelper";
import { ObjectId } from 'mongoose';
class UserController {

    constructor() {

    }

    /**
     * @api {GET} /api/v1/app/user User Profile
     * @apiVersion 1.0.0 
     * @apiName User Profile
     * @apiGroup User
     * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
     * @apiErrorExample {json} Error-Response:
     * {"status":401,"statusText":"JWT_NEEDED","message":"User Not Authorized","data":{}}
     * @apiSuccessExample {json} Success-Response:
       {"status":200,"statusText":"SUCCESS","message":"success!","data":{"user":{"otp":{"otp":null,"is_expired":false,"expiration_time":null,"is_verified":true},"email":"piyush15aug1997@gmail.com","username":"lakshit15aug","profile_verified":true,"ssid":null,"login_by":"manual","first_name":"Himans","middle_name":"dbrl","profile_image":"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T122748Z&X-Amz-Expires=900&X-Amz-Signature=62b72af3bc736206c9781a0a2e6767a68163691370d2a6820026fe9aec157bfe&X-Amz-SignedHeaders=host","is_profile_completed":true,"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","id":"62c7d1a14b3b741658d74c32"}],"last_name":"dbrl","phone":1234567890,"date_of_birth":"2000-12-12T00:00:00.000Z","is_deleted":false,"last_login":null,"is_locked":false,"_id":"62de6168f21df69c52da7b28","created_at":"2022-07-25T09:24:56.937Z","updated_at":"2022-07-25T09:30:08.329Z","__v":1,"id":"62de6168f21df69c52da7b28"},"meta":{"followersCount":2,"followingCount":4,"likes":0,"trips":0}}}
     * */

    async userProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId = req.userData._id;
            const { error, message, data } = await UserService.userInfo(userId);
            if (error) {
                return _RS.badRequest(res, "BAD_REQUEST", message, data);
            }
            return _RS.ok(res, "SUCCESS", message, data)
        } catch (err) {
            next(err);
        }
    }


    /**
     * @api {GET} /api/v1/app/user/:62da387b224b94872c790654   User Details
     * @apiVersion 1.0.0 
     * @apiName User Details
     * @apiGroup User
     * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
     * @apiErrorExample {json} Error-Response:
     * {"status":401,"statusText":"JWT_NEEDED","message":"User Not Authorized","data":{}}
     * @apiSuccessExample {json} Success-Response:
       {"status":200,"statusText":"SUCCESS","message":"success!","data":{"user":{"otp":{"otp":null,"is_expired":false,"expiration_time":null,"is_verified":true},"email":"piyush15aug1997@gmail.com","username":"lakshit15aug","profile_verified":true,"ssid":null,"login_by":"manual","first_name":"Himans","middle_name":"dbrl","profile_image":"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T122748Z&X-Amz-Expires=900&X-Amz-Signature=62b72af3bc736206c9781a0a2e6767a68163691370d2a6820026fe9aec157bfe&X-Amz-SignedHeaders=host","is_profile_completed":true,"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","id":"62c7d1a14b3b741658d74c32"}],"last_name":"dbrl","phone":1234567890,"date_of_birth":"2000-12-12T00:00:00.000Z","is_deleted":false,"last_login":null,"is_locked":false,"_id":"62de6168f21df69c52da7b28","created_at":"2022-07-25T09:24:56.937Z","updated_at":"2022-07-25T09:30:08.329Z","__v":1,"id":"62de6168f21df69c52da7b28"},"meta":{"followersCount":2,"followingCount":4,"likes":0,"trips":0}}}
     * */
    async otherUserDetails(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId = req.params.id;
            const { error, message, data, responseText } = await UserService.userInfo(userId);
            if (error) {
                return _RS.badRequest(res, responseText, message, data);
            }
            return _RS.ok(res, "SUCCESS", message, data)
        } catch (err) {
            next(err);
        }
    }


    /**
   * @api {GET} /api/v1/app/user/followers Get User Followers
   * @apiVersion 1.0.0 
   * @apiName User Followers
   * @apiGroup User
   * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
   * @apiErrorExample {json} Error-Response:
   * {"status":401,"statusText":"JWT_NEEDED","message":"User Not Authorized","data":{}}
   * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Follower List!","data":{"docs":[{"_id":"62de7551311174c78281fa82","first_name":"sai","middle_name":"","last_name":"kumar","profile_image":"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T123054Z&X-Amz-Expires=900&X-Amz-Signature=dc4b0ccf73c368a5ce083ea7c1adc5fb3aceb7ce2e41386b0f3091ba12ef27fb&X-Amz-SignedHeaders=host","email":"saikumar124@yopmail.com","follower_id":"62da387b224b94872c790654"}],"totalDocs":1,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}
   * */
    async getFollowers(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId = req.userData._id;
            const page = req.query.page;
            const type = "FOLLOWER";
            const { message, data, responseText } = await UserService.getFollowingsOrFollowers({ userId, type, page });
            return _RS.ok(res, responseText, message, data)
        } catch (err) {
            next(err);
        }
    }

    /**
      * @api {GET} /api/v1/app/user/followings   Get User Followings
      * @apiVersion 1.0.0 
      * @apiName User Followings
      * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
      * @apiGroup User
      * @apiErrorExample {json} Error-Response:
      * {"status":401,"statusText":"JWT_NEEDED","message":"User Not Authorized","data":{}}
      * @apiSuccessExample {json} Success-Response:
       {"status":200,"statusText":"SUCCESS","message":"Following List!","data":{"docs":[{"_id":"62de753e311174c78281fa81","first_name":"sai","middle_name":"","last_name":"kumar","profile_image":"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T123148Z&X-Amz-Expires=900&X-Amz-Signature=cd8ee67a14b2d934353e78236bad5b8579572e77f902785a9cd5ca1b483062cd&X-Amz-SignedHeaders=host","email":"saikumar124@yopmail.com","followee_id":"62da387b224b94872c790654"}],"totalDocs":1,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}
      * */
    async getFollowings(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId = req.userData._id;
            const page = req.query.page;
            const type = "FOLLOWING";
            const { message, data, responseText } = await UserService.getFollowingsOrFollowers({ userId, type, page });
            return _RS.ok(res, responseText, message, data)
        } catch (err) {
            next(err);
        }
    }

    /**
        * @api {DELETE} /api/v1/app/user   DELETE ACCOUNT
        * @apiVersion 1.0.0 
        * @apiName DELETE ACCOUNT
        * @apiGroup User
        * @apiParam {String} username
        * @apiParam {String} Password
        * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
        * @apiErrorExample {json} Error-Response:
        * {"status":401,"statusText":"JWT_NEEDED","message":"User Not Authorized","data":{}}
        * @apiErrorExample {json} Error-Response:
         {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"username\" is required"]}}
        * @apiErrorExample {json} Error-Response:
         {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"password\" is required"]}}
        * @apiErrorExample {json} Error-Response:
          {"status":406,"statusText":"FAILED","message":"User Not Found","data":{}}
        * @apiErrorExample {json} Error-Response:
         {"status":406,"statusText":"FAILED","message":"Invalid Password","data":{}}
        * @apiSuccessExample {json} Success-Response:
         {"status":200,"statusText":"SUCCESS","message":"Account will be deleted on Sat Aug 06 2022 12:58:36 GMT+0530 (India Standard Time)","data":{"date":"2022-08-06T07:28:36.019Z"}}
        * */
    async deleteAccount(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId: string | ObjectId = req.userData._id;
            const password: string = req.body.password;
            const username: string = req.body.username;
            const loginBy = req.userData.login_by;
            const { error, message, data, responseText } = await UserService.deleteAccount(userId, username, password, loginBy);
            if (error) { return _RS.notAcceptable(res, responseText, message, data) }
            return _RS.ok(res, responseText, message, data);
        } catch (err) {
            next(err);
        }
    }


    /**
       * @api {PUT} /api/v1/app/user/password-change   Change Password
       * @apiVersion 1.0.0 
       * @apiName Change Password
       * @apiGroup User
       * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
       * @apiParam {String} old_password
       * @apiParam {String} new_password
       * @apiErrorExample {json} Error-Response:
       * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"old_password\" is required"]}}
       * @apiErrorExample {json} Error-Response:
        {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"new_password\" is required"]}}
       * @apiErrorExample {json} Error-Response:
        {"status":406,"statusText":"PASSWORD_NOT_MATCH","message":"Invalid Old Password","data":{}}
       * @apiSuccessExample {json} Success-Response:
       {"status":200,"statusText":"SUCCESS","message":"Password changed Successfully!","data":{"user":{"otp":{"otp":null,"is_expired":true,"expiration_time":1658984349771,"is_verified":true},"email":"piyush15aug1997@gmail.com","username":"lakshit15aug","profile_verified":true,"ssid":null,"login_by":"manual","first_name":"lakshittyagi","middle_name":"dbrl","profile_image":"profile_pictures/image_1658904496193.png","is_profile_completed":true,"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","id":"62c7d1a14b3b741658d74c32"}],"last_name":"Tyagi","phone":3212345678,"date_of_birth":"2000-12-12T00:00:00.000Z","is_deleted":true,"delete_at":1659781686596,"last_login":"2022-08-01T11:20:56.464Z","is_locked":false,"_id":"62de6168f21df69c52da7b28","created_at":"2022-07-25T09:24:56.937Z","updated_at":"2022-08-01T11:20:56.470Z","__v":6,"id":"62de6168f21df69c52da7b28"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjoibGFrc2hpdHR5YWdpIiwiY3JlYXRlZF9hdCI6IjIwMjItMDctMjVUMDk6MjQ6NTYuOTM3WiIsImFjY291bnRfbG9ja2VkIjpmYWxzZSwiaWF0IjoxNjU5MzUyODU2LCJleHAiOjE2NTk0NTI4NTZ9.XCfJ2HheGfvuNROg7rYsAX6fatPh4MCvnmfXMO8XtDA"}}
       * */
    async changePassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const old_password: string = req.body.old_password;
            const new_password: string = req.body.new_password;
            const userId: string | ObjectId = req.userData._id;
            const { error, message, data, responseText } = await UserService.changePassword(userId, old_password, new_password, next);
            if (error) { return _RS.notAcceptable(res, responseText, message, data) }
            return _RS.ok(res, responseText, message, data);
        } catch (err) {
            next(err);
        }
    }

    /**
       * @api {GET} /api/v1/app/user/search/users  SEARCH USERS
       * @apiVersion 1.0.0 
       * @apiName SEARCH USERS
       * @apiGroup User
       * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
       * @apiQuery {String} search lakshit
       * @apiQuery {Number} page 1
       * @apiSuccessExample {json} Success-Response:
      {"status":200,"statusText":"Users","message":"SUCCESS","data":{"docs":[{"_id":"62da313a224b94872c790634","email":"saikumar9@yopmail.com","first_name":"sai","middle_name":"","profile_image":null,"last_name":"kumar","phone":123123123},{"_id":"62da387b224b94872c790654","email":"saikumar124@yopmail.com","first_name":"sai","middle_name":"","last_name":"kumar","phone":123123123,"profile_image":"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220802%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220802T123036Z&X-Amz-Expires=900&X-Amz-Signature=30c09bce07a50b4e1bff77a2b06aedc2d75eedbae9a18e53ffd3ee153c457bbd&X-Amz-SignedHeaders=host"},{"_id":"62de35576b862dfa04a3deaa","email":"saikumar4@yopmail.com","first_name":"sai","middle_name":"","profile_image":null,"last_name":"lunar","phone":123123123},{"_id":"62e3739c7ecabc3975506420","email":"saikumar12@yopmail.com","first_name":"sai","middle_name":"","profile_image":null,"last_name":"kumar","phone":123123123}],"totalDocs":4,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}
       * */
    async searchUser(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const searchQuery: any = req.query.search;
            const page: any = req.query.page;
            const userId: string | ObjectId = req.userData._id;
            const { error, message, data, responseText } = await UserService.searchUser(userId, searchQuery, page)
            if (error) {
                return _RS.badRequest(res, message, responseText, data);
            }
            return _RS.ok(res, message, responseText, data,);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();