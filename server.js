const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require("./routes/contactRoute");
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');

const app = express();


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://rinvent-app.vercel.app"],
    credentials: true,
  }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);


// Routes
app.get("/", (req, res) => {
    res.send("Homepage")
});

const PORT = process.env.PORT || 5000;

// Error Middleware
app.use(errorHandler);
//Connect to MongoDB and start

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        })
    })
    .catch((err) => console.log(err));