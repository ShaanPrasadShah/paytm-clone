const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const mainRouter = require('./routes/index')

app.use(cors());
app.use(bodyParser.json());


app.use('/api/v1',mainRouter);



app.listen(3000);
