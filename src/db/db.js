import mongoose from "mongoose"

async function ConnectDB() {


try {
    await mongoose.connect(process.env.DB_URI)
    console.log("DB Connected Succesfully");
    
} catch(err) {
    console.log(`Database Connection Error : ${err}`);
}

}

export default ConnectDB