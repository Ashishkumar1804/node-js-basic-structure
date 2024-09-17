import { NextFunction } from 'express';
import { ResInterface, ReqInterface } from "../../../interfaces/RequestInterface"
import PreferenceService from "../../../services/app/PreferenceService";
import _RS from "../../../helpers/ResponseHelper";
import { UserInterface } from '../../../interfaces/modelInterfaces/UserInterface';
import User from '../../../models/User';
import { ObjectId } from 'mongoose';
class PreferenceController {

  constructor() {

  }

  /**
  * @api {get} /api/v1/app/preferences/ Preferences
  * @apiVersion 1.0.0 
  * @apiName GET Preferences
  * @apiGroup User Auth
  * @apiSuccessExample {json} Error-Response
    {"status":200,"statusText":"SUCCESS","message":"Preferences List","data":{"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","created_at":"2022-07-08T06:40:57.561Z","updated_at":"2022-07-08T06:40:57.561Z","__v":0,"id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","created_at":"2022-07-08T06:41:26.372Z","updated_at":"2022-07-08T06:41:26.372Z","__v":0,"id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","created_at":"2022-07-08T06:41:37.500Z","updated_at":"2022-07-08T06:41:37.500Z","__v":0,"id":"62c7d1a14b3b741658d74c32"},{"_id":"62c7d1b14b3b741658d74c35","name":"Kids and Family","created_at":"2022-07-08T06:41:53.305Z","updated_at":"2022-07-08T06:41:53.305Z","__v":0,"id":"62c7d1b14b3b741658d74c35"},{"_id":"62c7d1cd4b3b741658d74c38","name":"Socially Distant","created_at":"2022-07-08T06:42:21.574Z","updated_at":"2022-07-08T06:42:21.574Z","__v":0,"id":"62c7d1cd4b3b741658d74c38"},{"_id":"62c7d1e34b3b741658d74c3b","name":"Off the beaten path","created_at":"2022-07-08T06:42:43.814Z","updated_at":"2022-07-08T06:42:43.814Z","__v":0,"id":"62c7d1e34b3b741658d74c3b"},{"_id":"62c7d1f64b3b741658d74c3e","name":"Staycation","created_at":"2022-07-08T06:43:02.767Z","updated_at":"2022-07-08T06:43:02.767Z","__v":0,"id":"62c7d1f64b3b741658d74c3e"},{"_id":"62c7d2024b3b741658d74c41","name":"Solo Trevel","created_at":"2022-07-08T06:43:14.272Z","updated_at":"2022-07-08T06:43:14.272Z","__v":0,"id":"62c7d2024b3b741658d74c41"},{"_id":"62c7d20d4b3b741658d74c44","name":"Girls Trip","created_at":"2022-07-08T06:43:25.788Z","updated_at":"2022-07-08T06:43:25.788Z","__v":0,"id":"62c7d20d4b3b741658d74c44"},{"_id":"62c7d2174b3b741658d74c47","name":"Guys Trip","created_at":"2022-07-08T06:43:35.020Z","updated_at":"2022-07-08T06:43:35.020Z","__v":0,"id":"62c7d2174b3b741658d74c47"},{"_id":"62c7d2234b3b741658d74c4a","name":"Culture","created_at":"2022-07-08T06:43:47.038Z","updated_at":"2022-07-08T06:43:47.038Z","__v":0,"id":"62c7d2234b3b741658d74c4a"},{"_id":"62c7d2314b3b741658d74c4d","name":"Senior Trevel","created_at":"2022-07-08T06:44:01.389Z","updated_at":"2022-07-08T06:44:01.389Z","__v":0,"id":"62c7d2314b3b741658d74c4d"},{"_id":"62c7d2444b3b741658d74c50","name":"Foodie","created_at":"2022-07-08T06:44:20.225Z","updated_at":"2022-07-08T06:44:20.225Z","__v":0,"id":"62c7d2444b3b741658d74c50"},{"_id":"62c7d2504b3b741658d74c53","name":"Convention","created_at":"2022-07-08T06:44:32.797Z","updated_at":"2022-07-08T06:44:32.797Z","__v":0,"id":"62c7d2504b3b741658d74c53"},{"_id":"62c7d2744b3b741658d74c56","name":"Collage & University","created_at":"2022-07-08T06:45:08.444Z","updated_at":"2022-07-08T06:45:08.444Z","__v":0,"id":"62c7d2744b3b741658d74c56"},{"_id":"62c7d2804b3b741658d74c59","name":"Luxury","created_at":"2022-07-08T06:45:20.391Z","updated_at":"2022-07-08T06:45:20.391Z","__v":0,"id":"62c7d2804b3b741658d74c59"},{"_id":"62c7d2954b3b741658d74c5c","name":"Music & Theater","created_at":"2022-07-08T06:45:41.182Z","updated_at":"2022-07-08T06:45:41.182Z","__v":0,"id":"62c7d2954b3b741658d74c5c"},{"_id":"62c7d2bd4b3b741658d74c5f","name":"Sports","created_at":"2022-07-08T06:46:21.346Z","updated_at":"2022-07-08T06:46:21.346Z","__v":0,"id":"62c7d2bd4b3b741658d74c5f"}]}}
 **/
  public async index(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const { error, message, data } = await PreferenceService.getPreferences();
      return _RS.ok(res, "SUCCESS", message, data)
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {Post} /api/v1/app/preferences/ Preferences
   * @apiVersion 1.0.0 
   * @apiName Store Preferences
   * @apiGroup User Auth
   * @apiSuccessExample {json} Error-Response
    {"status":201,"statusText":"CREATED","message":"Created","data":{"preferences":[{"_id":"62c7d1794b3b741658d74c2c","name":"Outdoor","created_at":"2022-07-08T06:40:57.561Z","updated_at":"2022-07-08T06:40:57.561Z","__v":0,"id":"62c7d1794b3b741658d74c2c"},{"_id":"62c7d1964b3b741658d74c2f","name":"Shopping","created_at":"2022-07-08T06:41:26.372Z","updated_at":"2022-07-08T06:41:26.372Z","__v":0,"id":"62c7d1964b3b741658d74c2f"},{"_id":"62c7d1a14b3b741658d74c32","name":"Road Trip","created_at":"2022-07-08T06:41:37.500Z","updated_at":"2022-07-08T06:41:37.500Z","__v":0,"id":"62c7d1a14b3b741658d74c32"},{"_id":"62c7d1b14b3b741658d74c35","name":"Kids and Family","created_at":"2022-07-08T06:41:53.305Z","updated_at":"2022-07-08T06:41:53.305Z","__v":0,"id":"62c7d1b14b3b741658d74c35"},{"_id":"62c7d1cd4b3b741658d74c38","name":"Socially Distant","created_at":"2022-07-08T06:42:21.574Z","updated_at":"2022-07-08T06:42:21.574Z","__v":0,"id":"62c7d1cd4b3b741658d74c38"},{"_id":"62c7d1e34b3b741658d74c3b","name":"Off the beaten path","created_at":"2022-07-08T06:42:43.814Z","updated_at":"2022-07-08T06:42:43.814Z","__v":0,"id":"62c7d1e34b3b741658d74c3b"},{"_id":"62c7d1f64b3b741658d74c3e","name":"Staycation","created_at":"2022-07-08T06:43:02.767Z","updated_at":"2022-07-08T06:43:02.767Z","__v":0,"id":"62c7d1f64b3b741658d74c3e"},{"_id":"62c7d2024b3b741658d74c41","name":"Solo Trevel","created_at":"2022-07-08T06:43:14.272Z","updated_at":"2022-07-08T06:43:14.272Z","__v":0,"id":"62c7d2024b3b741658d74c41"},{"_id":"62c7d20d4b3b741658d74c44","name":"Girls Trip","created_at":"2022-07-08T06:43:25.788Z","updated_at":"2022-07-08T06:43:25.788Z","__v":0,"id":"62c7d20d4b3b741658d74c44"},{"_id":"62c7d2174b3b741658d74c47","name":"Guys Trip","created_at":"2022-07-08T06:43:35.020Z","updated_at":"2022-07-08T06:43:35.020Z","__v":0,"id":"62c7d2174b3b741658d74c47"},{"_id":"62c7d2234b3b741658d74c4a","name":"Culture","created_at":"2022-07-08T06:43:47.038Z","updated_at":"2022-07-08T06:43:47.038Z","__v":0,"id":"62c7d2234b3b741658d74c4a"},{"_id":"62c7d2314b3b741658d74c4d","name":"Senior Trevel","created_at":"2022-07-08T06:44:01.389Z","updated_at":"2022-07-08T06:44:01.389Z","__v":0,"id":"62c7d2314b3b741658d74c4d"},{"_id":"62c7d2444b3b741658d74c50","name":"Foodie","created_at":"2022-07-08T06:44:20.225Z","updated_at":"2022-07-08T06:44:20.225Z","__v":0,"id":"62c7d2444b3b741658d74c50"},{"_id":"62c7d2504b3b741658d74c53","name":"Convention","created_at":"2022-07-08T06:44:32.797Z","updated_at":"2022-07-08T06:44:32.797Z","__v":0,"id":"62c7d2504b3b741658d74c53"},{"_id":"62c7d2744b3b741658d74c56","name":"Collage & University","created_at":"2022-07-08T06:45:08.444Z","updated_at":"2022-07-08T06:45:08.444Z","__v":0,"id":"62c7d2744b3b741658d74c56"},{"_id":"62c7d2804b3b741658d74c59","name":"Luxury","created_at":"2022-07-08T06:45:20.391Z","updated_at":"2022-07-08T06:45:20.391Z","__v":0,"id":"62c7d2804b3b741658d74c59"},{"_id":"62c7d2954b3b741658d74c5c","name":"Music & Theater","created_at":"2022-07-08T06:45:41.182Z","updated_at":"2022-07-08T06:45:41.182Z","__v":0,"id":"62c7d2954b3b741658d74c5c"},{"_id":"62c7d2bd4b3b741658d74c5f","name":"Sports","created_at":"2022-07-08T06:46:21.346Z","updated_at":"2022-07-08T06:46:21.346Z","__v":0,"id":"62c7d2bd4b3b741658d74c5f"}]}}
  **/
  public async store(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const reqData = req.body;
      const { error, message, data } = await PreferenceService.storePreference(reqData, next);
      return _RS.created(res, "CREATED", message, data)
    } catch (err) {
      next(err)
    }
  }



