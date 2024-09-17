import { Router } from "express";
import AuthController from "../../controllers/app/v1/AuthController";
import UserController from "../../controllers/app/v1/UserController";
import GlobalMiddleware from "../../middlewares/GlobalMiddleware";
import AuthValidation from "../../validators/app/AuthValidation";
class AuthRouter {
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


    }

    public post() {
        this.router.post('/register', GlobalMiddleware.formDataParser, AuthValidation.register, GlobalMiddleware.usernameEmailAvailability, AuthController.register);
        this.router.post('/login', AuthValidation.login, AuthController.login);
        this.router.post('/verify-otp', AuthValidation.verifyOtp, AuthController.verifyOtp);
        this.router.post('/complete-profile', GlobalMiddleware.authenticate, AuthValidation.completeProfile, AuthController.completeProfile);
        this.router.post('/unlock-account-email', AuthValidation.unlockAccountEmail, AuthController.unlockBuddyAccount);
        this.router.post('/unlock-account', AuthValidation.unlockAccount, AuthController.accountUnlocked);
        this.router.post('/password/reset', AuthValidation.resetPassword, AuthController.resetPassword);
        this.router.post('/social/register', GlobalMiddleware.formDataParser, AuthValidation.socialLogin, AuthController.socialRegister)
        this.router.post('/social/login', AuthValidation.socialLoginCheck, AuthController.socialLogin);
        this.router.post('/contact', GlobalMiddleware.authenticate, AuthValidation.contact, AuthController.contact)
    }

    public patch() {

    }

    public put() {
        this.router.put('/password/forget', AuthValidation.forgetPassword, AuthController.forgetPassword);
        this.router.put('/username/forget', AuthValidation.forgetPassword, AuthController.forgetUsername);
        this.router.put('/password/verify-otp', AuthValidation.forgetPasswordVerifyOtp, AuthController.otpVerification);
        this.router.put('/username/verify-otp', AuthValidation.forgetPasswordVerifyOtp, AuthController.otpVerification);
        this.router.put('/username/reset', AuthValidation.resetUsername, AuthController.resetUsername);
        this.router.put('/resend-otp', AuthValidation.resendOtp, AuthController.resendOtp)
        this.router.put('/update-profile', GlobalMiddleware.authenticate, GlobalMiddleware.formDataParser, AuthValidation.editProfile, GlobalMiddleware.checkUsernameEmailAvailability, AuthController.updateProfile)
    }

    public delete() {

    }
}

export default new AuthRouter().router;