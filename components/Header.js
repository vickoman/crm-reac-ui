import React from 'react';
import { useQuery , gql} from '@apollo/client';
import { useRouter } from 'next/router';

const QUERY_GET_USER = gql`
    query{
        getUser{
            id
            name
            lastName
            email
            created_at
        }
    }
`;

const Header = () => {
    const router = useRouter();
    const { data, loading } = useQuery(QUERY_GET_USER);
    if(loading) return null;
    if(!data) {
        return router.push('/login');
    }
    const {name, lastName} = data.getUser;

    const handleLogout = () => {
        // remove token from localstorage
        localStorage.removeItem('token');
        router.push('/login');
    };
    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola,  {name} {lastName}</p>
            <button
                onClick={() => handleLogout()}
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                type="button">Logout</button>
        </div>
    );
}

export default Header;
