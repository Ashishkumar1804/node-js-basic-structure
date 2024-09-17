import { Router } from "express";
import AuthRoutes from "./admin/AuthRoutes";
import AuthRouter from "./app/AuthRouter";
import HotelBookingRouter from "./app/HotelBookingRouter";
import PreferenceRouter from "./app/PreferenceRouter";
import UserRouter from "./app/UserRouter";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
  }

  app() {
    this.router.use('/app/auth', AuthRouter)
    this.router.use('/app/user', UserRouter)
    this.router.use('/app/preferences', PreferenceRouter)
    this.router.use('/app/hotel-booking', HotelBookingRouter)
  }

  admin() {
    this.router.use('/admin/auth', AuthRoutes);
  }

}
export default new Routes().router;