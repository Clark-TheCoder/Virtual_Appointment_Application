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

export async function getCall(access_token, userId) {
  try {
    const [rows] = await pool.execute(
      `SELECT call_notes, status, access_token FROM calls WHERE access_token = ? AND provider_id = ?`,
      [access_token, userId]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error in getCallNotes: ${error.message}`);
  }
}

export async function updateCallNotes(access_token, userId, formData) {
  const { summary, plan, notes } = formData;

  try {
    const [result] = await pool.execute(
      `UPDATE calls
       SET call_notes = JSON_OBJECT(
         'summary', ?,
         'plan', ?,
         'notes', ?
       )
       WHERE access_token = ? AND provider_id = ?`,
      [summary, plan, notes, access_token, userId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error in updateCallNotes: ${error.message}`);
  }
}

export async function updateCallStartTime(access_token, userId) {
  try {
    const [result] = await pool.query(
      `UPDATE calls 
       SET call_start_time = NOW()
       WHERE access_token = ? AND provider_id = ?`,
      [access_token, userId]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating call start time: ${error.message}`);
  }
}

export async function updateCallEndTime(access_token, userId) {
  try {
    await pool.query(
      `UPDATE calls 
       SET call_end_time = NOW()
       WHERE access_token = ? AND provider_id = ?`,
      [access_token, userId]
    );

    const [rows] = await pool.query(
      `SELECT TIMESTAMPDIFF(MINUTE, call_start_time, call_end_time) AS duration_minutes
       FROM calls
       WHERE access_token = ? AND provider_id = ?`,
      [access_token, userId]
    );

    if (rows.length === 0) {
      throw new Error("Call not found when calculating duration.");
    }

    const duration = rows[0].duration_minutes;

    await pool.query(
      `UPDATE calls 
       SET duration_minutes = ?
       WHERE access_token = ? AND provider_id = ?`,
      [duration, access_token, userId]
    );

    return duration;
  } catch (error) {
    throw new Error(`Error updating call end time: ${error.message}`);
  }
}

export async function updateCallStatus(access_token, userId, newStatus) {
  try {
    const [result] = await pool.execute(
      `UPDATE calls SET status = ? WHERE access_token = ? AND provider_id = ?`,
      [newStatus, access_token, userId]
    );
    console.log([result]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error in updateCallStatus: ${error.message}`);
  }
}

export async function retrieveCalls(searchFields) {
  const { exactDate, startRange, endRange, status, alias } = searchFields;

  const filters = [];
  const values = [];

  if (exactDate) {
    filters.push("DATE(date_created) = ?");
    values.push(exactDate);
  }

  if (startRange && endRange) {
    const endDateObj = new Date(endRange);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const endRangePlusOne = endDateObj.toISOString().split("T")[0];

    filters.push("date_created >= ? AND date_created < ?");
    values.push(startRange, endRangePlusOne);
  }

  if (status) {
    filters.push("status = ?");
    values.push(status);
  } else {
    filters.push(
      "(status = 'completed' OR status = 'cancelled_by_provider' OR status = 'cancelled_by_patient' OR status = 'no_show')"
    );
  }

  if (alias) {
    filters.push("patient_alias = ?");
    values.push(alias);
  }

  const whereClause =
    filters.length > 0 ? "WHERE " + filters.join(" AND ") : "";

  try {
    const [results] = await pool.execute(
      `SELECT patient_alias, date_created, duration_minutes, status, call_notes 
       FROM calls ${whereClause}`,
      values
    );
    return results;
  } catch (error) {
    throw new Error(`Error in retrieveCalls: ${error.message}`);
  }
}
