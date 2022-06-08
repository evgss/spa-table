import {
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_SIZE,
    CHANGE_PAGE,
    SLICE_POSTS, SORT
} from "./post.contsnts";

export const postsReducer = (state =
                                 {
                                     postsPerPage: 10,
                                     currentPage: 1,
                                     posts: [],
                                     currentPosts: [],
                                     size: []
                                 }, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {...state, loading: true}
        case GET_POSTS_SUCCESS:
            return {...state, loading: false, posts: action.payload}
        case GET_POSTS_FAIL:
            return {...state, loading: false, error: action.payload}
        case SLICE_POSTS:
            return {...state, currentPosts: action.payload}
        case CHANGE_PAGE:
            return {...state, currentPage: action.payload}
        case GET_SIZE:
            return {...state, size: action.payload}
        case SORT:
            return {...state, currentPosts: action.payload}
        default:
            return state
    }
}
