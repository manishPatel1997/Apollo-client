import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GET_COUNTRY = gql`
  query Continent($code: String) {
    continents(filter: { code: { eq: $code } }) {
      countries {
        name
        capital
        currency
        awsRegion
      }
    }
    
  country(code:"IN"){
	currency
  }
  }
`;

export default function useLazyQueryCop() {
    const [regionName, setRegionName] = useState("Asia");
    const [getCountry, { loading, error, data }] = useLazyQuery(GET_COUNTRY)

    // useEffect(() => {
    //     getCountry({ variables: { code: "AS" } });
    // }, []);

    if (error) {
        console.warn(error)
    }
    if (loading) return <div style={{ width: "100%", height: "100vh" }} className="d-flex justify-content-center align-items-center">
        <div>
            <div class="spinner-border" role="status">
            </div>
        </div>
    </div>
    console.log(data, 'data')

    const handleClick = (code, name) => {
        setRegionName(name)
        getCountry({ variables: { code: code } })
    }
    return (
        <div className='container text-center '>

            <div className='pt-5 shadow'>
                <div className='p-3 fixed-top bg-secondary '>
                    <header>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/poolingNoLoader">PoolingNoLoader</Link></li>
                        <li><Link to="/refreshLoader">RefreshLoader</Link></li>
                        <li><Link to="/useLazyQueryCop">useLazyQuery</Link></li>
                    </header>
                    <h1 className='bg-success text-danger '>{regionName}</h1>
                    <button className='btn btn-danger' onClick={() => handleClick("AS", "Asia")}>Asia</button>
                    <button className='ms-2 btn btn-success ' onClick={() => handleClick("AF", "Africa")}>Africa</button>
                    <button className='ms-2 btn btn-primary' onClick={() => handleClick("AN", "Antarctica")}>Antarctica</button>
                    <button className='ms-2 btn btn-secondary' onClick={() => handleClick("EU", "Europe")}>Europe</button>
                    <button className='ms-2 btn btn-dark' onClick={() => handleClick("NA", "North America")}>North America</button>
                    <button className='ms-2 btn btn-danger' onClick={() => handleClick("SA", "South America")}>South America</button>
                    <button className='ms-2 btn btn-info' onClick={() => handleClick("OC", "Oceania")}>Oceania</button>
                </div>
                <div style={{ marginTop: "78px" }}>
                    <table class="table table-striped  table-bordered">
                        <thead class="thead-dark">
                            <tr>
                                <th>Index</th>
                                <th>name</th>
                                <th>currency</th>
                                <th>capital</th>
                                <th>awsRegion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.continents[0]?.countries?.map(({ name, currency, capital, awsRegion }, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{name}</td>
                                    <td>{currency}</td>
                                    <td>{capital}</td>
                                    <td>{awsRegion}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
