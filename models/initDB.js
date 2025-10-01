import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export async function initDB() {
  if (!DB_NAME) {
    console.error("DB_NAME is not set in your .env file");
    process.exit(1);
  }

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Database "${DB_NAME}" ensured`);

    await connection.changeUser({ database: DB_NAME });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS user (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        position VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("User table exists");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS calls (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        call_id VARCHAR(255) NOT NULL UNIQUE,
        provider_id INT NOT NULL,
        patient_alias VARCHAR(100) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        call_start_time TIMESTAMP NULL,
        call_end_time TIMESTAMP NULL,
        duration_minutes INT NULL,
        status ENUM(
          'generated',
          'scheduled',
          'in_progress',
          'completed',
          'completed_not_charted',
          'cancelled_by_patient',
          'cancelled_by_provider',
          'no_show'
        ) DEFAULT 'generated',
        call_notes JSON DEFAULT (JSON_OBJECT(
          'plan', 'No care plan provided.',
          'notes', 'No additional notes provided.',
          'summary', 'No summary provided.'
        )),
        access_token VARCHAR(64) NULL,
        FOREIGN KEY (provider_id) REFERENCES user(id) ON DELETE CASCADE
      );
    `);
    console.log("Call table exists");

    await connection.end();
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
}

initDB();
