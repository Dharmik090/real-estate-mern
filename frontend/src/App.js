import './App.css';
import FlatDetail from "./components/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import Blog from "./components/Blog"
import BlogDetail from "./components/BlogDetail"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Register from './components/Register';
import Property from './components/Property';
import PropertyForm from './components/PropertyForm';
import ImageUpload from './components/ImageUpload';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>

        <Routes>
        <Route exact path="/"  element={ <Home /> }></Route>
        <Route exact path="/contact"  element={ <Contact /> }></Route>
        <Route exact path="/about"  element={ <About/> }></Route>
        <Route exact path="/property" element={ <Property/> }></Route>
        <Route exact path="/blog/:id"  element={ <BlogDetail/> }></Route>
        <Route exact path="/flat/:slug"  element={ <FlatDetail/> }></Route>
        <Route exact path="/register" element={ <Register/> }></Route>
        <Route exact path="/addProperty/:id" element={ <PropertyForm/>}></Route>
        <Route exact path="/addImages/:id" element={ <ImageUpload/> }></Route>
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
