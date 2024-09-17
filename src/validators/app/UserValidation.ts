import { validate } from "../../helpers/ValidationHelper";
import * as Joi from "joi";
import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
import _RS from "../../helpers/ResponseHelper"
class UserValidation {
    static async searchUser(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            search: Joi.string().required(),
            page: Joi.number().required()
        })
        const isValid = await validate(req.query, res, schema);
        if (isValid) {
            next();
        }
    }
}

export default UserValidation;