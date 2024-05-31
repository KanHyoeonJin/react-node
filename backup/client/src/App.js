import './App.css';
import {
  BrowserRouter,
  Route,
  Router,
  Routes
}from "react-router-dom"
import Home from './page/Home/Home';
import Navi from './component/navi/Navi';
import Write from './page/write/Write';
import Login from './page/Login/Login';
import Mypage from './page/mypage/Mypage';
import Register from './page/register/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<Write/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/mypage' element={<Mypage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/posts' element={<Write />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
