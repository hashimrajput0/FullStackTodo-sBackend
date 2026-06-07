import app from "./src/app.js";
import ConnectDB from "./src/db/db.js";
import 'dotenv/config'
import cors from "cors"

ConnectDB()
app.use(cors())

app.listen(3000, () => {
    console.log("App is Listening");
})