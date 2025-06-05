import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from './components/AuthContext'; // Import AuthProvider
import Header from "./layout/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./layout/Footer";

function LayoutWrapper() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ConditionalLayout />
      </AuthProvider>
    </Router>
  );
}

// New component to conditionally render Header/Footer
function ConditionalLayout() {
  const { isLoggedIn } = useAuth(); // Get auth state
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Header isLoggedIn={isLoggedIn} />}
      <LayoutWrapper />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;