import JwtHelper from "../../helpers/JwtHelper";
import { UserInterface } from "../../interfaces/modelInterfaces/UserInterface";
import User from "../../models/User";
import { serviceResponse } from "../../utils/ServiceResponse";
import { ServiceResponseInterface } from "../../interfaces/ServiceResponseInterface";
import MailHelper from "../../helpers/MailHelper";
import Auth from "../../utils/Auth";

class ForgetCredentialsService {

    /**
     *  Forget Password
     * @param email 
     * @returns / {error,message,data,responseText}
     */
    async forgetPassword(email: string): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        if (!user) {
            return serviceResponse(true, "User not found!", {}, "NOT_FOUND")
        }
        user = await this.setUserOtp(user);
        await MailHelper.forgetPasswordEmail({ email: user.email, name: user.first_name, otp: user.otp.otp });
        const data = process.env.NODE_ENV == "dev" ? { data: user.otp } : {};
        return serviceResponse(false, "OTP send to email address successfully!", data)
    }


    /**
  *  Forget Password Verify Otp
  * @param email 
  * @param otp 
  * @returns / {error,message,data,responseText}
  */
    async verifyOtp(email: string, otp): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        if (!user) {
            return serviceResponse(true, "User not found!", {}, "NOT_FOUND")
        }
        if (user.otp.otp != otp) {
            return serviceResponse(true, "Invalid OTP Provided!", {}, "INVALID_OTP");
        }
        if (user.otp.expiration_time < new Date().getTime()) {
            return serviceResponse(true, "Expired OTP Provided!", {}, "EXPIRED_OTP",);
        }
        user.otp.otp = null;
        user.otp.is_verified = true;
        user.otp.is_expired = true;
        await user.save();
        return serviceResponse(false, "OTP verified successfully!", {}, "SUCCESS");
    }


    /**
     * Forget Username
     * @param email 
     * @returns 
     */
    async forgetUsername(email: string): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        if (!user) {
            return serviceResponse(true, "User not found!", {}, "NOT_FOUND")
        }
        user = await this.setUserOtp(user);
        await MailHelper.forgetUsernameEmail({ email: user.email, name: user.first_name, otp: user.otp.otp });
        const data = process.env.NODE_ENV == "dev" ? { data: user.otp } : {};
        return serviceResponse(false, "OTP send to email address successfully!", data)
    }


    /**
     *  Reset Password
     * @param param0 
     * @returns 
     */
    async resetPassword({ email, password }: { email: string, password: string }): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email }).select('+password');
        if (!user) {
            return serviceResponse(true, "No User found!", {}, "NOT_FOUND",)
        }
        user.password = await Auth.encryptPassword(password);
        await user.save();
        return serviceResponse(false, "Password changed successfully!", {}, "SUCCESS")
    }


    /**
     * Reset Username
     * @param param0 
     * @returns 
     */
    async resetUsername({ email, username }: { email: string, username: string }): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        if (!user) {
            return serviceResponse(true, "No User found!", {}, "NOT_FOUND",)
        }
        user.username = username;
        await user.save();
        return serviceResponse(false, "Username Added Successfully!", {}, "SUCCESS");
    }


    /**
     * Set User OTP
     * @param user 
     * @returns user
     */
    private async setUserOtp(user: UserInterface): Promise<UserInterface> {
        const { otp, expiresIn } = JwtHelper.otpGenerator(4, 5);
        user.otp.otp = otp;
        user.otp.expiration_time = expiresIn;
        user.otp.is_expired = false;
        await user.save();
        return user;
    }


    /**
     * Resend Otp
     * @param email 
     * @returns 
     */
    async resendOtp({ email, type }: { email: string, type: string }): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        user = await this.setUserOtp(user);
        switch (type) {
            case "FORGET_PASSWORD":
                await MailHelper.forgetPasswordEmail({ email: user.email, name: user.first_name, otp: user.otp.otp });
                break;
            case "FORGET_USERNAME":
                await MailHelper.forgetUsernameEmail({ email: user.email, name: user.first_name, otp: user.otp.otp });
                break;
            case "USER_REGISTER":
                await MailHelper.accountRegistration({ email: user.email, name: user.first_name, otp: user.otp.otp });
                break;
            case "ACCOUNT_UNLOCK":
                await MailHelper.unlockAccount({ email: user.email, name: user.first_name, otp: user.otp.otp });
                break;
            default:
                break;
        }
        let data = {};
        if (process.env.NODE_ENV == "dev") {
            data = user.otp;
        }
        return serviceResponse(false, "OTP send to email successfully!", data, "SUCCESS")
    }

}

export default new ForgetCredentialsService();