  /**
    * @api {Get} /api/v1/app/preferences/users  Preferred Users
    * @apiVersion 1.0.0 
    * @apiName Preferred Users
    * @apiGroup User Auth
    * @apiSuccessExample {json} Error-Response
     {"status":200,"statusText":"SUCCESS","message":"Success","data":{"docs":[{"_id":"62c7c58677b86b2a6428d1dd","first_name":"Lakshit","last_name":"Tyagi","email":"lakshit001@yopmal.com","profile_image":null},{"_id":"62c811dfa791fa3e38038702","first_name":"shubahm","last_name":"dbrl","email":"lakshit002@yopmal.com","profile_image":null}],"totalDocs":2,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}}
   **/
  public async preferredUsers(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const page = req.query.page;
      const user: UserInterface = await User.findOne({ _id: req.userData._id });
      const userId = user._id;
      const preferences: [ObjectId] = user.preferences;
      const { error, message, data } = await PreferenceService.suggestedUsers(userId, preferences, page);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {Post} /api/v1/app/preferences/follow-users  Follow User
   * @apiVersion 1.0.0 
   * @apiName Follow Preferred User
   * @apiGroup User Auth
   * @apiParamExample {json} Request
   * {"interests": "62c574c5c6bc13245c35c037"}
   * @apiParam {String} interests 62c574c5c6bc13245c35c037
   * @apiSuccessExample {json} Error-Response
    {"status":200,"statusText":"SUCCESS","message":"Followed user successfully!","data":{"_id":"62cc287464dc1923a0695abc","followee":"62c574c5c6bc13245c35c037","follower":"62c811dfa791fa3e38038702","created_at":"2022-07-11T13:41:08.385Z","updated_at":"2022-07-11T13:41:08.385Z","__v":0}}
  **/
  public async followInterests(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const interests: any = req.body.interests;
      const userId = req.userData._id;
      const { error, message, data } = await PreferenceService.followUsers(userId, interests);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data);
    } catch (err) {
      next(err);
    }
  }

  /**
  * @api {Post} /api/v1/app/preferences/unfollow-users  Un Follow User
  * @apiVersion 1.0.0 
  * @apiName Un Follow Preferred User
  * @apiGroup User Auth
  * @apiParamExample {json} Request
  * {"interests": "62c574c5c6bc13245c35c037"}
  * @apiParam {String} interests 62c574c5c6bc13245c35c037
  * @apiSuccessExample {json} Error-Response
  {"status":200,"statusText":"SUCCESS","message":"User un-followed successfully!","data":{}}
 **/
  public async unfollowInterests(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const follower = req.userData._id;
      const followee = req.body.interests;
      const { error, message, data } = await PreferenceService.unFollowUsers(follower, followee, next);
      if (error) {
        return _RS.badRequest(res, "BAD_REQUEST", message, data);
      }
      return _RS.ok(res, "SUCCESS", message, data);
    } catch (err) {
      next(err);
    }
  }


  /**
* @api {Post} /api/v1/app/preferences/mass-follow  Follow Multiple Users
* @apiVersion 1.0.0 
* @apiName Follow Multiple Users
* @apiGroup User Auth
* @apiParamExample {json} Request
* {"interests": ["62c811dfa791fa3e38038702","62c81a7b5eb840839c0938a7","62cbacd55eb840839c0938ac"]}
* @apiSuccessExample {json} Error-Response
  {"status":200,"statusText":"SUCCESS","message":"User un-followed successfully!","data":{}}
**/
  public async massFollowInterests(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const userId = req.userData._id;
      const followees = req.body.interests;
      const { error, message, data, responseText } = await PreferenceService.massFollowUsers({ userId, followees });
      if (error) {
        return _RS.badRequest(res, responseText, message, data);
      }
      return _RS.ok(res, responseText, message, data);
    } catch (err) {
      next(err);
    }
  }
}

export default new PreferenceController();