
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login if not authenticated
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;