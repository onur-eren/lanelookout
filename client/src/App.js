import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Home from './views/Home'
import Page404 from './views/Page404'
import About from './views/About'
import ReportObstruction from './views/ReportObstruction'
import 'semantic-ui-css/semantic.min.css'
import ReactGA from 'react-ga'
import createHistory from 'history/createBrowserHistory'

ReactGA.initialize('UA-140241188-1')

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://www.lanelookout.org/gql/'
        : 'http://0.0.0.0:5000/gql/',
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/report" component={ReportObstruction} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
