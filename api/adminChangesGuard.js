const db = require('./db/connect').promise();

exports.adminChangesGuard = async (req, res, next) => {
    const loc = req.locals;
    await db.execute(`INSERT INTO admin_changes_table (admin_id, type, success, num_of_changes, file_last_mod, file_name_used) VALUES 
    (${loc.verifiedUser.id}, "${loc.dbStatus.type}", ${loc.dbStatus.success}, ${loc.dbStatus.rowsAttemped}, "${loc.dbStatus.fileLastModified}", "${loc.dbStatus.filename}");`);
    // TODO: If fails log it!
}