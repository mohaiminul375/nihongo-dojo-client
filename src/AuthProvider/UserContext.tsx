import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    img?: string;
}

interface UserContextType {
    user?: User | null;
    loading?: boolean;
    error?: string | null;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);

                
            } catch (err) {
                setError('Error fetching user data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]); // Make sure to add router to dependency array
    const logOut = () => {
        localStorage.removeItem('token');
        setUser(null)
    }
    return (
        <UserContext.Provider value={{ user, loading, error, logOut }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the context
export const useUser = () => useContext(UserContext);
