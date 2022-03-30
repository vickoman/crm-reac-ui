import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql} from '@apollo/client';
import { Formik } from 'formik';
import Layout from '../../../components/Layout';
import * as Yup from 'yup';

const QUERY_GET_CLIENT =  gql`
    query($id: ID!){
        getClientById(id: $id){
            name
            lastName
            company
            email
            telephone
        }
    }
`;

const MUTATION_UPDATE_CLIENT = gql`
    mutation($id: ID!, $input: ClientsInput!){
        updateClient(id: $id, input: $input){
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

const EditClient = () => {
    // State form message
    const [message, saveMessage] = useState(null);
    // Get ID 
    const router = useRouter();
    const { pid } = router.query;

    // Query
    const { data, loading, error } = useQuery(QUERY_GET_CLIENT,{
        variables:{
            id: pid
        }
    });

    // Mutation
    const [updateClient] = useMutation(MUTATION_UPDATE_CLIENT);

    const schemaValidation = Yup.object({
        name: Yup.string().required('Name Required'),
        lastName: Yup.string().required('Last Name Required'),
        company: Yup.string().required('Company Required'),
        email: Yup.string().email('Invalid email').required('Email Required'),
    });

    if(loading || data === undefined) return 'Loading...';

    const { getClientById } = data;


    function showMessage() {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        );
    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800">Edit Client</h1>
            { message && showMessage()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-md">
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getClientById}
                        onSubmit={async (values) => {
                            const { name, lastName, company, email, telephone } = values;
                            try {
                                await updateClient({
                                    variables: {
                                        id: pid,
                                        input: {
                                            name,
                                            lastName,
                                            company,
                                            email,
                                            telephone
                                        }
                                    }
                                });
                                saveMessage(`Client ${pid} updated successfully`);
                                setTimeout(() => {
                                    saveMessage(null);
                                    router.push('/');
                                }, 3000);

                            }catch(e) {
                                console.log(e.message);
                                saveMessage(e.message.replace('GraphQL error: ', ''));
                                setTimeout(() => {
                                    saveMessage(null);
                                }, 3000);
                            }
                        }}
                    >
                        {props => {
                            return (
                                <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name:
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            id="name"
                                            type="name"
                                            placeholder="Name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                            />
                                    </div>
                                    { props.touched.name &&  props.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error!</p>
                                            <p>{props.errors.name}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.lastName}
                                            />
                                    </div>
                                    { props.touched.lastName &&  props.errors.lastName ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error!</p>
                                            <p>{props.errors.lastName}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.company}
                                            />
                                    </div>
                                    { props.touched.company &&  props.errors.company ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error!</p>
                                            <p>{props.errors.company}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                            />
                                    </div>
                                    { props.touched.email &&  props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error!</p>
                                            <p>{props.errors.email}</p>
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
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.telephone}
                                        />
                                </div>
                                { props.touched.telephone &&  props.errors.telephone ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error!</p>
                                        <p>{props.errors.telephone}</p>
                                    </div>
                                ) : null }

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                        value="Update client"
                                    />
                                </form>
                            )}}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}
export default EditClient;
