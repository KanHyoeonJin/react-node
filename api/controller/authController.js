import User from "../model/User.js";
import jwt from "jsonwebtoken"
import brcypt from "bcryptjs";
import { createError } from "../utile/error.js";
import path from "path";
import { fileURLToPath } from "url";


export const register=async(req,res,next)=>{
    try {
        const { username, email, ID, img, password } = req.body;
        if (!username || !email || !ID ||  !password) {
            return next(createError(400, "all field required"));
        }
        const jungbokEmail = await User.findOne({ email });

        const jungbokID = await User.findOne({ ID });

        if (jungbokEmail) {
            return next(createError(400, "이메일중복"));
        }
        if (jungbokID) {
            return next(createError(400, "ID중복"));
        }

        const salt = brcypt.genSaltSync(10);
        const hash = brcypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(200).send("User has been created.");

    } catch (err) {
        next(err);
    }

};

export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await brcypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password"))
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, username: user.username },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        }).status(200).json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    };
};

export const Logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: '/'
    })
        .status(200).json({ message: "Logged out Successfully" });
};

