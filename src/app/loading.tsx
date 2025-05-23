'use client'
import FadeLoader from "react-spinners/FadeLoader";
const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <FadeLoader
                color="#354895"
            />
        </div>
    );
};

export default Loading;