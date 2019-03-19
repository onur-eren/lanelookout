import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import PageHome from "./components/PageHome";
import Page404 from './components/Page404';
import ReportObstruction from "./components/ReportObstruction";

const App = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/oak-bike-client' : null;
  return (
    <Provider store={store}>
      <Router basename={basename}>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/report" component={ReportObstruction} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
