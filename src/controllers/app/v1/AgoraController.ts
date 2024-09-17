const { RtcTokenBuilder, RtcRole, RtmTokenBuilder } = require('agora-access-token');
import _RS from "../../../helpers/ResponseHelper"
class AgoraController {
    async generateRTM(req, res, next) {
        try {
            const APP_ID = process.env.APP_ID;
            const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
            const currentTime = Math.floor(Date.now() / 1000);
            const expireTime = Math.floor(Date.now() / 1000) + (30 * 60000);
            console.log(expireTime, "expireTime")
            const privilegeExpireTime = currentTime + expireTime;
            const channelName = req.params.channel;
            const uid = req.params.uid;
            let role;
            if (req.params.role === 'publisher') {
                role = RtcRole.PUBLISHER;
            } else if (req.params.role === 'audience') {
                role = RtcRole.SUBSCRIBER
            }
            let token;
            if (req.params.tokentype === 'userAccount') {
                //  token = RtcTokenBuilder.buildTokenWithAccount(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
            } else if (req.params.tokentype === 'uid') {
                // token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, uid, privilegeExpireTime);
                token = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid, privilegeExpireTime);
            }

            return _RS.ok(res, "SUCCESS", "Success", { token })
        } catch (error) {
            next(error)
        }
    }
}

export default new AgoraController();