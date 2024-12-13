import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from './UserContext';


const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    router.push('/login');
                }
            }
        }, [user, loading, router]);


        if (loading || !user) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAuth;
