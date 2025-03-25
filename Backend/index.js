import { log } from "console";
import app from "./app.js";
import cloudinary from "cloudinary"
import {connectDb} from "./Database/dbconnection.js";


connectDb();

app.listen(process.env.PORT , ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
    
})