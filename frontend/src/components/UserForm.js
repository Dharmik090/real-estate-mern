import { Link } from "react-router-dom";

export default function UserForm(props) {

    return (
        <>
            <div className="mb-5 mt-5 container-fluid d-flex justify-content-center align-items-center bg-light">
                <div className="card p-5 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                    <h3 className="text-center mb-4" style={{ fontSize: '2rem' }}>{props.title}</h3>

                    <form onSubmit={props.handleSubmit}>

                        {props.inputFields}

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary" style={{ width: '50%' }}>Submit</button>
                        </div>
                        {props.title === "Register" &&
                            <div className="mt-3 d-flex justify-content-left">
                                <Link to="/login">Login here</Link>
                            </div>
                        }
                        {props.title === "Login" &&
                            <div className="mt-3 d-flex justify-content-left">
                                <Link to="/register">Register here</Link>
                            </div>
                        }

                    </form>

                </div>
            </div>
        </>
    )
}