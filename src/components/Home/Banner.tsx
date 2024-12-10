'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import bannerAnimation from '../../../public/banner.json';
import { Button } from '../ui/button';

const Banner = () => {
    return (
        <section className="grid md:grid-cols-2 items-center p-8 bg-gradient-to-r from-[#5754F7] via-[#8F84F9] to-[#5754F7] text-white">
            {/* Left Section - Text Content */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold mb-4 text-black drop-shadow-lg">Learn Japanese with Ease</h1>
                <p className="text-lg text-black mb-6 drop-shadow-md">
                    Master the Japanese language through interactive lessons and cultural insights.
                    Whether you're a beginner or looking to improve, we have something for everyone!
                </p>

                <Button variant="destructive" className="">
                    Start Learning Now
                </Button>
            </div>

            {/* Right Section - Lottie Animation */}
            <div className="flex justify-center md:justify-end">
                <Player
                    autoplay={true}
                    loop={true}
                    src={bannerAnimation}
                    style={{ height: 'auto', maxWidth: '100%' }}
                    className="w-2/3 md:w-1/2"
                />
            </div>
        </section>
    );
};

export default Banner;
