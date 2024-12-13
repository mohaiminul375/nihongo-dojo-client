import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from './UserContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/login');
            }
        },
            [loading, user]);

        if (loading) {
            return <div>Loading...</div>; // Display loading state
        }

        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAuth;
