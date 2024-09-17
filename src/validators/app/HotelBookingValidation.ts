import { validate } from "../../helpers/ValidationHelper";
import * as Joi from "joi";
import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
import _RS from "../../helpers/ResponseHelper"
class HotelBookingValidation {
    static async bookingValidation(req: ReqInterface, res: ResInterface, next: NextFunction) {
        let guests = Joi.object().keys({
            name: Joi.object().keys({
                title: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
            }).required(),
            contact: Joi.object().keys({
                phone: Joi.string().required(),
                email: Joi.string().required()
            }).required()
        })

        let payments = Joi.object().keys({
            method: Joi.string().required(),
            card: Joi.object().keys({
                vendorCode: Joi.string().required(),
                cardNumber: Joi.string().required(),
                expiryDate: Joi.string().required(),
            }).required()
        })

        const schema = Joi.object().keys({
            data: Joi.object().keys({
                offerId: Joi.string().required(),
                guests: Joi.array().items(guests).required(),
                payments: Joi.array().items(payments).required()
            }).required()
        })


        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }
}

export default HotelBookingValidation;