import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const MUTATION_LOGIN = gql`
    mutation ($input: AuthInput!){
        auth(input: $input){
            token
        }
    }
`;

const Login  = () => {

    const router = useRouter();

    const [message, saveMessage] = useState(null);

    const [auth] = useMutation(MUTATION_LOGIN);

    // Formik config
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email Required'),
            password: Yup.string().required('Password Required')
        }),
        onSubmit: async values => {
            try {
                const { data } = await auth({
                    variables: {
                        input: {
                            email: values.email,
                            password: values.password
                        }
                    }
                });
                saveMessage(`You will be redirected...`);
                setTimeout(() => {
                    localStorage.setItem('token', data.auth.token);
                    router.push('/');
                }, 3000);
            }catch(error){
                saveMessage(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    saveMessage(null);
                }, 3000);
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
                <h1 className="text-center text-2xl text-white font-light">Login</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    />
                            </div>
                            { formik.touched.email &&  formik.errors.email ? (
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    />
                            </div>
                            { formik.touched.password &&  formik.errors.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null }
                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="Login"
                            />

                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export default Login;
