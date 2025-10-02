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
