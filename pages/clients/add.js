import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useFormik} from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const MUTATION_ADD_CLIENT = gql`
    mutation ($input: ClientsInput!) {
        createClient(input: $input){
            id
            name
            lastName
            company
            email
            telephone
            seller
            created_at
        }
    }
`;

const QUERY_GET_CLIENTS = gql`
  query getClientsBySeller {
    getClientsBySeller{
      id
      name
      lastName
      company
      email
      telephone
      seller
      created_at
    }
  }
`;

const Add = () => {
    const router = useRouter();
    const [message, saveMessage] = useState(null);
    const [ createClient ] = useMutation(MUTATION_ADD_CLIENT, {
        update(cache, { data: { createClient } }) {
            const { getClientsBySeller } = cache.readQuery({ query: QUERY_GET_CLIENTS });
            cache.writeQuery({
                query: QUERY_GET_CLIENTS,
                data: { getClientsBySeller: [...getClientsBySeller, createClient] }
            });
        }
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            telephone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Required'),
            lastName: Yup.string().required('Last Name Required'),
            company: Yup.string().required('Company Required'),
            email: Yup.string().email('Invalid email').required('Email Required'),
        }),
        onSubmit: async values => {
            try {
                const { data } = await createClient({
                    variables: {
                        input: values
                    }
                });
                saveMessage(`Client ${data.createClient.name} created successfully`);
                setTimeout(() => {
                    saveMessage(null);
                    router.push('/');
                }, 3000);
            }catch (err) {
                saveMessage(err.message.replace('GraphQL error: ', ''));
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
        <Layout>
            <h1 className="text-2xl text-gray-800">Add new client</h1>

            { message && showMessage()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="name"
                                type="name"
                                placeholder="Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
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
                                LastName:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="lastName"
                                type="lastName"
                                placeholder="lastName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                />
                        </div>
                        { formik.touched.lastName &&  formik.errors.lastName ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.lastName}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                Company:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="company"
                                type="company"
                                placeholder="company"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.company}
                                />
                        </div>
                        { formik.touched.company &&  formik.errors.company ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.company}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="email"
                                type="email"
                                placeholder="email"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                                Telephone (Optional):
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="telephone"
                                type="telephone"
                                placeholder="telephone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telephone}
                                />
                        </div>
                        { formik.touched.telephone &&  formik.errors.telephone ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.telephone}</p>
                            </div>
                        ) : null }

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Save client"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Add;
