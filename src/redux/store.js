import {applyMiddleware, combineReducers, createStore} from "redux";
import {postsReducer} from "./posts.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    post: postsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
