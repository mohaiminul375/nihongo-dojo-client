'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from './UserContext';

const withAdminAuth = (WrappedComponent) => {
    return (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    // If the user is not logged in, redirect to login
                    router.push('/login');
                } else if (user.role !== 'Admin') {
                    // If the user is logged in but not an admin, redirect to lessons page
                    router.push('/lessons');
                }
            }
        }, [user, loading, router]);

        if (loading || !user || user.role !== 'Admin') {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAdminAuth;
