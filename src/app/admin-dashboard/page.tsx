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
                {/* Vocabulary */}
                <div>
                    <Vocabulary />
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

export default withAdminAuth(Dashboard);