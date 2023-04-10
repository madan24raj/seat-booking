const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "http://webarania.tech/build",
  user: "u406074773_space",
  password: "Space@123",
  database: "u406074773_space",
  dateStrings: true
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

module.exports = connection;