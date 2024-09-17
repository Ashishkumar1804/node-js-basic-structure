import * as Jwt from 'jsonwebtoken';
import { env } from "../environments/Env"
export default class JwtHelper {

    /**
   * Generate jwt token
   * @param userObject A User Object contain at least _id of the User
   * @returns Jwt Token
   */
    static generateJwtToken(userObject: any) {
        {
            // console.log('env', env().jwtSecret);
            return Jwt.sign(userObject, env().jwtSecret, {
                expiresIn: 86400000000 * 7,
            });
        };
    }

    /**
     * Generate One Time Password
     * @param length length of the otp
     * @param expiresIn minutes to expire otp
     * @returns otp
     * @returns expiresIn
     * @returns An otp of given length and expire time 
     */
    static otpGenerator(length: number, expiresIn: number): { otp: string, expiresIn: number } {
        var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let otp: string = '';
        for (let i = 0; i < length; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        expiresIn = (new Date().getTime()) + (60000 * expiresIn);
        return { otp, expiresIn }
    }
}