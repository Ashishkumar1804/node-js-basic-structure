import { TaskController } from './controllers/scheduler/TaskController';
import { Server } from './server';
const server: any = require('http').Server(new Server().app);
let port = process.env.PORT || 3000;
const cron = require('node-cron');
server.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});

// cron everyday
cron.schedule('0 1 * * *', function () {
    TaskController.lockInactiveUsers();
});
// cron at ever 5 minute
cron.schedule('*/5 * * * *', function () {
    //   console.log("delete User Called!", new Date().getMinutes());
    TaskController.deleteUsers()
});



