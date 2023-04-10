const express = require('express')
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
app.use("/", require("./middleware/logger"));

app.use("/availablity", require("./routes/api/availablity"));

app.use("/booking", require("./routes/api/booking"));
app.use("/wing", require("./routes/api/wing"));
