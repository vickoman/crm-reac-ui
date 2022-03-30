import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useFormik} from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const MUTATION_ADD_PRODUCT = gql`
    mutation($input: ProductInput!){
        createProduct(input: $input){
            id
            name
            stock
            price
            created_at
        }
    }
`;

const QUERY_GET_PRODUCTS = gql`
    query{
        getAllProducts{
            id
            name
            stock
            price
            created_at
        }
    }
`;

const Add = () => {
    const router = useRouter();
    const [message, saveMessage] = useState(null);
    const [ createProduct ] = useMutation(MUTATION_ADD_PRODUCT, {
        update(cache, { data: { createProduct } }) {
            const { getAllProducts } = cache.readQuery({ query: QUERY_GET_PRODUCTS });
            cache.writeQuery({
                query: QUERY_GET_PRODUCTS,
                data: { getAllProducts: [...getAllProducts, createProduct] }
            });
        }
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            stock: '',
            price: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Required'),
            stock: Yup.number().required('Stock Required'),
            price: Yup.number().required('Price Required')
        }),
        onSubmit: async values => {
            const { name, stock, price } = values;
            try {
                const { data } = await createProduct({
                    variables: {
                        input: {
                            name,
                            stock: parseInt(stock),
                            price: parseFloat(price)
                        }
                    }
                });
                saveMessage(`Product ${data.createProduct.name} created successfully`);
                setTimeout(() => {
                    saveMessage(null);
                    router.push('/products');
                }, 3000);
            }catch (err) {
                console.log(err);
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
            <h1 className="text-2xl text-gray-800">Add new Product</h1>

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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                Stock:
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="stock"
                                type="stock"
                                placeholder="stock"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock}
                                />
                        </div>
                        { formik.touched.stock &&  formik.errors.stock ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.stock}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price :
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="price"
                                type="price"
                                placeholder="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                />
                        </div>
                        { formik.touched.price &&  formik.errors.price ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error!</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        ) : null }


                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Save Product"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Add;
