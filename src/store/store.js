//This is almost the combined place where all of our redux happens.
 import { compose, createStore, applyMiddleware } from 'redux'
 import logger from 'redux-logger'

 // Root-reducer -> combination of all of our reducers

 import {rootReducer} from './root-reducer'

const middlewares = [logger]

const composedEnhancers = compose( applyMiddleware(...middlewares))

 export const store = createStore( rootReducer, undefined, composedEnhancers )
