// import axios from "axios";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import db from "../firebase";

// export default async function RegistrationCheck(lp) {
//   const userRef = collection(db, "users");
//   let found_users = null;

//   const q = query(userRef, where("licensePlate", "==", lp));
//   try {
//     const response = await axios.get(
//       `https://opendata.rdw.nl/resource/8ys7-d773.json?$$app_token=${process.env.REACT_APP_RDW_APP_TOKEN}&kenteken=${lp}`
//     );
//     console.log(
//       response.data[0].brandstof_omschrijving,
//       "is there a  response?"
//     );
//     if (response.data === []) {
//       return console.log(
//         "Your License Plate is not registered in RDW system. Please check your details or try to register sometime later"
//       );
//     } else if (response.data[0].brandstof_omschrijving !== "Elektriciteit") {
//       return console.log(
//         "your car is not registered as EV. This app can be used only for EVs"
//       );
//     } else {
//       console.log("this is an EV");
//       const querySnapshot = await getDocs(q);
//       // eslint-disable-next-line no-unused-vars
//       const receiverProfile = querySnapshot.forEach(async (userDoc) => {
//         found_users = userDoc.data();
//       });
//       if (found_users !== null) {
//         return console.log(
//           "This license plate already has been registered. Please check your details"
//         );
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     console.log(error.message);
//   }
// }
