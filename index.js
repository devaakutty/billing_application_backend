const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database Connection
const connectDB = require("./config/db");

// Routers import
const userRouter = require("./routes/userRouter");
const customerRouter = require("./routes/customerRouter");
const invoiceRouter = require("./routes/invoiceRouter");
const productRouter = require("./routes/productRouter");

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000", "http://localhost:3000"],
    methods : ["GET","POST","PUT","DELETE"],
    credentials: true
}));

// routers
// app.use("/api/users", userRouter);
// app.use("/api/products", productRouter);
// app.use("/api/customers", customerRouter);
// app.use("/api/invoices", invoiceRouter);

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', customerRouter);
app.use('/api', invoiceRouter);

// test route
app.get("/", (req, res) => {
    res.send("Backend is working ");
});

// server
const PORT = process.env.PORT || 8000;
app.listen(8000, () => console.log("Server listenig on http://localhost:8000"));
