'use client'
import FadeLoader from "react-spinners/FadeLoader";
const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <FadeLoader
            />
        </div>
    );
};

export default Loading;