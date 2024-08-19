import { Navigate } from 'react-router-dom';

function NoPage() {
    return <Navigate to="/">Page not found</Navigate>
}

export default NoPage;