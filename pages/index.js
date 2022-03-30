import Layout from '../components/Layout';
import Client from '../components/Client';
import {gql, useQuery} from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';

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
const Home = () => {
  const router = useRouter();
  let noToken = null;
  
  const { data, loading, error } = useQuery(QUERY_GET_CLIENTS);
  if(loading) return 'Loading....';

  const noAuth = () => {
    router.push("/login");
  };
  return (
    <>
      {localStorage.getItem('token') ? (
        <Layout>
          <h1 className="text-2xl text-gray-800">Clients</h1>
           <Link href="clients/add">
             <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase">New Client</a>
          </Link>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Company</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              { data && data.getClientsBySeller.length > 0 && data.getClientsBySeller.map(client => (
                <Client
                  key={client.id}
                  id={client.id}
                  client={client}
                 />
              ))}
            </tbody>
          </table>
        </Layout>
      ) : (
        noAuth()
      )}
    </>
  )
}

export default Home;
