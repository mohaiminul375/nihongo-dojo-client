import Lesson from '@/components/Admin-Dashboard/Overview/Lessoon/Lesson';
import Overview from '@/components/Admin-Dashboard/Overview/Overview';
import Users from '@/components/Admin-Dashboard/Overview/User/Users';
import Tutorials from '@/components/Tutorials/Tutorials';
import React from 'react';

const Dashboard = () => {
    return (
        <section>
            <div className=''>
                <h2 className='text-center text-2xl font-bold text-white'>Welcome To Admin Dashboard</h2>
            </div>
            {/* admin layout */}
            <section className='bg-primary md:max-w-7xl mx-auto rounded-md p-10 space-y-10'>
                {/* overview */}
                <div>
                    <Overview />
                </div>
                {/* Tutorials Management */}
                <div>
                    <Tutorials />
                </div>
                {/* lesson */}
                <div>
                    <Lesson />
                </div>
                {/* user */}
                <div>
                    <Users />
                </div>
            </section>
        </section>
    );
};

export default Dashboard;