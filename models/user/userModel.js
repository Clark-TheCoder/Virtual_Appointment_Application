import pool from "../db.js";

export async function createNewUser(
  firstname,
  lastname,
  email,
  position,
  hashedPassword
) {
  const sql = `
    INSERT INTO user (firstname, lastname, email, position, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    // Insert new user
    const [result] = await pool.query(sql, [
      firstname,
      lastname,
      email,
      position,
      hashedPassword,
    ]);

    // Fetch the newly inserted user by insertId
    const [rows] = await pool.query(
      `SELECT id, firstname, lastname, email, position
       FROM user
       WHERE id = ?`,
      [result.insertId]
    );

    return rows[0]; // return just the user object
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}

export async function findUserByEmail(email) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM user WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length > 0) {
      return rows[0]; // User exists
    }
    return null; // User does not exist
  } catch (error) {
    throw error;
  }
}
