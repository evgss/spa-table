import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import MainPage from "./components/MainPage/MainPage";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, getSize, slicePosts} from "./redux/posts.actions";
import NoPageFound from "./components/NoPageFound/NoPageFound";

export default function App() {
    const dispatch = useDispatch()
    const {loading, posts, currentPage, size} = useSelector(state => state.post)
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    useEffect(() => {
        dispatch(slicePosts())
    }, [dispatch, posts, currentPage])

    useEffect(() => {
        dispatch(getSize())
    }, [dispatch, posts])

    if (loading) return <h1>Загрузка...</h1>
    return (
        <div>
            <Router>
                <Routes>
                    {/*редирект при переходе на главную страницу*/}
                    <Route path='/' element={<Navigate to="/1" replace/>}/>
                    {
                        // количество ссылков в зависимости от общего количества постов и постов на странице (вычисляется динамически)
                        size.map(page => <Route
                            key={page}
                            path={`/${page}`}
                            element={<MainPage/>}
                        />)
                    }

                    {/*редирект при некорректном урле*/}
                    <Route path='/*' element={<NoPageFound/>}/>
                </Routes>
            </Router>
        </div>

    )
}
