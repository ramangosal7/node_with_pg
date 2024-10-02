import pool from "../../config/conn/db";

export interface IUserModel {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (params: IUserModel) => {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [params.first_name, params.last_name, params.username, params.email, params.password]
  );
  // returning first record => Should be always unique one
  return result.rows[0];
};

export const findUserByUsernameOrEmail = async (username: string, email: string) => {
  let query: string;

  if (username) {
    query = "SELECT * FROM users WHERE username = $1";
  } else {
    query = "SELECT * FROM users WHERE email = $1";
  }
  const result = await pool.query(query, [username || email]);
  // returning first record => Should be always unique one
  return result.rows[0];
};