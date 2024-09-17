import { Router } from "express";
import HotelController from "../../controllers/app/v1/HotelController";
import HotelBookingValidation from "../../validators/app/HotelBookingValidation"
import GlobalMiddleware from "../../middlewares/GlobalMiddleware";
class HotelBookingRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.get();
        this.patch();
        this.post();
        this.put();
        this.delete();
    }

    get() {

    }

    post() {
        this.router.post('/', GlobalMiddleware.authenticate, HotelBookingValidation.bookingValidation, HotelController.hotelReservation);
    }

    patch() {

    }

    put() {

    }

    delete() {

    }
}

export default new HotelBookingRouter().router;