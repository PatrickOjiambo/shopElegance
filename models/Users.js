import pool from './createdb.js';

const promiseConnection = pool.promise();
/**
 * Create a new user in the database.
 *
 
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password_hash - The hashed password of the user.
 * @param {string} phone_number - The user's phone number.
 * @returns {Promise} A Promise that resolves if the user is created successfully or rejects with an error.
 */
export function createUser (
  
  name,
  email,
  password_hash,

  phone_number
) {
  console.log('Happens in insert function');
  const createUserQuery =
    'INSERT INTO Users(name, email, password_hash, phone_number) VALUES(?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    promiseConnection.query(
      createUserQuery,
      [name, email, password_hash, phone_number],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}
