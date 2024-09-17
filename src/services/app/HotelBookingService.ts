import axios from "axios";
import * as qs from "qs";
import { env } from "../../environments/Env";
import { HotelBookingInterface } from "../../interfaces/modelInterfaces/HotelBookingInterface";
import { ServiceResponseInterface } from "../../interfaces/ServiceResponseInterface";
import HotelBooking from "../../models/HotelBooking";
import { serviceResponse } from "../../utils/ServiceResponse";
class HotelBookingService {

    /**
     * Hotel Reservation
     * @param param0 
     * @returns 
     */
    async bookHotel({ userId, data, access_token }): Promise<ServiceResponseInterface> {
        let bookingUrl = 'https://test.api.amadeus.com/v1/booking/hotel-bookings';
        try {
            const response = await axios.post(bookingUrl, { data }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            });
            let responseData = response.data.data[0];
            let booking: HotelBookingInterface = new HotelBooking();
            booking.user_id = userId;
            booking.type = responseData.type;
            booking.booking_id = responseData.id;
            booking.providerConfirmationId = responseData.providerConfirmationId;
            booking.associatedRecords = responseData.associatedRecords;
            await booking.save();
            return serviceResponse(false, "Hotel Booked Successfully!", booking, "SUCCESS");
        } catch (err) {
            console.log(err.response.data)
            let msg = err.response.data.errors[0].title;
            return serviceResponse(true, msg, {}, "NOT_ACCEPTABLE");
        }
    }

    /**
     * Generate Access Token
     * @returns 
     */
    async generateAccessToken() {
        const data = {
            "client_id": env().amadeusClientId,
            "client_secret": env().amadeusClientSecret,
            "grant_type": "client_credentials"
        };
        let tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: tokenUrl,
        };
        let tokenData = await axios(options);
        return tokenData;
    }
}

export default new HotelBookingService(); 