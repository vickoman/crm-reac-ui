import React from 'react';
import Swal from 'sweetalert2'
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

// const MUTATION_DELETE_CLIENT = gql`
//     mutation($id: ID!) {
//         deleteClient(id: $id){
//             wasDeleted
//             message
//         }
//     }
// `;

// const QUERY_GET_CLIENTS = gql`
//   query getClientsBySeller {
//     getClientsBySeller{
//       id
//       name
//       lastName
//       company
//       email
//       telephone
//       seller
//       created_at
//     }
//   }
// `;

const Product = ({product}) => {
    const { name, stock, price, id} = product;

    // const [deleteClient] = useMutation(MUTATION_DELETE_CLIENT, {
    //     update(cache) {
    //         const { getClientsBySeller } = cache.readQuery({ query: QUERY_GET_CLIENTS });
    //         cache.writeQuery({
    //             query: QUERY_GET_CLIENTS,
    //             data: { getClientsBySeller: getClientsBySeller.filter(client => client.id !== id) }
    //         });
    //     }
    // });

    // const confirmDeleteClient = ({id, company}) => {
    //     Swal.fire({
    //         title: `Are you sure that you want delete ${company}?`,
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then(async (result) => {
    //         if (result.isConfirmed) {
    //           try {
    //             const { data } = await deleteClient({
    //                 variables: {
    //                     id
    //                 }
    //             });
    //             Swal.fire(
    //                 `${company} Deleted!`,
    //                 data.deleteClient.message,
    //                 'success'
    //             )
    //           } catch (e) {
    //                 console.log(e);
    //           }
    //         }
    //       })
    // }

    // const editClient = (id) => {
    //     Router.push({
    //         pathname: '/clients/edit/[id]',
    //         query: {
    //             id
    //         }
    //     });
    // };

    return (
        <tr key={id}>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{stock}</td>
            <td className="border px-4 py-2">${price}</td>
            <td className="border px-4 py-2">
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="flex justify-center bg-red-800 py-2 px-4 rounded text-white text-sm hover:bg-red-900 w-1/5"
                        onClick={() => console.log('Should delete product')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="flex justify-center bg-green-600 py-2 px-4 rounded text-white text-sm hover:bg-green-800 w-1/5 ml-3"
                        onClick={() => console.log("should edit product")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Product;
