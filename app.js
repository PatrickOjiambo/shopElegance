import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/register', registerRoute)
app.use('/login', loginRoute)





app.get("/", (req, res)=>{
    res.send("The party is started")
})
const port = 4267
app.listen(port,()=>{
    console.log(`Server listening on port ${port}...`)
})