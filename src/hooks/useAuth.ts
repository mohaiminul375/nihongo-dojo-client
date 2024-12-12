// get user info from session storage
export const useAuth = () => {
    const user = sessionStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;  // Parse the JSON string back to an object
}