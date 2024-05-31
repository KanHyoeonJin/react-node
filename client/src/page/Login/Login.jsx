import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8800/api';
axios.defaults.withCredentials = true;

const Login = () => {
    const [formData, setFormData] = useState({
        ID: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        console.log("context에서 건네준 유저 정보:", user);
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.ID || !formData.password) {
            setError('ID와 비밀번호를 입력해야 합니다.');
            return;
        }

        dispatch({ type: "LOGIN_START" });

        try {
            const response = await axios.post('/auth/login', formData);
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
            setError('');
            navigate('/');  // 로그인 성공 시 홈 페이지로 이동
        } catch (err) {
            const errorMessage = err.response?.data?.message || '로그인에 실패했습니다.';
            dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
            setError(errorMessage);
        }
    };

    return (
        <div>
             <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <h2>로그인</h2> 
            <div>
                <button type='button' className='button' onClick={()=>{navigate('/')}}>홈</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID</label>
                    <input 
                        type="text" 
                        name="ID" 
                        value={formData.ID} 
                        onChange={handleChange} 
                        autoComplete="username" 
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        autoComplete="current-password" 
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
