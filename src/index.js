import { configDotenv } from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
const PORT = process.env.PORT || 8000;

configDotenv({
    path: './.env'
});

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.error("Error in MongoDB connectoion: ", err)
});

console.log("Current working directory:", process.cwd());