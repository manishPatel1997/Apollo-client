import { NetworkStatus, gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import PoolingNoLoader from "./PoolingNoLoader"
import { Link } from 'react-router-dom';
const GET_DOG_PHOTO = gql`
  query Country($code:ID!){
    country(code:$code){
        currencies
        capital
    }
  }
`;
export default function RefreshLoader() {
    const [countryName, setCountryName] = useState({ current: "IN", new: "IN" });

    const { loading, error, data, startPolling, stopPolling, networkStatus } = useQuery(GET_DOG_PHOTO,
        {
            variables: { code: countryName?.current },
            pollInterval: 0,   //Polling call interval time api
            notifyOnNetworkStatusChange: true,
        });

    if (networkStatus === 4) return 'Refetching!';

    if (loading) return <div style={{ width: "100%", height: "100vh" }} className="d-flex justify-content-center align-items-center">
        <div>
            <div class="spinner-border" role="status">
            </div>
        </div>
    </div>

    const handleStartPolling = () => {
        startPolling(5000); // Start polling every 1000 milliseconds (1 second)
    };

    const handleStopPolling = () => {
        stopPolling();
    };

    return (
        <div style={{ height: "100vh", width: "100%" }} className='container text-center bg-body-secondary shadow'>
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
                <div className='mt-3'>
                    <h3>pooling start <span className='text-danger'>WITH</span> re-render page</h3>
                    <p className='text-bg-dark  '>call page like setInterval functionality</p>
                    <button className='btn btn-light' onClick={handleStartPolling}>Start Polling</button>
                    <button className='ms-1 btn btn-light' onClick={handleStopPolling}>Stop Polling</button>
                </div>
            </div>
        </div>
    )
}
