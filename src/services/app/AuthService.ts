import { AuthInterface } from "../../interfaces/serviceInterfaces/AuthInterface";
import { UserInterface } from "../../interfaces/modelInterfaces/UserInterface";
import User from "../../models/User";
import JwtHelper from "../../helpers/JwtHelper";
import Auth from "../../utils/Auth";
import { NextFunction } from "express";
import { ServiceResponseInterface } from "../../interfaces/ServiceResponseInterface";
import FileUploadHelper from "../../helpers/FileUploadHelper";
import { serviceResponse } from "../../utils/ServiceResponse";
import MailHelper from "../../helpers/MailHelper";
import Preference from "../../models/Preference";
class AuthService implements AuthInterface {


    /**************************************************************
       * Logging Buddy User
       * @param data: {username:string,password:string}
       * @returns data: {error: Boolean, message: string, data:any} 
       **************************************************************/
    public async logIn(data: { username: string, password: string }, next: NextFunction): Promise<ServiceResponseInterface> {
        let user = await User.findOne({ username: data.username }).select('+password').populate('preferences', 'name', 'Preference');
        if (!user) {
            return serviceResponse(true, "Invalid Username or Password!", {});
        }
        /** VERIFY USER PASSWORD */
        const checkPassword: Boolean = await Auth.comparePassword(data.password, user.password);
        if (!checkPassword) {
            return serviceResponse(true, "Invalid Username or Password!", {});
        }
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
        user.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(user.profile_image) : user.profile_image
        const responseData = { user, token: jwtToken };
        return serviceResponse(false, "Logged in successfully", responseData);
    }


    public async logOut(data) {
        console.log(data);
    }



