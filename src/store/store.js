//This is almost the combined place where all of our redux happens.
 import { compose, createStore, applyMiddleware } from 'redux'
//  import logger from 'redux-logger'

 // Root-reducer -> combination of all of our reducers

 import {rootReducer} from './root-reducer'

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentState: ', store.getState())

    next(action);

    console.log('nextState: ', store.getState())
}

const middlewares = [loggerMiddleware]

const composedEnhancers = compose( applyMiddleware(...middlewares))

 export const store = createStore( rootReducer, undefined, composedEnhancers )
