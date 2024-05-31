import Navi from "../../component/navi/Navi";
import './home.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigator=useNavigate();
    const goWrite=()=>{
        navigator('/posts')
    }
    return(
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <Navi/>
            <div className="main">
                <button className="button" onClick={goWrite}>글쓰기</button>
                <button className="button">글목록</button>

            </div>
        </div>
    )
};
export default Home;