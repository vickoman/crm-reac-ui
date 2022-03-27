import React from 'react';

const Client = ({client}) => {
    const { name, company, email, id} = client;

    const deleteClient = (id) => {
        console.log(id);
    };
    
    return (
        <tr key={id}>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{company}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center bg-red-800 py-2 px-4 rounded text-white text-sm hover:bg-gray-800 w-full"
                    onClick={() => deleteClient(id)}
                >
                    Delete 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default Client;
