import { AuthContext } from "../../context/AuthContext"
import React,{useState,useEffect, useContext} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";
import ProfileImageUpload from "./ImageUpload";
import ProfileUpdate from "./ProfileUpdate";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8800/api';
axios.defaults.withCredentials = true;

const Mypage=()=>{

    return(
        <div>
            <h1>마이페이지</h1>
            <ProfileImageUpload/>
            <ProfileUpdate/>
        </div>
    )
}





export default Mypage;