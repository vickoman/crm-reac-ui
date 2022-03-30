import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';


const EditClient = () => {
    // State form message
    const [message, saveMessage] = useState(null);
    // Get ID 
    const router = useRouter();
    const { pid } = router.query;

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }
    
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800">Edit Client</h1>
            { message && showMessage()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"

                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="name"
                                type="name"
                                placeholder="Name"
                                />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                LastName:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="lastName"
                                type="lastName"
                                placeholder="lastName"
                                />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                Company:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="company"
                                type="company"
                                placeholder="company"
                                />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email"
                                type="email"
                                placeholder="email"
                                />
                        </div>
                        

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                                Telephone (Optional):
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="telephone"
                                type="telephone"
                                placeholder="telephone"
                                />
                        </div>
                    
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Update client"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
}
export default EditClient;
