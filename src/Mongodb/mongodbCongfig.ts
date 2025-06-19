import mongoose from "mongoose"

export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)

        const connection =mongoose.connection
        connection.on("connected",()=>{
            console.log("connection with the database is successful");
        })
        connection.on("disconnected",(e)=>{
            console.log("connection with the database is unsuccessful"+e);
            process.exit()
        })
        
    } catch (error) {

        console.log(error+"something went wrong with db connection");
    }
}