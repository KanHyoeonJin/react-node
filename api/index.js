import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import auth from "./router/authRoute.js";
import commentRoute from "./router/CommentRouter.js";
import writePost from "./router/writeRoute.js";
import userPage from './router/userPage.js';
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// 미드웨어
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(morgan('combined'));

// 정적 파일 제공 설정
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우트 설정
app.use('/api/posts', writePost);
app.use('/api/comments', commentRoute);
app.use('/api/auth', auth);
app.use('/api/mypage', userPage);

// MongoDB 연결
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("몽고디비 연결 성공");
    } catch (e) {
        console.error("몽고디비 연결 실패:", e);
        throw e;
    }
};

const uploadFolder = () => {
    const uploadsPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
        console.log("Uploads directory created");
    }
};

uploadFolder();

mongoose.connection.on("connected", () => {
    console.log("몽고디비 연결됨");
});
mongoose.connection.on("error", (err) => {
    console.error("몽고디비 연결 에러:", err);
});
mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결 끊김");
});

app.listen(process.env.PORT, () => {
    connect();
    console.log("백엔드와 연결");
});
