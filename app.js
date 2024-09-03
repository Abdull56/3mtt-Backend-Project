const express = require("express");
const CONFIG = require("./config/config");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectToDatabase = require("./database/db");
const BlogRouter = require("./routes/blog");
const bodyParser = require("body-parser");
const logger = require("./Login/logger");

const app = express();

//Connecting to Database
connectToDatabase();

//Adding Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/blog", BlogRouter);

app.get("/", (req, res) => {
  res.send("Blog is Working");
});

// Security Middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
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
