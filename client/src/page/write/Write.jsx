import Navi from "../../component/navi/Navi";
import "./write.css";
import { useState,useEffect, useContext ,useRef} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write=()=>{
    const navigator=useNavigate();
    const alertHelp=useRef(false);
    const {user}=useContext(AuthContext);
    const [post, setPost]=useState({
        title:'',
        content:''
    })
    useEffect(()=>{
        if(!user && !alertHelp.current){
            alert("로그인해주세요");
            alertHelp.current=true;
            navigator('/login');
        }
    },[user,navigator]);
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    const onClickToHome=()=>{
        navigator('/')
    }
    const handleCancel=()=>{
        navigator(-1);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('/posts',{
                ...post,
                userId:user.id
            },{
                withCredent:true
            });
            navigator('/')
        }catch(e){
            console.error(e);
        }
    };
    return(
        <div>
             <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <div>
                <button onClick={onClickToHome} className="button">홈</button>
            </div>
            <div className="main">
               <h1>글쓰기</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>제목 <input type="text" name="title" value={post.title} 
                    onChange={handleChange} required /></label>
                    <label>작성자 {user.ID}</label><p/>
                    <label>
                        내용
                        <textarea name="content" value={post.content} 
                        onChange={handleChange} required/>
                    </label><p/>
                    <button type="submit" className="button">작성</button>
                    <button type="button" className="button" onClick={handleCancel}>취소</button>
                </form>
            </div>
        </div>
    )
}

export default Write;