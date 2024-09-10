const express = require("express");
const CONFIG = require("./config/config");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { requiresAuth } = require("express-openid-connect");
const connectToDatabase = require("./database/db");
const BlogRouter = require("./routes/blog");
const bodyParser = require("body-parser");
const logger = require("./Login/logger");

const auth0Middleware = require("./auth/auth0");

const app = express();

//Connecting to Database
connectToDatabase();

//Adding Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// Security Middleware
app.use(helmet());

app.use(auth0Middleware);

app.use("/blog", requiresAuth(), BlogRouter);

app.get("/", (req, res) => {
  res.send("Blog is Working");
});

app.use(limiter);
//Error Handler Middleware

app.use((err, req, res, next) => {
  logger.log(err.message);

  const errorStatus = err.status || 500;
  res.status(errorStatus).send("An error occured");
  next();
});

app.listen(CONFIG.PORT, () => {
  logger.info(`Server is working on localhost ${CONFIG.PORT}`);
});
