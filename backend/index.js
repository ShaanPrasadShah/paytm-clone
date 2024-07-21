const express = require("express");
const app = express();
const cors = require("cors")

const mainRouter = require('./routes/index')
const userRouter = require('./routes/user');
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());


app.use('/api/v1/',mainRouter);



app.listen(3000);
