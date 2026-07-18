import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";


async function testConnection(){

    await addDoc(
        collection(db,"test"),
        {
            message:"CampusPulse Backend Connected",
            time:new Date()
        }
    );

    console.log("Firebase Connected");

}


testConnection();