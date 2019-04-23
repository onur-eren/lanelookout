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
import ViewReports from "./components/ViewReports";
import 'semantic-ui-css/semantic.min.css'

const gqlUrl = 'https://lanelookout.herokuapp.com/gql/';
const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NODE_ENV === "production" ? gqlUrl : "http://0.0.0.0:5000/gql/"}),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/report" component={ReportObstruction} />
          <Route path="/view_reports" component={ViewReports} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
