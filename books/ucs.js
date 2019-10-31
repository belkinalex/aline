const config = require('../config/default');
const mysql = require('mysql2/promise');

module.exports.addBook = async (title, date, author, description, image) => {
  const connection = await mysql.createConnection(config.db);
  const [rows, fields] = await connection.query(`INSERT INTO books (title, date, author, description, image)
    VALUES (?, ?, ?, ?, ?);`, [title, date, author, description, image]);
  return rows.insertId;
};

module.exports.getBooks = async (id, title, date, author, description, image, limit, offset) => {
  const connection = await mysql.createConnection(config.db);
  const [rows, fields] = await connection.query(`
    SELECT * FROM books
    WHERE (? IS NULL OR id = ?)
    AND (? IS NULL OR title LIKE CONCAT('%', ?, '%'))
    AND (? IS NULL OR date = ?)
    AND (? IS NULL OR author LIKE CONCAT('%', ?, '%'))
    AND (? IS NULL OR description LIKE CONCAT('%', ?, '%'))
    AND (? IS NULL OR image LIKE CONCAT('%', ?, '%'))
    LIMIT ?
    OFFSET ?;`, [id, id, title, title, date, date, author, author, description, description, image, image,
    parseInt(limit, 10), parseInt(offset, 10)]);
  return rows;
};

module.exports.editBook = async (id, title, date, author, description, image) => {
  const connection = await mysql.createConnection(config.db);
  await connection.query(`
    UPDATE books SET
    title = COALESCE(?, title),
    date = COALESCE(?, date),
    author = COALESCE(?, author),
    description = COALESCE(?, description),
    image = COALESCE(?, image)
    WHERE id = ?;
    `, [title, date, author, description, image, id]);
  const [rows, fields] = await connection.query(`
    SELECT * FROM books
    WHERE id = ?;`,[id]);
  return rows[0];
};