import './App.css';
import FlatDetail from "./components/Property/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import Blog from "./components/Property/Blog"
import BlogDetail from "./components/BlogDetail"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from './components/User/UseLogIn';
import ServerError from './components/ServerError';
import Profile from './components/User/Profile';
import Payment from './components/Payment';

import MailSender from './components/MailSender';

import { useState } from 'react'
import UserRegister from './components/User/UserRegister';

import PropertyForm from './components/Property/PropertyForm';


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
          <Route exact path="/blog/:id" element={<BlogDetail />}></Route>
          <Route exact path="/login" element={<UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route exact path="/register" element={<UserRegister />}></Route>
          <Route exact path="/error" element={<ServerError />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>

          <Route exact path="/flat/:id" element={<FlatDetail />}></Route>
          <Route exact path="/property/add" element={<PropertyForm />}></Route>
          <Route exact path="/property/edit/:id" element={<PropertyForm />}></Route>
          
          <Route exact path="/properties" element={<Blog />}></Route>
          <Route exact path="/mail/:pid" element={<MailSender />}></Route>
          <Route exact path="/payment" element={<Payment />}></Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
