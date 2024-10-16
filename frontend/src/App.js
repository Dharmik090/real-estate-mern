import './App.css';
import FlatDetail from "./components/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import Blog from "./components/Blog"
import BlogDetail from "./components/BlogDetail"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from './components/UseLogIn';
import ServerError from './components/ServerError';
import Profile from './components/Profile';
import { useState } from 'react'
import UserRegister from './components/UserRegister';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/blog" element={<Blog />}></Route>
          <Route exact path="/blog/:id" element={<BlogDetail />}></Route>
          <Route exact path="/flat/:slug" element={<FlatDetail />}></Route>
          <Route exact path="/login" element={<UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route exact path="/register" element={<UserRegister />}></Route>
          <Route exact path="/error" element={<ServerError />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
