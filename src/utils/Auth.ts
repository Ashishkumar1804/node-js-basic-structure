import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import { env } from "../environments/Env";

class Auth {

    public MAX_TOKEN_TIME = 600000;

    generateVerificationCode(size: number = 4): string {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    decodeJwt(token) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            })
        });
    }

    async getToken(data, expiresIn, next) {
        console.log(data);
        console.log(env().jwtSecret)
        expiresIn = "30d";
        try {
            return Jwt.sign(
                data,
                env().jwtSecret,
                {
                    expiresIn
                }
            );
        } catch (err) {
            return next(err)
        }
    }


    async comparePassword(candidatePassword: string, userPassword: string): Promise<any> {
        console.log(candidatePassword, userPassword)
        return new Promise((resolve, reject) => {
            Bcrypt.compare(candidatePassword, userPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }));
        });

    }

    encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }

            });

        });
    }


}

export default new Auth();