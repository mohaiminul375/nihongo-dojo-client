'use client';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useAuth } from './UserContext';
import Loading from '@/app/loading';

interface User {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    img?: string;
}

interface WithAdminAuthProps {
    user?: User;
}

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P & WithAdminAuthProps>) => {
    return (props: P) => {
        const { user, loading } = useAuth();
        const router = useRouter();
        useEffect(() => {
            if (!loading && !user) {
                router.replace('/lessons');
            }
        }, [user, loading, router]);

        if (loading || !user || user.role !== 'Admin') {
            return <div><Loading /></div>;
        }

        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAdminAuth;
