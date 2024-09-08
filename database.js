import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM userData");
  return rows;
}

export async function getUser(userID) {
  const [rows] = await pool.query("SELECT * FROM userData WHERE userID = ?", [
    userID,
  ]);
  return rows;
}
// Get the video by its ID
export async function getVideo(id) {
  const [rows] = await pool.query("SELECT * FROM videos WHERE idvideos = ?", [
    id,
  ]);
  return rows;
}
// Get All the videos that the user has
export async function getUserVideos(id) {
  const [rows] = await pool.query(`SELECT userData.*, videos.*
FROM userData
JOIN videos ON userData.userID = videos.userID
WHERE userData.userID = ?;`, [
    id,
  ]);
  return rows;
}

export async function getUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM userData WHERE email = ?", [
    email,
  ]);
  return rows;
}
export async function getVideos() {
  const [rows] = await pool.query("SELECT * FROM videos");
  return rows;
}

export async function getQuizzes() {
  const [rows] = await pool.query(`
    SELECT quizzes.*, userData.nameSurname 
    FROM quizzes 
    JOIN userData ON quizzes.userID = userData.userID
  `);
  return rows;
}

export async function getQuizzByTitle(title) {
  const [rows] = await pool.query("SELECT * FROM quizzes WHERE title = ?", [
    title,
  ]);
  return rows;
}

export async function getUserQuizzes(id) {
  const [rows] = await pool.query(`SELECT userData.*, quizzes.*
FROM userData
JOIN quizzes ON userData.userID = quizzes.userID
WHERE userData.userID = ?;`, [
    id,
  ]);
  return rows;
}

export async function getVideoByTitle(title) {
  const [rows] = await pool.query("SELECT * FROM videos WHERE title = ?", [
    title,
  ]);
  return rows;
}

export async function createUser(
  email,
  password,
  userType,
  education,
  nameSurname
) {
  const [result] = await pool.query(
    "INSERT INTO users.userData (email, password, userType, education, nameSurname) VALUES (?, ?, ?, ?, ?)",
    [email, password, userType, education, nameSurname]
  );

  const id = result.insertId;
  return getUser(id);
}

export async function uploadVideo(userID, videoPath, videoTitle) {
  try {
    const [result] = await pool.query(
      "INSERT INTO videos (userID, videoPath, title) VALUES (?, ?, ?)",
      [userID, videoPath, videoTitle]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error inserting video into database:', error);
    throw error;
  }
}


export async function getMyLectures() {
  const [rows] = await pool.query("SELECT * FROM myLectures");
  return rows;
}

export async function getFavProfessors() {
  const [rows] = await pool.query("SELECT * FROM favProfessors");
  return rows;
}
