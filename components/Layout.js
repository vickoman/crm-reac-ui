import React from 'react';
import Head from 'next/head';

import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>CRM - Admin clients</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <div className="bg-gray-200 min-h-screen">
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;
