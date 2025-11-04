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

    return rows[0];
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
      return rows[0];
    }
    return null; // User does not exist
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfile(userFields, userId) {
  try {
    const keys = Object.keys(userFields);
    const values = Object.values(userFields);

    if (keys.length === 0) {
      throw new Error("No fields provided to update.");
    }

    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    // Update user info
    const [result] = await pool.query(
      `UPDATE user SET ${setClause} WHERE id = ?`,
      [...values, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found or no changes made.");
    }

    // Fetch updated user
    const [rows] = await pool.query(
      `SELECT id, firstname, lastname, email, position
       FROM user
       WHERE id = ?`,
      [userId]
    );

    return rows[0];
  } catch (error) {
    throw new Error("Error updating user profile: " + error.message);
  }
}
