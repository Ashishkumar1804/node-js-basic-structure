import { Router } from "express";
import AgoraController from "../../controllers/app/v1/AgoraController";
import PreferenceController from "../../controllers/app/v1/PreferenceController";
import UserController from "../../controllers/app/v1/UserController";
import GlobalMiddleware from "../../middlewares/GlobalMiddleware";
import AuthValidation from "../../validators/app/AuthValidation";
import UserValidation from "../../validators/app/UserValidation";
class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.get();
        this.patch();
        this.post();
        this.put();
        this.delete();
    }

    public get() {
        this.router.get('/', GlobalMiddleware.authenticate, UserController.userProfile);
        this.router.get('/followers', GlobalMiddleware.authenticate, UserController.getFollowers);
        this.router.get('/followings', GlobalMiddleware.authenticate, UserController.getFollowings);
        this.router.get('/:id', GlobalMiddleware.authenticate, UserController.otherUserDetails);
        this.router.get('/search/users', GlobalMiddleware.authenticate, UserValidation.searchUser, UserController.searchUser);
        this.router.get('/rtc/:channel/:role/:tokentype/:uid', AgoraController.generateRTM)
    }

    public post() {

    }

    public patch() {

    }

    public put() {
        this.router.put('/password-change', GlobalMiddleware.authenticate, AuthValidation.changePassword, UserController.changePassword);
    }

    public delete() {
        this.router.delete('/', GlobalMiddleware.authenticate, AuthValidation.deleteUser, UserController.deleteAccount);
    }
}

export default new UserRouter().router;