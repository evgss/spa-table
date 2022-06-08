import {
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_SIZE,
    CHANGE_PAGE,
    SLICE_POSTS, SORT,
} from "./post.contsnts";
import axios from "axios";

// запрос всех постов
export const getPosts = () => async (dispatch) => {
    try {
        dispatch({type: GET_POSTS_REQUEST})
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch({type: GET_POSTS_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: GET_POSTS_FAIL, payload: message
        })
    }
}

// возврат нужной части массива на основании текущей страницы и количества постов на странице
export const slicePosts = () => (dispatch, getState) => {
    const {posts, currentPage, postsPerPage} = getState().post
    const lastPost = currentPage * postsPerPage
    const firstPost = lastPost - postsPerPage
    dispatch({type: SLICE_POSTS, payload: posts.slice(firstPost, lastPost)})
}

// следующая страница при нажатии на кнопку
export const nextPage = () => (dispatch, getState) => {
    const {currentPage, postsPerPage, posts} = getState().post
    const changePageUp = () => {
        if (currentPage === Math.ceil(posts.length / postsPerPage)) {
            return 1
        } else return currentPage + 1
    }
    dispatch({type: CHANGE_PAGE, payload: changePageUp()})
}

// предыдущая страница при нажатии на кнопку
export const prevPage = () => (dispatch, getState) => {
    const {currentPage, postsPerPage, posts} = getState().post
    const changePageDown = () => {
        if (currentPage === 1) {
            return Math.ceil(posts.length / postsPerPage)
        } else return currentPage - 1
    }
    dispatch({type: CHANGE_PAGE, payload: changePageDown()})
}

// выбор страницы при нажатии на ссылку с номером
export const setPage = (number) => (dispatch) => {
    dispatch({type: CHANGE_PAGE, payload: number})
}

// вычисление количества постов на странице
export const getSize = () => (dispatch, getState) => {
    const size = []
    const {postsPerPage, posts} = getState().post
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
        size.push(i)
    }
    dispatch({type: GET_SIZE, payload: size})
}

// сортировка по id
export const sortByNumber = () => (dispatch, getState) => {
    const {currentPosts} = getState().post

    function getSortedArrayByNumber() {
        const init = structuredClone(currentPosts).sort((prev, next) => next.id - prev.id)
        if (JSON.stringify(currentPosts) === JSON.stringify(init)) {
            return structuredClone(currentPosts).sort((prev, next) => prev.id - next.id)
        } else {
            return init
        }
    }

    dispatch({type: SORT, payload: getSortedArrayByNumber()})
}

// сортировка по алфавиту по выбранному полю
export const sortByAlphabet = (param) => (dispatch, getState) => {
    const {currentPosts} = getState().post

    const init = structuredClone(currentPosts).sort((prev, next) => {
        if (prev[param] < next[param]) return -1;
        if (prev[param] < next[param]) return 1
    })

    function getSortedArrayByAlphabet() {
        if (JSON.stringify(currentPosts) === JSON.stringify(init)) {
            return structuredClone(currentPosts).sort((prev, next) => {
                if (prev[param] > next[param]) return -1;
                if (prev[param] > next[param]) return 1
            })
        } else return init
    }

    dispatch({type: SORT, payload: getSortedArrayByAlphabet()})
}
