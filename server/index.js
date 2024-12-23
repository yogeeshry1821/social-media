import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import { users, posts } from "./data/index.js"

// Configs

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors({
    origin: ['http://localhost:3000', 'https://social-media-frontend-theta.vercel.app/'], // Replace with your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) //store assets locally

// file storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

//Routes with file upload

app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)
// Routes

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// Mongoose Setup
app.get('/db-check', async (req, res) => {
    try {
        await db.mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        res.status(200).send('Database connected successfully');
    } catch (error) {
        res.status(500).send('Database connection failed');
    }
});
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`listening :${PORT} `))
    // User.insertMany(users);
    // Post.insertMany(posts);  

}).catch((e) => console.log(`${e}did not connect`))