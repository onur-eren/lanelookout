import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
// import { Provider } from "react-redux";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import store from "./redux";
import PageHome from "./components/PageHome";
import Page404 from './components/Page404';
import About from './components/About';
import Description from './components/ReportObstruction/Description';
import ReportObstruction from "./components/ReportObstruction";
import ViewReports from "./components/ViewReports";
import 'semantic-ui-css/semantic.min.css'
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory'

ReactGA.initialize("UA-140241188-1");

const gqlUrl = 'https://lanelookout.herokuapp.com/gql/';
const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NODE_ENV === "production" ? gqlUrl : "http://192.168.99.100:5000/gql/"}),
  cache: new InMemoryCache()
});

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/about" component={About} />
          <Route path="/xxx" component={Description} />
          <Route path="/report" component={ReportObstruction} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
