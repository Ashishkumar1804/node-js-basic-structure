import Connection from "../../models/Connection";
import HotelBooking from "../../models/HotelBooking";
import User from "../../models/User"
import { UserInterface } from "../../interfaces/modelInterfaces/UserInterface"
export class TaskController {

    static async lockInactiveUsers() {
        let currentTimestamp = new Date().getTime();
        let timeBeforeThreeMonths = currentTimestamp - (90 * 24 * 60 * 60000);
        let dateBeforeThreeMonths = new Date(timeBeforeThreeMonths);
        const options = { last_login: { $lte: dateBeforeThreeMonths } };
        const data = { is_locked: true }
        await User.updateMany(options, data);
    }

    static async deleteUsers() {
        let currentTimestamp = new Date().getTime();
        let query = { delete_at: { $lte: currentTimestamp, $ne: null } }
        let user: UserInterface = await User.findOne(query);
        if (user) {
            let connectionQuery = {
                "$or": [
                    { followee: user._id },
                    { follower: user._id }
                ]
            }
            await HotelBooking.deleteMany({ user_id: user._id });
            await Connection.deleteMany(connectionQuery)
            await User.deleteOne({ _id: user._id });
        }

    }
}

