import express from "express";
import { getUser, getVideos, getUsers, createUser, getUserByEmail, getMyLectures, getFavProfessors, getUserVideos, getQuizzes, uploadVideo } from "./database.js";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

app.use(cors());

app.use(express.json());

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos"); // Destination folder for uploaded videos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique file names
  }
});

const upload = multer({ storage: storage });

// Route to handle video upload
app.post('/videos', upload.single('video'), async (req, res) => {
  const { userID, videoTitle } = req.body;
  const videoPath = req.file.path; // Get the uploaded video path

  try {
    // Save video info in the database
    await uploadVideo(userID, videoPath, videoTitle);
    res.json({ message: 'Video uploaded successfully', videoPath: videoPath });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video' });
  }
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/videos", async (req, res) => {
  const videos = await getVideos();
  res.send(videos)
});

app.get("/quizzes", async (req, res) => {
  const videos = await getQuizzes();
  res.send(videos)
});

app.get("/videos/:idvideos", async (req, res) => {
  const id = req.params.idvideos;
  const user = await getUserVideos(id);
  res.send(user);
});

// Get user by userID
app.get("/users/:userID", async (req, res) => {
  const id = req.params.userID;
  const user = await getUser(id);
  res.send(user);
});

app.post("/users", async (req, res) => {
  const { email, password, userType, education, nameSurname } = req.body;

  const existingUser = await getUserByEmail(email);
  if (existingUser.length > 0) {
    return res
      .status(400)
      .json({ message: "User with this email already exists." });
  }

  const user = await createUser(
    email,
    password,
    userType,
    education,
    nameSurname
  );
  res.status(201).json(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (user.length === 0) {
    return res.status(400).json({ message: "User not found." });
  }

  if (user[0].password !== password) {
    return res.status(400).json({ message: "Incorrect password." });
  }

  res.status(200).json({
    message: "Login successful.",
    nameSurname: user[0].nameSurname,
    userID: user[0].userID
  });
});

// Search user by nameSurname or email
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const users = await getUsers();
    const results = users.filter(user =>
      user.nameSurname.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
    res.json(results);

  } catch (error) {
    console.error('Error processing search request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//Search video by title / creator Name
app.get("/searchVideos", async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const videos = await getVideos();
    const results = videos.filter(video =>
      video.title.toLowerCase().includes(query) || video.nameSurname.toLowerCase().includes(query)
    );
    res.json(results);
  } catch (error) {
    console.error('Error processing search request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Search quizz by title / name
app.get("/searchQuizzes", async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const videos = await getQuizzes();
    const results = videos.filter(video =>
      video.title.toLowerCase().includes(query) || video.nameSurname.toLowerCase().includes(query)
    );
    res.json(results);
  } catch (error) {
    console.error('Error processing search request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get lectures, classes homeworks etc.
app.get("/classes", async (req, res) => {
  try {
    const lectures = await getMyLectures();
    res.json(lectures);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get favProfessors
app.get("/professors", async (req, res) => {
  try {
    const professors = await getFavProfessors();
    res.json(professors);
  } catch (error) {
    console.error('Error fetching professors: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("ERROR: Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running... \nPort: 8080");
});
