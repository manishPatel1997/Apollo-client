// import { useQuery, gql } from "@apollo/client";
// import { memo } from "react"

// let GET_LOCATIONS = gql`
// query getLocations {
//     locations {
//         id
//         name
//         description
//         photo
//     }
// }
// `;



// function Fly() {
//     const { loading, error, data } = useQuery(GET_LOCATIONS);

//     if (loading) return <div style={{ width: "100%", height: "100vh" }} className="d-flex justify-content-center align-items-center">
//         <div>
//             <div class="spinner-border" role="status">
//             </div>
//         </div>
//     </div>
//     return (
//         <div className="container w-100 h-100 bg-body-secondary mt-5">
//             {data.locations.map(({ id, name, description, photo }) =>
//                 <div key={id}>
//                     <h3>{name}</h3>
//                     <img width="400" height="250" alt="location-reference" src={`${photo}`} />
//                     <br />
//                     <b>About this location:</b>
//                     <p>{description}</p>
//                     <br />
//                 </div>)}
//         </div>
//     )
// }

// export default memo(Fly)

// ?-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { NetworkStatus, gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const GET_DOG_PHOTO = gql`
  query Country($code:ID!){
    country(code:$code){
        currencies
        capital
    }
  }
`;
export default function Fly() {
    const [countryName, setCountryName] = useState({ current: "IN", new: "IN" });

    const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOG_PHOTO,
        {
            variables: { code: countryName?.current },
            pollInterval: 0,   //Polling call interval time api
            notifyOnNetworkStatusChange: true,
        });

    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

    if (loading) return <div style={{ width: "100%", height: "100vh" }} className="d-flex justify-content-center align-items-center">
        <div>
            <div class="spinner-border" role="status">
            </div>
        </div>
    </div>

    return (
        <div style={{ height: "100vh", width: "100%" }} className='container text-center bg-body-secondary shadow'>
            <header>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/poolingNoLoader">PoolingNoLoader</Link></li>
                <li><Link to="/refreshLoader">RefreshLoader</Link></li>
                <li><Link to="/useLazyQueryCop">useLazyQuery</Link></li>
            </header>
            <div className='pt-5'>
                <div className=''>
                    <h1 className='text-bg-danger'>Main Data</h1>
                    <p>{data?.country?.capital}</p>
                    <p>{data?.country?.currencies[0]}</p>
                </div>
                <hr />
                <div className='pt-3'>
                    <input type="text" value={countryName?.new} autoFocus className='ps-2' onChange={(e) => setCountryName({ ...countryName, new: e.target.value })} />
                    <div className='btn btn-dark' onClick={() => setCountryName({ ...countryName, current: (countryName?.new).toUpperCase() })}>Search</div>
                </div>
                <div>
                    <div className='mt-3'>
                        <h3>refresh data with same && new query</h3>
                        <button className='ms-1 btn btn-light' onClick={() => refetch()}>Refetch same query</button>
                        <button className='ms-1 btn btn-light' onClick={() => refetch({ code: "US" })}>Refetch new query</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
