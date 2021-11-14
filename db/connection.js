import mysql from "mysql2";

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3389,
  password: "5762",
  database: "people",
  waitForConnections: true,
});

export default connection;
