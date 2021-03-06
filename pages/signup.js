import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation, gql } from '@apollo/client';

const MUTATION_CREATE_USER = gql`
    mutation($input: UserInput!){
        createUser(input: $input){
            id
            name
            lastName
            email
            created_at
        }
    }
`;

const Signup = () => {
    // State for message
    const [ message, saveMessage] = useState(null);
    // Create ew user
    const [ createUser ] = useMutation(MUTATION_CREATE_USER);

    const router = useRouter();

    // Validate form
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Required'),
            lastName: Yup.string().required('Last Name Required'),
            email: Yup.string().email('Invalid email').required('Email Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password Required')
        }),
        onSubmit: async values => {
            const {
                name,
                lastName,
                email,
                password
            } = values;
            try {
                const data = await createUser({
                        variables: {
                            input: {
                                name,
                                lastName,
                                email,
                                password
                            }
                        }
                    });
                saveMessage(`User ${data.data.createUser.name} created successfully`);
                setTimeout(() => {
                    saveMessage(null);
                    router.push('/login');
                }, 3000);
            }catch(error) {
                saveMessage(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    saveMessage(null);
                }, 3000)
            }
        }
    });

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }

    return (
        <>
        <Layout>
            { message && showMessage()}
            <h1 className="text-center text-2xl text-white font-light">Signup</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="name"
                                type="name"
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                        </div>
                        { formik.touched.name &&  formik.errors.name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null }
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="lastName"
                                type="lastName"
                                placeholder="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                        </div>
                        { formik.touched.lastName && formik.errors.lastName? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.lastName}</p>
                            </div>
                        ) : null }
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                        </div>
                        { formik.touched.email && formik.errors.email? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null }
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password"
                                type="password"
                                placeholder="User password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                        </div>
                        { formik.touched.password && formik.errors.password? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null }
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="CREATE ACCOUNT"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    </>
    )
};

export default Signup;
