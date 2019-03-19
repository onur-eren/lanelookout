import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageHome from "./components/PageHome";
import PageReport from './components/PageReport';
import Page404 from './components/Page404';
import OakMap from './components/Map';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/gql"
      : "http://localhost:5000/graphql/"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/report" component={PageReport} />
          <Route path="/map" component={OakMap} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
