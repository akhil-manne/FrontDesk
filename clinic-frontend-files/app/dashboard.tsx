// src/app/dashboard.tsx (example)
import PrivateRoute from '../src/components/PrivateRoute';

const Dashboard = () => {
    return (
        <PrivateRoute>
            <h1>Welcome to the Dashboard!</h1>
            {/* Your dashboard content here */}
        </PrivateRoute>
    );
};

export default Dashboard;
