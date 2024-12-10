'use client'
import bannerAnimation from "../../../public/banner.json"
import { Controls, Player } from "@lottiefiles/react-lottie-player";
const Banner = () => {
    return (
        <section className="grid md:grid-cols-2">
            <div>

            </div>
            {/* lotifile */}
            <div>
                <Player
                    autoplay={true}
                    loop={true}
                    src={bannerAnimation}
                    style={{ height: 'auto' }}
                    className='w-1/4'
                />
    

            </div>
        </section>
    );
};

export default Banner;