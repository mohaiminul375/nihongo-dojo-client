import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
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
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the context
export const useUser = () => useContext(UserContext);
