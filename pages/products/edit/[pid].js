import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql} from '@apollo/client';
import { Formik } from 'formik';
import Layout from '../../../components/Layout';
import * as Yup from 'yup';

const QUERY_GET_PRODUCT_BY_ID =  gql`
    query($id: ID!){
        getProduct(id: $id){
            name
            stock
            price
        }
    }
`;

const MUTATION_UPDATE_PRODUCT= gql`
    mutation($id: ID!, $input: ProductInput!){
        updateProduct(id: $id, input: $input){
            id
            name
            stock
            price
            created_at
        }
        }
`;

const EditProduct = () => {
    // State form message
    const [message, saveMessage] = useState(null);
    // Get ID 
    const router = useRouter();
    const { pid } = router.query;

    // Query
    const { data, loading, error } = useQuery(QUERY_GET_PRODUCT_BY_ID,{
        variables:{
            id: pid
        }
    });

    // Mutation
    const [updateProduct] = useMutation(MUTATION_UPDATE_PRODUCT);

    const schemaValidation = Yup.object({
        name: Yup.string().required('Name Required'),
        stock: Yup.number().required('Stock Required'),
        price: Yup.number().required('Price Required')
    });

    if(loading || data === undefined) return 'Loading...';

    const { getProduct } = data;


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
                        initialValues={getProduct}
                        onSubmit={async (values) => {
                            const { name, stock, price } = values;
                            try {
                                await updateProduct({
                                    variables: {
                                        id: pid,
                                        input: {
                                            name,
                                            stock: parseInt(stock),
                                            price: parseFloat(price)
                                        }
                                    }
                                });
                                saveMessage(`Product ${pid} updated successfully`);
                                setTimeout(() => {
                                    saveMessage(null);
                                    router.push('/products');
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                            Stock:
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            id="stock"
                                            type="stock"
                                            placeholder="stock"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.stock}
                                            />
                                    </div>
                                    { props.touched.stock &&  props.errors.stock ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error!</p>
                                            <p>{props.errors.stock}</p>
                                        </div>
                                    ) : null }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Price:
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            id="price"
                                            type="price"
                                            placeholder="price"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.price}
                                            />
                                    </div>
                                    { props.touched.price &&  props.errors.price ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error!</p>
                                            <p>{props.errors.price}</p>
                                        </div>
                                    ) : null }

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                        value="Update Product"
                                    />
                                </form>
                            )}}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}
export default EditProduct;
