import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost", // ตั้งค่าฮอสต์ของฐานข้อมูล
  user: "root", // ตั้งค่าชื่อผู้ใช้ฐานข้อมูล
  password: "root", // ตั้งค่ารหัสผ่าน
  database: "kjadatabase", // ตั้งค่าชื่อฐานข้อมูล
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const query = (query: string, values: unknown) => {
  return new Promise<unknown>((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
