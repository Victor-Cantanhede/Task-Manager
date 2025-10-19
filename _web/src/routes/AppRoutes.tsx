import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import TaskPage from '../pages/TaskPage';



export default function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/task' element={<TaskPage />} />
            </Routes>
        </Router>
    );
}