    /***********************************************************************
    * Register Buddy User 
    * @param data
    * @param files
    * @returns User
    **********************************************************************/
    public async register(data: any, files: any, next: NextFunction): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ "$or": [{ username: data.username, profile_verified: false }, { email: data.email, profile_verified: false }] }).select('+password');
        const { otp, expiresIn } = JwtHelper.otpGenerator(4, 5);
        if (user) {
            user.username = data.username;
            user.email = data.email;
            user.password = await Auth.encryptPassword(data.password);
        } else {
            data.password = await Auth.encryptPassword(data.password);
            user = await User.create(data);
        }
        user.otp.otp = otp;
        user.otp.expiration_time = expiresIn;
        /** Upload Profile pic */
        if (files.profile_image) {
            const imagePath: any = await FileUploadHelper.uploadInS3(files.profile_image);
            if (imagePath) {
                user.profile_image = imagePath;
            }
        }
        await user.save();
        user.password = undefined;
        user.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(user.profile_image) : user.profile_image
        await MailHelper.accountRegistration({ email: user.email, name: user.first_name, otp: user.otp.otp });
        return serviceResponse(false, "Successfully Registered!", user);
    }


    /***********************************************************************
       * Register Buddy User 
       * @param data any
       * @param next NextFunction
       * @returns 
       **********************************************************************/
    public async verifyOtp(data: any, next: NextFunction): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: data.email }).select('+password');
        const currentTimestamp = new Date().getTime();
        /****************** User Not Exit *************/
        if (!user) {
            return serviceResponse(true, "User not found!", {})
        }
        /***************** Invalid Otp Provided ********/

        if (user.otp.otp != data.otp) {
            return serviceResponse(true, "Invalid OTP Provided!", {})
        }
        /**************** Otp Expired ****************/
        if (user.otp.expiration_time < currentTimestamp) {
            user.otp.is_expired = true;
            await user.save();
            return serviceResponse(true, "Provided OTP has been expired!", {})
        }
        /** --------------------- Verify Otp if all goes well ------------------------ */
        user.otp.is_verified = true;
        user.otp.otp = null;
        user.otp.expiration_time = null;
        user.profile_verified = true;
        await user.save();
        /** USER OBJECT TO BE ENCODED */
        let userObj = {
            _id: user._id,
            first_name: user.first_name,
            created_at: user.created_at,
            account_locked: user.is_locked
        }
        /** JWT TOKEN CREATED FOR THE USER */
        const jwtToken = await Auth.getToken(userObj, 100000, next);
        /** PREPARE RETURN DATA */
        user.password = undefined;
        user.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(user.profile_image) : user.profile_image
        const responseData = { user, token: jwtToken };
        /** Response */
        return serviceResponse(false, "Logged in successfully", responseData)
    }

    /***********************************************************************
     * Complete User Profile
     * @param userId any
     * @param data any
     * @param next NextFunction
     * @returns 
     **********************************************************************/
    public async completeProfile(userId: any, data: any, next: NextFunction): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ _id: userId });
        const { first_name, middle_name, last_name, phone, date_of_birth, preferences } = data;
        if (!user) {
            return serviceResponse(true, "User not found!", {})
        }
        user.first_name = first_name;
        user.middle_name = middle_name;
        user.last_name = last_name;
        user.phone = phone;
        user.date_of_birth = date_of_birth;
        user.is_profile_completed = true;
        user.preferences = preferences;
        await user.save();
        let userData = await User.findOne({ _id: user._id }).populate('preferences', 'name', 'Preference');
        userData.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(userData.profile_image) : userData.profile_image
        return serviceResponse(false, "Successfully completed!", userData ? { user: userData } : {})
    }

    /**
     * Send Otp to email address 
     * @param userId 
     * @param email 
     */
    public async unlockBuddyAccount(email): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        if (!user) {
            return serviceResponse(true, "Try with your registered email address!", {});
        }
        const { otp, expiresIn } = JwtHelper.otpGenerator(4, 5);
        user.otp.otp = otp;
        user.otp.expiration_time = expiresIn;
        user.otp.is_expired = false;
        user.otp.is_verified = false;
        await user.save();
        // Need to add send email code here.
        // -------------- Send Email code goes here --------------
        //
        if (process.env.NODE_ENV == 'dev') {
            return serviceResponse(false, "OTP sent to the email address!", { data: user.otp });
        }
        return serviceResponse(false, "OTP sent to the email address!", {});
    }

    /**
     * Account Unlocked 
     * @param userId 
     * @param otp 
     */
    public async accountUnlocked(email, otp): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ email: email });
        if (user.otp.otp !== otp) {
            return serviceResponse(true, "Invalid OTP Provided!", {}, "INVALID_OTP");
        }
        if (user.otp.expiration_time < new Date().getTime()) {
            return serviceResponse(true, "Expired OTP Provided!", {}, "EXPIRED_OTP",);
        }
        user.otp.otp = null;
        user.otp.is_verified = true;
        user.otp.is_expired = true;
        user.is_locked = false;
        await user.save();
        return serviceResponse(false, "OTP verified successfully!", {});
    }


    /**
     * Social Signup User
     * @param data 
     * @param files 
     * @param next 
     * @returns 
     */
    async socialRegister(data: any, files: any, next: NextFunction): Promise<ServiceResponseInterface> {
        const { username, email, ssid, login_by } = data;
        let user: UserInterface = await User.findOne({ username, email, ssid, login_by });
        if (!user) {
            user = await User.create({ username, email, ssid, login_by });
        }
        user.profile_verified = true;
        if (files.profile_image) {
            const imagePath: any = await FileUploadHelper.uploadInS3(files.profile_image);
            if (imagePath) {
                user.profile_image = imagePath;
            }
        }
        await user.save();
        let userObj = {
            _id: user._id,
            first_name: user.first_name,
            created_at: user.created_at,
            account_locked: user.is_locked
        }
        let jwtToken = await Auth.getToken(userObj, 100000, next);
        user.password = undefined;
        user.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(user.profile_image) : user.profile_image
        const responseData = { user, token: jwtToken };
        return serviceResponse(false, "Logged in successfully", responseData, "SUCCESS");
    }

    /**
     * Social Login User
     * @param data 
     * @param next 
     */
    async socialSignIn(userId: string, next: NextFunction): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ _id: userId }).populate('preferences', 'name', 'Preference');
        let userObj = {
            _id: user._id,
            first_name: user.first_name,
            created_at: user.created_at,
            account_locked: user.is_locked
        }
        let jwtToken = await Auth.getToken(userObj, 100000, next);
        user.password = undefined;
        user.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(user.profile_image) : user.profile_image
        const responseData = { user, token: jwtToken };
        return serviceResponse(false, "Logged in successfully", responseData, "SUCCESS");
    }


    /**
     * EDIT PROFILE
     * @param param0 
     * @returns 
     */
    async updateProfile({ userId, fields, files }: { userId: string, fields: any, files: any }): Promise<ServiceResponseInterface> {
        let user: UserInterface = await User.findOne({ _id: userId }).populate('preferences', 'name', 'Preference');
        const { first_name, last_name, username, email, phone, preferences } = fields;
        let preferencesArray = preferences.split(",");
        console.log(preferencesArray)
        user.first_name = first_name ?? user.first_name;
        user.last_name = last_name ?? user.last_name;
        user.email = email ?? user.email;
        user.username = username ?? user.username;
        user.phone = phone ?? user.phone;
        user.preferences = preferencesArray ?? user.preferences;
        if (files.profile_image) {
            const imagePath: any = await FileUploadHelper.uploadInS3(files.profile_image);
            if (imagePath) {
                user.profile_image = imagePath;
            }
        }
        await user.save();
        user = await User.findOne({ _id: user._id }).populate('preferences', 'name', 'Preference');
        user.profile_image = user.profile_image ? await FileUploadHelper.getSignedS3Urls(user.profile_image) : user.profile_image
        return serviceResponse(false, "You have updated your profile successfully!", { user }, "SUCCESS");
    }


    async contact({ userId, email, subject, text }): Promise<ServiceResponseInterface> {
        const user: UserInterface = await User.findOne({ _id: userId });
        const username = user.first_name + " " + user.last_name;
        const status = await MailHelper.contact({ username, email, subject, text });
        if (status) {
            return serviceResponse(false, "Message sent!", {}, "SUCCESS");
        }
        return serviceResponse(false, "Message not sent!", {}, "FAILED");

    }
}

export default new AuthService();