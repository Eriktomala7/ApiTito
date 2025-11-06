import mysql from "mysql2/promise";

export const conmysql = await mysql.createConnection({
  host: "interchange.proxy.rlwy.net",
  user: "root",
  password: "QlrjrTNaQsyWLMyRShLcFgKggactkQie",
  database: "railway",
  port: 27769
});
