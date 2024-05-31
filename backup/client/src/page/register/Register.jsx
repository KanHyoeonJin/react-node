import React,{useState,useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {faEye, faEyem, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
axios.defaults.withCredentials = true;

const Register=()=>{
    const [userData,setUserData]=useState({
        username:'',
        ID:'',
        password:'',
        email:'',
        profileImage:''
    })
    const [showPassword,setShowPassword]=useState(false);
    const toggle=()=>{
        setShowPassword(!showPassword)
    }
    const navigator=useNavigate();

    const handleChange=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    }
    const [err,setErr]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('/auth/register',userData);
            navigator('/login');
        }catch(e){
            setErr(e.response.data.message)
        }
    }
    const goHome=()=>{
        navigator('/')
    }
    return(
        <div>
             <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <div className="home">
                <button className="button" onClick={goHome}>홈</button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <p />이름 <input type="text" className="form-input" name="username" onChange={handleChange} placeholder="이름" value={userData.username}/>
                    <p />이메일 <input type="email" className="form-input" name="email" onChange={handleChange} placeholder="이메일" value={userData.email} />
                    <p />아이디 <input type="text" name="ID" className="form-input" onChange={handleChange} placeholder="아이디" value={userData.ID}/>
                    <p />패스워드<input type={showPassword ? "text" : "password"} 
                    name="password" className="form-input" onChange={handleChange} 
                    placeholder="패스워드" value={userData.password} /><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toggle}/><p/>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    )
}
export default Register