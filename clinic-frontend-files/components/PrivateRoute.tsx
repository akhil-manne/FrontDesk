// src/components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if not authenticated
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    return isAuthenticated ? <>{children}</> : null; // Render child if authenticated
};

export default PrivateRoute;
