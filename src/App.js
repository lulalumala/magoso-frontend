import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNews from './pages/AddNews';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Post from './pages/Post';
import StateArea from './context/state';
import EditPost from './pages/Edit';

function App() {
  return (
    <StateArea>
      
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/signup" element={<SignUp />} ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/add_news" element={<AddNews />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/post/edit/:id" element={<EditPost />}></Route>

        </Routes>
      </Router>
    </StateArea>

  );
}

export default App;
