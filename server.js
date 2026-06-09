import app from "./src/app.js";
import ConnectDB from "./src/db/db.js";
import 'dotenv/config'

ConnectDB()


app.listen(3000, () => {
    console.log("App is Listening");
})