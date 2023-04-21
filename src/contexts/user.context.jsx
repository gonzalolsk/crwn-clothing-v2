import { createContext, useReducer, useEffect } from "react";
import { USER_ACTION_TYPES } from "../store/user/user.types";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import {createAction} from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
});


const userReducer = (state, action) => {
    console.log(action);
    const {type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
            default:
                throw new Error(`Unhandled type ${type} in userReducer`)
    }
}


const INITIAL_STATE = {
    currentUser: null
}


// export const UserProvider = ({ children }) => {

//     const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    

//     const value = { currentUser, setCurrentUser };

//     useEffect(() => {
//         const unsuscribe = onAuthStateChangedListener((user) => {
//             if (user){
//                 createUserDocumentFromAuth(user);
//             }
//         setCurrentUser(user)
//         })
//         return unsuscribe;
//     },[]);

//     return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
// }

