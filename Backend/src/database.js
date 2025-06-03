import mongoose from "mongoose";

mongoose.set('strictQuery', true) //que sea extricta

//conexion con la base
const connection = async()=>{ 
try{
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log(`Database is connected`)
    } catch (error) {
        console.log(error);
    }
}

export default  connection;