
import { validationResult } from 'express-validator';
import { RESPONSE } from "../constants/ResponseConstant";

class Helper {

    public async errorHandler(req: any, res: any, next: any) {

        const error = validationResult(req);

        if (!error.isEmpty()) {
            const statusCode = req.errorStatus * 1 || 200;
            return res.status(statusCode).json({
                status: req.errorStatus,
                statusText: "BAD_REQUEST",
                message: error.array()[0].msg,
                data: {}
            })

        } else {
            next();
        }
    }

    public async joiErrorHandler(body, res, schema) {
        try {
            console.log('validate');
            const validation = await schema.validate(body, { abortEarly: true });

            if (validation.error) {
                const error = validation.error.details.map(e => e = e.message);
                res.status(RESPONSE.HTTP_BAD_REQUEST).json({
                    status: RESPONSE.HTTP_BAD_REQUEST,
                    statusText: "BAD_REQUEST",
                    message: error[0],
                    data: {}
                });

                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new Helper();
