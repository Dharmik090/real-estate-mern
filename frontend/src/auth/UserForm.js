import { Link, useLocation, useNavigate } from "react-router-dom";
import "../static/UserForm.css";

export default function UserForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div className="user-form-container">
            <div className="form-card">
                <button
                    onClick={() => navigate('/')}
                    className="back-btn"
                >
                    ← Back to Home
                </button>

                {/* Form Toggle Buttons */}
                <div className="form-toggle">
                    <Link
                        to="/login"
                        className={`toggle-btn ${isLoginPage ? "active" : ""}`}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className={`toggle-btn ${!isLoginPage ? "active" : ""}`}
                    >
                        Register
                    </Link>
                </div>

                {/* <h3 className="form-title">{isLoginPage ? "Login" : "Register"}</h3> */}

                <form onSubmit={props.handleSubmit}>
                    {props.inputFields}

                    <div className="form-submit">
                        <button
                            type='submit'
                            className="submit-btn"
                            disabled={props.isProcessing}
                        >
                            {props.isProcessing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Processing
                                </>
                            ) : (isLoginPage ? "Login" : "Register")}
                        </button>
                    </div>

                    {/* <div className="form-footer">
                        {isLoginPage ? (
                            <span>
                                Don't have an account?{' '}
                                <Link to="/register" className="form-link">Register here</Link>
                            </span>
                        ) : (
                            <span>
                                Already have an account?{' '}
                                <Link to="/login" className="form-link">Login here</Link>
                            </span>
                        )}
                    </div> */}
                </form>
            </div>
        </div>
    );
}

