import pool from "../db.js";

export async function createNewCall(
  call_id,
  provider_id,
  patient_alias,
  access_token
) {
  try {
    const [result] = await pool.execute(
      `INSERT INTO calls (
        call_id,
        provider_id, 
        patient_alias,
        access_token
      ) VALUES (?, ?, ?, ?)`,
      [call_id, provider_id, patient_alias, access_token]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error creating call: " + error.message);
  }
}

export async function getCurrentCalls(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT patient_alias, status, access_token
       FROM calls
       WHERE provider_id = ?
         AND DATE(date_created) = CURDATE()
         AND status IN ('generated', 'completed_not_charted', 'in_progress')`,
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error(`Error in getCurrentCalls: ${error.message}`);
  }
}

export async function deleteCallById(access_token, userId) {
  try {
    const [result] = await pool.execute(
      `DELETE FROM calls WHERE access_token = ? AND provider_id = ?`,
      [access_token, userId]
    );

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error in deleteCall: ${error.message}`);
  }
}
