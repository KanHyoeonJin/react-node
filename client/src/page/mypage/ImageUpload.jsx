import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ProfileImageUpload = () => {
    const { user,dispatch } = useContext(AuthContext);
    const [imageFile, setImageFile] = useState(null);
    const [profileImageUrl,setProfileImageUrl]=useState('');

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
    };
    useEffect(()=>{
        if(user && user.profileImage){
            setProfileImageUrl(`http://localhost:8800${user.profileImage}`)
        }
    },[user])

    const handleUpload = async () => {
        if(!user || !user._id){
            console.error("유저없음");
            return;
        }
        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios.put(`/mypage/${user._id}/profileImage`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const updateUser={...user, profileImage:response.data.user.profileImage}
            dispatch({type: "LOGIN_SUCCESS",payload:updateUser});
            alert("프로필 이미지가 업데이트되었습니다.");
            setProfileImageUrl(`${axios.defaults.baseURL}${response.data.user.profileImage}`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <h2>프로필 이미지 업로드</h2>
            <img
                        src={user.profileImage ? `http://localhost:8800/${user.profileImage}
                        ` : "default-image-url"}
                        alt="Profile"
                        className="img"
                    />
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleUpload}>업로드</button>
        </div>
    );
};

export default ProfileImageUpload;