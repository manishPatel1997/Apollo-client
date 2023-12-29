import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'

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

    const { loading, error, data, startPolling, stopPolling } = useQuery(GET_DOG_PHOTO,
        {
            variables: { code: countryName?.current },
            pollInterval: 0,   //Polling call interval time api
        });

    const handleStartPolling = () => {
        startPolling(5000); // Start polling every 1000 milliseconds (1 second)
    };

    const handleStopPolling = () => {
        stopPolling();
    };
    if (loading) return <div style={{ width: "100%", height: "100vh" }} className="d-flex justify-content-center align-items-center">
        <div>
            <div class="spinner-border" role="status">
            </div>
        </div>
    </div>

    return (
        <div style={{ height: "100vh", width: "100%" }} className='container text-center bg-body-secondary shadow'>
            <div className=''>
                <div className=''>
                    <h1 className='text-bg-primary'>Main Data</h1>
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
                        <h3>pooling start but not re-render page <span className='bg-danger text-white'>see network api call</span></h3>
                        <p className='text-bg-dark  '>call page like setInterval functionality</p>
                        <button className='btn btn-light' onClick={handleStartPolling}>Start Polling</button>
                        <button className='ms-1 btn btn-light' onClick={handleStopPolling}>Stop Polling</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
