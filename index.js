const bodyParser = require("body-parser");
const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const dbConnect = require("./config/dbConnect");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
dbConnect();

app.get("/", (req, res) => res.send("Server is Running!"));
// Add logging middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// for using refress token
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
