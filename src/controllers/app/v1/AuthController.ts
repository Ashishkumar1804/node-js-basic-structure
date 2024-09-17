import { NextFunction } from 'express';
import { ResInterface, ReqInterface } from "../../../interfaces/RequestInterface"
import authService from "../../../services/app/AuthService";
import _RS from "../../../helpers/ResponseHelper";
import ForgetCredentialService from '../../../services/app/ForgetCredentialService';
import AuthService from '../../../services/app/AuthService';
import User from '../../../models/User';
import { ObjectId } from 'mongoose';
class AuthController {

  constructor() {

  }

  /**
  * @api {post} /api/v1/app/auth/login USER LOGIN
  * @apiVersion 1.0.0 
  * @apiName USER Login
  * @apiGroup User Auth
  * @apiParam {String} username
  * @apiParam {String} password
  * @apiParamExample {json} Request
    {"username":"lakshit1012","password":""}
  * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Logged in successfully","data":{"user":{"otp":{"otp":null,"is_expired":false,"expiration_time":null,"is_verified":true},"email":"lakshit003@yopmal.com","username":"lakshit003","first_name":"Himans","middle_name":"dbrl","profile_image":null,"is_profile_completed":true,"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","id":"62c7d1a14b3b741658d74c32"}],"last_name":"dbrl","phone":1234567890,"date_of_birth":"2000-12-12T00:00:00.000Z","is_deleted":false,"last_login":null,"is_locked":false,"_id":"62ce5a0a178669b9746f139a","created_at":"2022-07-13T05:37:14.306Z","updated_at":"2022-07-13T05:40:43.102Z","__v":1,"id":"62ce5a0a178669b9746f139a"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNlNWEwYTE3ODY2OWI5NzQ2ZjEzOWEiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xM1QwNTozNzoxNC4zMDZaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTc2OTEyMjQsImV4cCI6MTY1Nzc5MTIyNH0.wL1v5B1BLhhhy6WkW7KbMGO-qeuU58UUWLuqHwt7RkU"}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" must be a valid email"]}}
  * @apiErrorExample {json} Error-Response
    {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"username\" is required"]}}
  * @apiErrorExample {json} Error-Response
    {"status":400,"statusText":"BAD_REQUEST","message":"You are not a registered user!","data":{}}
 **/
  async login(req: ReqInterface, res: ResInterface, next: NextFunction) {

    try {
      const reqData = req.body;
      const { error, message, data } = await authService.logIn(reqData, next);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data)
    } catch (err) {
      next(err);
    }

  }


  /**
  * @api {post} /api/v1/app/auth/register USER REGISTRATION
  * @apiVersion 1.0.0 
  * @apiName USER REGISTRATION
  * @apiGroup User Auth
  * @apiParam {String} username lakshit2021
  * @apiParam {String} email lakshit.tyagi@mobilecoderz.com
  * @apiParam {String} password *******
  * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Successfully Registered!","data":{"otp":{"otp":686,"is_expired":false,"expiration_time":1657093914240,"is_verified":false},"email":"lakshit1012@yopmal.com","username":"lakshit1012","first_name":null,"middle_name":null,"profile_image":null,"is_profile_completed":false,"last_name":null,"phone":null,"date_of_birth":null,"is_deleted":false,"is_locked":false,"_id":"62c51f9dd9f7c73adce23799","created_at":"2022-07-06T05:37:33.034Z","updated_at":"2022-07-06T07:50:54.342Z","__v":0,"id":"62c51f9dd9f7c73adce23799"}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"username\" is required"]}}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
  * @apiErrorExample {json} Error-Response:
   {"status":409,"statusText":"CONFLICT","message":"Username not available!","data":{}}
  * @apiErrorExample {json} Error-Response:
   {"status":409,"statusText":"CONFLICT","message":"Username not available!","data":{}}
  * */
  async register(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const fields: any = req.body.fields;
      const files: any = req.body.files;
      let { error, message, data } = await authService.register(fields, files, next);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data)
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  /**
     * @api {post} /api/v1/app/auth/verify-otp OTP VERIFICATION
     * @apiVersion 1.0.0 
     * @apiName OTP VERIFICATION
     * @apiGroup User Auth
     * @apiParam email 
     * @apiParam otp
     * @apiParamExample {json} Request
       {"email":"lakshit1012@yopmal.com","otp":3397}
     * @apiSuccessExample {json} Success-Response:
       {"status":200,"statusText":"SUCCESS","message":"Logged in successfully","data":{"user":{"otp":{"otp":null,"is_expired":false,"expiration_time":null,"is_verified":true},"email":"lakshit1012@yopmal.com","username":"lakshit1012","first_name":null,"middle_name":null,"profile_image":null,"is_profile_completed":false,"last_name":null,"phone":null,"date_of_birth":null,"is_deleted":false,"is_locked":false,"_id":"62c51f9dd9f7c73adce23799","created_at":"2022-07-06T05:37:33.034Z","updated_at":"2022-07-06T08:08:10.550Z","__v":0,"id":"62c51f9dd9f7c73adce23799"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM1MWY5ZGQ5ZjdjNzNhZGNlMjM3OTkiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0wNlQwNTozNzozMy4wMzRaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTcwOTQ5MTYsImV4cCI6MTY1NzE5NDkxNn0.e3W0r7nOh_iANR5ZX3ZPm9DuMNdqdk4STb8RB827wgM"}}
     * @apiErrorExample {json} Error-Response:
       {"status":400,"statusText":"BAD_REQUEST","message":"Invalid Otp Provided!","data":{}}
     * @apiErrorExample {json} Error-Response:
       {"status":400,"statusText":"BAD_REQUEST","message":"User not found!","data":{}}
     * @apiErrorExample {json} Error-Response:
       {"status":400,"statusText":"BAD_REQUEST","message":"Provided Otp has been expired!","data":{}}
     * */
  async verifyOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      let reqData = req.body;
      let { error, message, data } = await authService.verifyOtp(reqData, next);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data)
    } catch (err) {
      next(err);
    }
  }


  /**
   * @api {post} /api/v1/app/auth/complete-profile Complete Profile
   * @apiVersion 1.0.0 
   * @apiName Complete Profile
   * @apiGroup User Auth
   * @apiParam {String} first_name
   * @apiParam {String} middle_name
   * @apiParam {String} last_name
   * @apiParam {String} phone
   * @apiParam {String} date_of_birth
   * @apiParamExample {json} Request
   {"first_name":"Himans","middle_name":"dbrl","last_name":"dbrl","phone":"1234567890","date_of_birth":"2000-12-12","preferences":["62c7d1794b3b741658d74c2c","62c7d1964b3b741658d74c2f","62c7d1a14b3b741658d74c32"]}
   * @apiErrorExample {json} Error-Response:
     {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"date_of_birth\" is required"]}}
   * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Successfully completed!","data":{"user":{"otp":{"otp":"8252","is_expired":false,"expiration_time":1658120794819,"is_verified":true},"email":"lakshit15aug@gmail.com","username":"lakshit333","ssid":null,"login_by":"manual","first_name":"Himans","middle_name":"dbrl","profile_image":null,"is_profile_completed":true,"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","id":"62c7d1a14b3b741658d74c32"}],"last_name":"dbrl","phone":1234567890,"date_of_birth":"2000-12-12T00:00:00.000Z","is_deleted":false,"last_login":null,"is_locked":false,"_id":"62ce5a0a178669b9746f139a","created_at":"2022-07-13T05:37:14.306Z","updated_at":"2022-07-18T05:05:34.820Z","__v":1,"loginBy":"manual","id":"62ce5a0a178669b9746f139a"}}}
   * */

  async completeProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const reqData = req.body;
      const userId = req.userData._id;
      const { error, message, data } = await authService.completeProfile(userId, reqData, next);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data)
    } catch (err) {
      next(err);
    }
  }



  /**
  * @api {post} /api/v1/app/auth/unlock-account-email Unlock Account Email
  * @apiVersion 1.0.0 
  * @apiName Unlock Account Email
  * @apiGroup User Auth
  * @apiParam email
  * @apiHeader Authorization Bearer token
  * @apiParamExample {json} Request
  * {"email": "lakshit003@yopmal.com"}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" must be a valid email"]}}
  * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Otp sent to the email address!","data":{"data":{"otp":2988,"is_expired":false,"expiration_time":1657696029812,"is_verified":false}}}
  * */
  async unlockBuddyAccount(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const email = req.body.email;
      console.log(req.body);
      const { error, message, data } = await authService.unlockBuddyAccount(email);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data);
    } catch (err) {
      next(err);
    }
  }

  /**
  * @api {post} /api/v1/app/auth/unlock-account Unlock Account 
  * @apiVersion 1.0.0 
  * @apiName Unlock Account 
  * @apiGroup User Auth
  * @apiParam otp
  * @apiParam {String} email
  * @apiHeader Authorization Bearer token
  * @apiParamExample {json} Request
  * {"otp": "0000", "email":"Something@something.com"}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"INVALID_OTP","message":"Invalid Otp!","data":{}}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"EXPIRED_OTP","message":" Otp Expired!","data":{}}
  * @apiSuccessExample {json} Success-Response:
   {"status":200,"statusText":"SUCCESS","message":"OTP verified successfully!","data":{}}
  * */
  async accountUnlocked(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const otp = req.body.otp;
      const email = req.body.email;
      console.log(req.body);
      const { error, message, data, responseText } = await authService.accountUnlocked(email, otp);
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {put} /api/v1/app/auth/password/forget Forget Password
   * @apiVersion 1.0.0 
   * @apiName Forget Password
   * @apiGroup User Auth
   * @apiParam email
   * @apiParamExample {json} Request
   * {"email": "something@something.com"}
   * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" must be a valid email"]}}
   * @apiErrorExample {json} Error-Response:
     {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
   * @apiErrorExample {json} Error-Response:
     {"status":400,"statusText":"NOT_FOUND","message":"User not found!","data":{}}
  
   * @apiSuccessExample {json} Success-Response:
  {"status":200,"statusText":"SUCCESS","message":"Otp send to email address successfully!","data":{"data":{"otp":6018,"is_expired":false,"expiration_time":1657705752291,"is_verified":true}}}
   * */
  async forgetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const email = req.body.email;
      const { error, message, data, responseText } = await ForgetCredentialService.forgetPassword(email);
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }



  /**
  * @api {put} /api/v1/app/auth/password/verify-otp   Forget Password Verify Otp
  * @apiVersion 1.0.0 
  * @apiName Forget Password Verify Otp
  * @apiGroup User Auth
  * @apiParam email
  * @apiParam otp
  * @apiParamExample {json} Request
  * {"email": "something@something.com", "otp": "6018"}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"otp\" is required"]}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"NOT_FOUND","message":"User not found!","data":{}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"INVALID_OTP","message":"Invalid Otp!","data":{}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"INVALID_OTP","message":"Invalid Otp!","data":{}}
  * @apiErrorExample {json} Error-Response:
    {"status":400,"statusText":"EXPIRED_OTP","message":"Expired Otp","data":{}}
  * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"OTP verified successfully!","data":{}}
  * */
  async otpVerification(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const { error, message, data, responseText } = await ForgetCredentialService.verifyOtp(email, otp);
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }



  /**
* @api {put} /api/v1/app/auth/username/forget  Forget Username
* @apiVersion 1.0.0 
* @apiName Forget Username
* @apiGroup User Auth
* @apiParam email
* @apiParamExample {json} Request
* {"email": "something@something.com"}
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" must be a valid email"]}}
* @apiErrorExample {json} Error-Response:
  {"status":400,"statusText":"NOT_FOUND","message":"User not found!","data":{}}
* @apiSuccessExample {json} Success-Response:
 {"status":200,"statusText":"SUCCESS","message":"Otp send to email address successfully!","data":{"data":{"otp":6568,"is_expired":false,"expiration_time":1657794940405,"is_verified":true}}}
* */
  async forgetUsername(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const email = req.body.email;
      const { error, message, data, responseText } = await ForgetCredentialService.forgetUsername(email);
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }



  /**
* @api {Post} /api/v1/app/auth/password/reset  Password Reset
* @apiVersion 1.0.0 
* @apiName Reset Password
* @apiGroup User Auth
* @apiParam email
* @apiParam password
* @apiParamExample {json} Request
* {"email": "something@something.com", "password": "6018"}
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
* @apiErrorExample {json} Error-Response:
  {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" must be a valid email"]}}
* @apiErrorExample {json} Error-Response:
  {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"password\" is required"]}}
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"NOT_FOUND","message":"No User found!","data":{}}
* @apiSuccessExample {json} Success-Response:
  {"status":200,"statusText":"SUCCESS","message":"Password changed successfully!","data":{}}
* */
  async resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { error, message, data, responseText } = await ForgetCredentialService.resetPassword({ email, password });
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data);

    } catch (err) {
      next(err);
    }
  }



  /**
 * @api {put} /api/v1/app/auth/username/reset  Username Reset
 * @apiVersion 1.0.0 
 * @apiName Reset Username
 * @apiGroup User Auth
 * @apiParam {string} email
 * @apiParam {string} username
 * @apiParamExample {json} Request
 * {"email": "something@something.com", "username": "lakshit6018"}
 * @apiErrorExample {json} Error-Response:
  {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
 * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" must be a valid email"]}}
 * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"username\" is required"]}}
 * @apiErrorExample {json} Error-Response:
   {"status":409,"statusText":"CONFLICT","message":"Username not available","data":{}}
 * @apiSuccessExample {json} Success-Response:
   {"status":200,"statusText":"SUCCESS","message":"Username Added Successfully!","data":{}}
 * */
  async resetUsername(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { email, username } = req.body;
      const { error, message, data, responseText } = await ForgetCredentialService.resetUsername({ email, username })
      if (error) {
        return _RS.badRequest(res, responseText, message, data)
      }
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }



  /**
* @api {post} /api/v1/app/auth/social/register  Social Register
* @apiVersion 1.0.0 
* @apiName Social Register
* @apiGroup User Auth
* @apiParam {string} email
* @apiParam {string} username
* @apiParam {string} ssid
* @apiParam {string} login_by google,apple
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"login_by\" is required"]}}
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"ssid\" is required"]}}
* @apiErrorExample {json} Error-Response:
 {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"username\" is required"]}}
* @apiErrorExample {json} Error-Response:
 {"status":409,"statusText":"CONFLICT","message":"Username not available","data":{}}
* @apiSuccessExample {json} Success-Response:
{"status":200,"statusText":"SUCCESS","message":"Logged in successfully","data":{"user":{"otp":{"otp":null,"is_expired":false,"expiration_time":null,"is_verified":false},"email":"shunham@hhh.com","username":"shubham123","ssid":"shubham123","login_by":"google","first_name":null,"middle_name":null,"profile_image":null,"is_profile_completed":false,"preferences":[],"last_name":null,"phone":null,"date_of_birth":null,"is_deleted":false,"last_login":null,"is_locked":false,"_id":"62d14a40c7d9d000c03d859b","created_at":"2022-07-15T11:06:40.420Z","updated_at":"2022-07-15T11:06:40.420Z","__v":0,"id":"62d14a40c7d9d000c03d859b"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQxNGE0MGM3ZDlkMDAwYzAzZDg1OWIiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xNVQxMTowNjo0MC40MjBaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTc4ODM5OTEsImV4cCI6MTY1Nzk4Mzk5MX0.GqPST_WDwFTBPjDK_JYh7srE_XJc95du7jtGaNgha9U"}}
* */
  async socialLogin(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const userId = req.userData._id;
      const { error, message, data, responseText } = await authService.socialSignIn(userId, next);
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data)
    } catch (err) {
      next(err);
    }
  }


  /**
* @api {post} api/v1/app/auth/social/login  Social Login
* @apiVersion 1.0.0 
* @apiName Social Login
* @apiGroup User Auth
* @apiParam {string} ssid
* @apiParam {string} login_by  google,apple
* @apiParamExample {json} Request
 {"ssid": "shsgdh","login_by": "google"}
* @apiErrorExample {json} Error-Response:
 {"status":205,"statusText":"NO_USER_AVAILABLE","message":"No User available!","data":{}}
* @apiSuccessExample {json} Success-Response:
 {"status":200,"statusText":"SUCCESS","message":"Logged in successfully","data":{"user":{"otp":{"otp":null,"is_expired":false,"expiration_time":null,"is_verified":false},"email":"shunham@hhh.com","username":"shubham123","ssid":"shubham123","login_by":"google","first_name":null,"middle_name":null,"profile_image":null,"is_profile_completed":false,"preferences":[],"last_name":null,"phone":null,"date_of_birth":null,"is_deleted":false,"last_login":null,"is_locked":false,"_id":"62d14a40c7d9d000c03d859b","created_at":"2022-07-15T11:06:40.420Z","updated_at":"2022-07-15T11:06:40.420Z","__v":0,"id":"62d14a40c7d9d000c03d859b"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQxNGE0MGM3ZDlkMDAwYzAzZDg1OWIiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xNVQxMTowNjo0MC40MjBaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTc4ODQxODEsImV4cCI6MTY1Nzk4NDE4MX0.5XB4aKeXQ5XOCbU0x-yxBKwB7MO4OJ6ny1ZKl34H2M0"}}
* */
  async socialRegister(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const fields: any = req.body.fields;
      const files: any = req.body.files;
      const { error, message, data, responseText } = await authService.socialRegister(fields, files, next);
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data)
    } catch (err) {
      next(err);
    }
  }



  /**
* @api {PUT} /api/v1/app/auth/resend-otp  RESEND OTP
* @apiVersion 1.0.0 
* @apiName Resend OTP
* @apiGroup User Auth
* @apiParam {string} email
* @apiParam {string} type  FORGET_PASSWORD, FORGET_USERNAME, USER_REGISTER,"ACCOUNT_UNLOCK"
* @apiParamExample {json} Request
{  "email":"lakshit15aug@gmail.com","type": "FORGET_PASSWORD"}
* @apiErrorExample {json} Error-Response:
{"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"type\" must be one of [FORGET_PASSWORD, FORGET_USERNAME, USER_REGISTER]"]}}
* @apiSuccessExample {json} Success-Response:
{"status":200,"statusText":"SUCCESS","message":"Otp send to email successfully!","data":{"data":{"otp":"7848","is_expired":false,"expiration_time":1658213376973,"is_verified":true}}}
* */
  async resendOtp(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { email, type } = req.body;
      const { message, data, responseText } = await ForgetCredentialService.resendOtp({ email, type });
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }



  /**
  * @api {PUT} /api/v1/app/auth/update-profile    EDIT USER PROFILE
  * @apiVersion 1.0.0 
  * @apiName EDIT USER PROFILE
  * @apiGroup User Auth
  * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
  * @apiParam {String} username lakshit2021
  * @apiParam {String} email lakshit.tyagi@mobilecoderz.com
  * @apiParam {String} first_name Lakshit
  * @apiParam {String} last_name Tyagi
  * @apiParam {String} phone 1234567890 
  * @apiParam {File} profile_image  
  * @apiSuccessExample {json} Success-Response:
   {"status":200,"statusText":"SUCCESS","message":"You have updated your profile successfully!","data":{"user":{"otp":{"otp":"3322","is_expired":false,"expiration_time":1659604761089,"is_verified":true},"email":"piyush15aug1997@gmail.com","username":"lakshit15aug","profile_verified":true,"ssid":null,"login_by":"manual","first_name":"lakshittyagi","middle_name":"dbrl","profile_image":"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658904496193.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220804%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220804T123213Z&X-Amz-Expires=900&X-Amz-Signature=11c364f582d1efebd1082c1b7f2cdbae694091bcdd916a5e20d711c065de61a9&X-Amz-SignedHeaders=host","is_profile_completed":true,"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","id":"62c7d1a14b3b741658d74c32"}],"last_name":"Tyagi","phone":3212345678,"date_of_birth":"2000-12-12T00:00:00.000Z","is_deleted":true,"delete_at":1660042025914,"last_login":"2022-08-04T10:46:43.805Z","is_locked":false,"_id":"62de6168f21df69c52da7b28","created_at":"2022-07-25T09:24:56.937Z","updated_at":"2022-08-04T12:32:13.666Z","__v":7,"id":"62de6168f21df69c52da7b28"}}}
  * @apiErrorExample {json} Error-Response:
  {"status":409,"statusText":"CONFLICT","message":"Username not available!","data":{}}
  * @apiErrorExample {json} Error-Response:
  {"status":409,"statusText":"CONFLICT","message":"email not available!","data":{}}
  */
  async updateProfile(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const fields: any = req.body.fields;
      const files: any = req.body.files;
      const userId: any = req.userData._id;
      let { error, message, data, responseText } = await authService.updateProfile({ userId, fields, files });
      if (error) { return _RS.badRequest(res, responseText, message, data) }
      return _RS.ok(res, responseText, message, data)
    } catch (err) {
      next(err);
    }
  }

  /**
  * @api {POST} /api/v1/app/auth/contact   CONTACT US
  * @apiVersion 1.0.0 
  * @apiName CONATCT US
  * @apiGroup User Auth
  * @apiHeader {String} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0
  * @apiParam {String} email lakshit.tyagi@mobilecoderz.com
  * @apiParam {String} email test@test.com
  * @apiParam {String} subject Contact us email
  * @apiParam {String} text This is the body of the email.
  * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"FAILED","message":"Message not sent!","data":{}}
  * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Message sent!","data":{}}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"subject\" is required"]}}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
  * @apiErrorExample {json} Error-Response:
   {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"text\" is required"]}}
  */
  async contact(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { email, subject, text } = req.body;
      const userId: string | ObjectId = req.userData._id;
      const { message, data, responseText } = await authService.contact({ userId, email, subject, text });
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }

  async logOut(req: ReqInterface, res: ResInterface, next: NextFunction) {

  }

}

export default new AuthController();