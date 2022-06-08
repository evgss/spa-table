import './posts.css'
import {useDispatch} from "react-redux";
import {sortByAlphabet, sortByNumber} from "../../redux/posts.actions";
import arrow from '../../images/arrow-bottom.svg'

export default function Posts({currentPosts}) {

    const dispatch = useDispatch()
    if (!currentPosts.length) return <h2>Нет подходящих записей</h2>
    return (
        <div className='table'>
            <div className="table__head">
                <div className="table__item flex1">ID <img onClick={() => dispatch(sortByNumber())} src={arrow} alt="arrow"/></div>
                <div className="table__item flex4">Заголовок <img onClick={() => dispatch(sortByAlphabet('title'))} src={arrow} alt="arrow"/></div>
                <div className="table__item flex4">Описание <img  onClick={() => dispatch(sortByAlphabet('body'))} src={arrow} alt="arrow"/></div>
            </div>
            <div className="table__body">
                {
                    currentPosts && currentPosts.map(post =>
                        <div className='table__row'>
                            <div className="table__id flex1">{post.id}</div>
                            <div className="table__title flex4">{post.title}</div>
                            <div className="table__text flex4">{post.body}</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
