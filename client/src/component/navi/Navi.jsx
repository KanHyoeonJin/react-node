import './Navi.css'
import { useNavigate } from 'react-router-dom';
import React,{useState ,useEffect, useContext} from 'react';
import axios from "axios"
import { AuthContext } from '../../context/AuthContext.js';
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8800/api';
axios.defaults.withCredentials = true;
const Navi=()=>{
    const navigator=useNavigate();
    const {user, dispatch}=useContext(AuthContext);
    const onClickToHome=()=>{
        navigator('/');
    }
    const handleLogout= async()=>{
        try{
            await axios.post('/auth/logout')
            dispatch({type:"LOGOUT"})
            navigator('/')
        }catch(e){
            console.log("로그아웃에러:",e)
        }
    }
    return(
        <div className='navi-bar'>
             <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              {user ?(
                <div className='navi-button'>
                    <button className='button'onClick={()=>{navigator('/mypage')}}>마이페이지</button>
                    <button className='button' onClick={handleLogout}>로그아웃</button>
                </div>
              ):(
                <div className='navi-button'>
                <button className='button' onClick={()=>{navigator('/login')}}>로그인</button>
            
                <button className='button' onClick={()=>{navigator('/register')}}>회원가입</button>
            
                <button className='button' onClick={onClickToHome}>홈</button>
                </div>
              )}  
           
            <div className='naviBarContainer'>
                <p>블로그이름</p>
            </div>
        </div>
    );
}
export default Navi;