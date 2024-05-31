import UserModel from "../모델/UserModel.js";
import { createError } from "../utile/error.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateProfileImage = async (req, res, next) => {
    try {
        console.log('Request file:', req.file);
        if (!req.file) {
            return next(createError(400, "No file uploaded"));
        }

        const userId = req.params.id;
        if (!userId) {
            return next(createError(400, "User ID is required"));
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }

        if (user.profileImage) {
            const oldImage = path.join(__dirname, '..', user.profileImage);
            if (fs.existsSync(oldImage)) {
                try {
                    fs.unlinkSync(oldImage);
                } catch {
                    return next(createError(500, "이미지 삭제 오류"));
                }
            }
        }

        // 백슬래시(\)를 슬래시(/)로 변환하여 저장
        const imgPath = req.file.path.replace(/\\/g, "/");
        user.profileImage = `/uploads/${req.file.filename}`;
        await user.save();
        console.log('Updated user:', user);
        res.status(200).json({ message: "Profile image updated", user: { profileImage: user.profileImage } });
    } catch (e) {
        console.error('Error while updating profile image:', e);
        next(e);
    }
};
