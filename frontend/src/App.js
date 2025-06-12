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
    <AuthProvider>
      <Router>
        <ConditionalLayout />
      </Router>
    </AuthProvider >
  );
}

// New component to conditionally render Header/Footer
function ConditionalLayout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">

        {!isAuthPage && <Header />}
        <main className="flex-grow-1">
          <LayoutWrapper />
        </main>
        {!isAuthPage && <Footer />}
      </div>

    </>
  );
}

export default App;