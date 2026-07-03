import pool from "../configs/db.js";


class UserModel {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    const [result] = await pool.query(query);
    return result;
  }
  static async getAllUsers() {
    const query = "SELECT * FROM users";
    const [rows] = await pool.query(query);
    return rows;
  }
  static async getUserById(userId) {
    const query = "SELECT * FROM users WHERE user_id = ?";
    const [rows] = await pool.query(query, [userId]);
    return rows[0];
  }
  static async createUser(user_id, full_name, email, age) {
    const query =
      "INSERT INTO users (user_id, full_name, email, age) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [user_id, full_name, email, age]);
    return result;
    // return result.insertId;
  }
  static async updateUser(userId, full_name, age) {
    const query = "UPDATE users SET full_name = ?, age = ? WHERE user_id = ?";
    const [result] = await pool.query(query, [full_name, age, userId]);
    return result;
  }
  static async updatePro (user_id, updates){
    const allowedFields = ['full_name', 'age'];
    const fields = [];
    const values = [];

    for (const key in updates){
      if(allowedFields.includes(key)){
        fields.push(`${key} = ?`);
        values.push(updates[key])
      }
    }
    if(fields.length === 0){
      throw new Error ('No valid fields to update');
    }
    const query = `UPDATE users SET ${fields.join(',')} WHERE user_id = ?`;
    values.push(user_id);
    const [result] = await pool.query(query, values);
    return result
  }
  static async deleteUser(userId) {
    const query = "DELETE FROM users WHERE user_id = ?";
    const [result] = await pool.query(query, [userId]);
    return result;
  }
}

export default UserModel;
