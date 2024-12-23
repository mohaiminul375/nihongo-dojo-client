'use client'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

interface User {
    _id?: string;
    email?: string;
    user_name?: string;
    role?: string;
    img?: string;
}

interface UserContextType {
    email?: string;
    user?: User | null;
    loading: boolean;
    error?: string | null;
    logOut?: () => void;
    setToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Main page
export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);

            if (!storedToken) {
                setLoading(false);
                return;
            }

            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });

                    if (response?.data?.user) {
                        setUser(response.data.user);
                    } else {
                        setError('User data not found');
                    }
                } catch (err) {
                    setError('Error fetching user data');
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [token]);  // Run once when component mounts

    // Logout and redirect to login page
    const logOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/login');
    };

    return (
        <UserContext.Provider value={{ user, loading, error, logOut, setToken }}>
            {loading ? <Loading /> : error ? <div>{error}</div> : children}
        </UserContext.Provider>
    );
};

// Custom hook to access the context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
