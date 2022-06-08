import './main-page.css'
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../redux/posts.actions";
import Posts from "../Posts/Posts";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Navigation from "../Navigation/Navigation";

export default function MainPage() {

    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const {currentPage, currentPosts} = useSelector(state => state.post)
    const location = useLocation().pathname.slice(1)

    // обновление текущей страницы по урлу с последующем обновлением стейта
    useEffect(() => {
        dispatch(setPage(parseInt(location)))
    }, [currentPage, dispatch, location])

    // сортировка по ключам, передает в компонент вниз
    const keys = ['title', 'body']
    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query)))
    }

    return (
        <div className='container'>
            <div className="container__inner">
                <div className="container__input">
                    <input
                        className='input' type="text"
                        placeholder='Поиск'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <i className="icon fas fa-search fa-xl"/>
                </div>
                <Posts currentPosts={search(currentPosts)}/>
                <Navigation/>
            </div>
        </div>
    )
}
