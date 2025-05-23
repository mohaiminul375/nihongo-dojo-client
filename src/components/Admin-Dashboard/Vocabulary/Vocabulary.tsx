import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import vocIcon from '../../../../public/japanise-vocabulary.svg'
const Vocabulary = () => {
    return (
        <div className="text-white">
            <h2 className="text-2xl underline font-bold text-foreground">Vocabulary Management</h2>
            <div className="grid lg:grid-cols-5 gap-6 mt-3">

                <Link href="/admin-dashboard/all-vocabularies">
                    <div className="group bg-foreground border border-white rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src={vocIcon}
                            alt='vocIcon'
                            width={50}
                            height={50}
                        />
                        <h2 className="text-lg font-semibold text-accent text-center ">
                            All Vocabularies
                        </h2>
                    </div>
                </Link>
                <Link href="/admin-dashboard/create-vocabularies">
                    <div className="group bg-foreground border border-white rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <Image
                            src={vocIcon}
                            alt='vocIcon'
                            width={50}
                            height={50}
                        />
                        <h2 className="text-lg font-semibold text-accent text-center ">
                            Create Vocabularies
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Vocabulary;