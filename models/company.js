// models/company.js
const db = require("../db"); // Database connection

class Company {
  // Find all companies, optionally filter by minEmployees, maxEmployees, nameLike
  static async findAll({ minEmployees, maxEmployees, nameLike } = {}) {
    let query = `SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies`;
    let whereExpressions = [];
    let queryValues = [];

    // Add conditions to the query based on the filters
    if (minEmployees !== undefined) {
      queryValues.push(minEmployees);
      whereExpressions.push(`num_employees >= $${queryValues.length}`);
    }

    if (maxEmployees !== undefined) {
      queryValues.push(maxEmployees);
      whereExpressions.push(`num_employees <= $${queryValues.length}`);
    }

    if (nameLike) {
      queryValues.push(`%${nameLike}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    query += " ORDER BY name";
    const companiesRes = await db.query(query, queryValues);
    return companiesRes.rows;
  }
}

module.exports = Company;