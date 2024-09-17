import _RS from "../../../helpers/ResponseHelper"
import HotelBookingService from "../../../services/app/HotelBookingService";
import { ReqInterface, ResInterface } from "../../../interfaces/RequestInterface";
import { NextFunction } from "express";
class HotelController {

    /**
* @api {Post} /api/v1/app/hotel-booking  Hotel Booking
* @apiVersion 1.0.0 
* @apiName Hotel Booking
* @apiGroup Hotel
* @apiParamExample {json} Request
* {"data":{"offerId":"37N5IHV2S5","guests":[{"name":{"title":"MR","firstName":"BOB","lastName":"SMITH"},"contact":{"phone":"+33679278416","email":"bob.smith@email.com"}}],"payments":[{"method":"creditCard","card":{"vendorCode":"VI","cardNumber":"4111111111111111","expiryDate":"2023-01"}}]}}
* @apiErrorExample {json} Error-Response
*{"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"data.payments[0].method\" is required"]}}
* @apiErrorExample {json} Error-Response
*{"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"data.guests\" is required"]}}
* @apiErrorExample {json} Error-Response
* {"status":400,"statusText":"NOT_ACCEPTABLE","message":"OFFERID HAS EXPIRED. PLEASE GET A NEW OFFERID AND TRY AGAIN","data":{}}
* @apiSuccessExample {json} Success-Response
{"status":200,"statusText":"SUCCESS","message":"Hotel Booked Successfully!","data":{"type":"hotel-booking","booking_id":"RT_5302WGJ506","providerConfirmationId":"5302WGJ506","time_stamp":"1658324271036","_id":"62d8057617b28f1031fefec0","associatedRecords":[{"reference":"J9VTY3","originSystemCode":"GDS","_id":"62d8057617b28f1031fefec1"}],"user_id":"62d79e8e16b1c36b308c607c","created_at":"2022-07-20T13:39:02.592Z","updatedAt":"2022-07-20T13:39:02.592Z","__v":0,"id":"62d8057617b28f1031fefec0"}}
**/
    async hotelReservation(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const userId = req.userData._id;
            const reqData = req.body.data;
            console.log("REQUEST DATA", reqData)
            const tokenData = await HotelBookingService.generateAccessToken();
            if (!tokenData && !tokenData?.data?.access_token) {
                return _RS.badRequest(res, "NO_TOKEN", "Token not generated from amadeus.", {});
            }
            const access_token = tokenData.data.access_token;
            const { error, message, data, responseText } = await HotelBookingService.bookHotel({ userId: userId, data: reqData, access_token: access_token })
            if (error) {
                return _RS.badRequest(res, responseText, message, data)
            }
            return _RS.ok(res, responseText, message, data);
        } catch (err) {
            next(err);
        }
    }

}
export default new HotelController();