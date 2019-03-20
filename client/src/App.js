import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Provider } from "react-redux";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import store from "./redux";
import PageHome from "./components/PageHome";
import Page404 from './components/Page404';
import ReportObstruction from "./components/ReportObstruction";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://oakbike.herokuapp.com/gql' }),
  cache: new InMemoryCache()
});

const App = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/oak-bike-client' : null;
  return (
    <ApolloProvider client={client}>
      <Router basename={basename}>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/report" component={ReportObstruction} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
