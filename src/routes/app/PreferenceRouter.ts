import { Router } from "express";
import PreferenceController from "../../controllers/app/v1/PreferenceController";
import GlobalMiddleware from "../../middlewares/GlobalMiddleware";
import AuthValidation from "../../validators/app/AuthValidation";
class PreferenceRouter {
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
        this.router.get('/', GlobalMiddleware.authenticate, PreferenceController.index);
        this.router.get('/users', GlobalMiddleware.authenticate, PreferenceController.preferredUsers);
    }

    public post() {
        this.router.post('/', GlobalMiddleware.authenticate, PreferenceController.store);
        this.router.post('/follow-users', GlobalMiddleware.authenticate, AuthValidation.followInterests, PreferenceController.followInterests);
        this.router.post('/unfollow-users', GlobalMiddleware.authenticate, AuthValidation.followInterests, PreferenceController.unfollowInterests);
        this.router.post('/mass-follow', GlobalMiddleware.authenticate, AuthValidation.massfollowInterests, PreferenceController.massFollowInterests)
    }

    public patch() {

    }

    public put() {

    }

    public delete() {

    }
}

export default new PreferenceRouter().router;