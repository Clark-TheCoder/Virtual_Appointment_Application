import pool from "./db.js";

async function setupCleanupEvents() {
  try {
    // Enable event scheduler
    await pool.query("SET GLOBAL event_scheduler = ON");

    // Delete 'generated' calls older than 24h
    await pool.query(`
      CREATE EVENT IF NOT EXISTS cleanup_generated_calls
      ON SCHEDULE EVERY 1 DAY
      DO
        DELETE FROM calls
        WHERE status = 'generated'
        AND date_created < NOW() - INTERVAL 24 HOUR;
    `);

    // Delete 'in-progress' calls with no end time older than 24h
    await pool.query(`
      CREATE EVENT IF NOT EXISTS cleanup_inprogress_calls
      ON SCHEDULE EVERY 1 DAY
      DO
        DELETE FROM calls
        WHERE status = 'in_progress'
        AND call_end_time IS NULL
        AND call_start_time < NOW() - INTERVAL 24 HOUR;
    `);

    console.log("Cleanup events created");
  } catch (err) {
    console.error("Failed to create cleanup events:", err);
  } finally {
    pool.end();
  }
}

setupCleanupEvents();
