'use client'
import FadeLoader from "react-spinners/FadeLoader";
const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <FadeLoader
                color="#FFFFFF"
            />
        </div>
    );
};

export default Loading;