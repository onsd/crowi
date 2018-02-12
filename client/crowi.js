import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware, push, routerReducer as router } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()


const rootReducer = combineReducers({
  router,
})
const initialState = {}
const store = configureStore(initialState, [routerMiddleware(history)])
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={() => <div>
          Home
        </div>
      }/>
    </ConnectedRouter>
  </Provider>, document.getElementById('app-container')
)


function configureStore(preloadedState = {}, middlewares = []) {
  middlewares.push(thunkMiddleware)

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )

  return store
}
