import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ProfileUpdate = () => {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/mypage/getprofile', {
                    withCredentials: true
                });
                if (response.data.user) {
                    setUserInfo({
                        username: response.data.user.username || '',
                        email: response.data.user.email || '',
                        password: ''
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchUserInfo();
    }, [user]);

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/mypage/${user._id}`, userInfo, {
                withCredentials: true
            });
            alert("정보가 업데이트되었습니다.");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    이름
                    <input type="text" name="username" value={userInfo.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    이메일
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    비밀번호
                    <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">정보 수정</button>
            </form>
        </div>
    );
};

export default ProfileUpdate;