import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth} from './UserContext';
import Loading from '@/app/loading';



interface AuthProps {
    user?: any;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & AuthProps>) => {
    const ProtectedComponent = (props: P) => {
        const { user, loading } = useAuth();
        const router = useRouter();
        console.log(user, 'user in pro')
        useEffect(() => {
            if (loading) {
                return;
            }
            if (!user) {
                router.replace('/login');
            } else {

            }
        }, [loading, user, router])

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} user={user} />;
    };

    return ProtectedComponent;
};

export default withAuth;

