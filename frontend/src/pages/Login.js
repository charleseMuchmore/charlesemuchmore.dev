import LoginForm from '../components/LoginForm.js';
import ProtectedRoute from '../components/ProtectedRoute.js';

function Login() {
    return (
        <div>
            <LoginForm />
            <ProtectedRoute />
        </div>
    )
}

export default Login;