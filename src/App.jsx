import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainPage from './MainPage';
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider } from 'react-router-dom';
import RouteMain from './MainRoute';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  // uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <RouteMain />
    </ApolloProvider>
  )
}
