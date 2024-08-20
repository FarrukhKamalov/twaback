const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const startBot  = require("./bot");
const userRouter = require("./routes/user.router");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kfarrux2005:kfarrux2005@cluster0.5sg8llx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

app.use(cors("*"));
app.use(express.json());
// PORT = 5500
//MONGODB_URI = mongodb+srv://kfarrux2005:kfarrux2005@cluster0.5sg8llx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//BOT_TOKEN = 7283186749:AAFUxIXH39E_yyGCEM8Wf10jadkFBdHrmZ4
//SESSION_SECRET = helloworldAppTokensTEAMsERVERsAD
app.use("/api/v1/users", userRouter)


app.listen(3000, async () => {
    console.log("Server listen: 3000");
    await connectDB();
    startBot();
});