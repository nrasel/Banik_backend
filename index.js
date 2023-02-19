const bodyParser = require("body-parser");
const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const authRouter = require("./routes/authRoutes");
const dbConnect = require("./config/dbConnect");
const PORT = process.env.PORT || 8080;
dbConnect();

app.get("/", (req, res) => res.send("Server is Running!"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(notFound);
app.use(errorHandler);
app.use("/api/user", authRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
