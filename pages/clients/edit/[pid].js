import React from 'react';
import { useRouter } from 'next/router';

const EditClient = () => {
    // Get ID 
    const router = useRouter();
    const { pid } = router.query;
    
    return (
        <div>
            EditClient
        </div>
    );
}
export default EditClient;
