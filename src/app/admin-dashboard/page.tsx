'use client'
import Lesson from '@/components/Admin-Dashboard/Lessoon/Lesson';
import Overview from '@/components/Admin-Dashboard/Overview/Overview';
import Users from '@/components/Admin-Dashboard/User/Users';
import Tutorials from '@/components/Admin-Dashboard/Tutorials/Tutorials';
import React from 'react';
import Vocabulary from '@/components/Admin-Dashboard/Vocabulary/Vocabulary';
import withAdminAuth from '@/AuthProvider/withAdminAuth';

const Dashboard = () => {
    return (
        <section>
            <title>Nihongo-Dojo | Admin Dashboard</title>

            {/* admin layout */}
            <section className=' md:max-w-7xl mx-auto rounded-md p-10 space-y-10'>
                <div className=''>
                    <h2 className='text-center text-4xl font-bold text-accent'>Welcome To Admin Dashboard</h2>
                </div>
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
                {/* Vocabulary */}
                <div>
                    <Vocabulary />
                </div>
                {/* user */}
                <div>
                    <Users />
                </div>
            </section>
        </section>
    );
};

export default withAdminAuth(Dashboard);