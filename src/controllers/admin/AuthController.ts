// import Admin from "../../models/AdminModel";
// import { Auth } from "../../utils/Auth";
// class AuthController {
//   static async createAdmin() {
//     try {
//       let isAdmin = await Admin.findOne({ email: 'admin@myapp.com' });
//       if (isAdmin) {
//         console.log('Admin Exist');
//       }
//       else {
//         const encryptedPassword = new Auth().encryptPassword('Admin@1234')
//         isAdmin = await Admin.create({
//           email: 'admin@myapp.com',
//           name: 'myapp',
//           password: encryptedPassword
//         });

//         console.log('Admin created')
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// export default AuthController;