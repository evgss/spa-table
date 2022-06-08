import './navigation.css'
import {Link} from "react-router-dom";
import {nextPage, prevPage} from "../../redux/posts.actions";
import {useDispatch, useSelector} from "react-redux";

export default function Navigation() {
    const dispatch = useDispatch()
    const {size, currentPage} = useSelector(state => state.post)
    return (
        <div className='navigation'>
            <button className='navigation__btn btn-left' onClick={() => dispatch(prevPage())}>
                <Link to={`/${currentPage === 1 ? size.length : currentPage - 1}`}>Назад</Link>
            </button>
            <div className='navigation__center'>
                {
                    size.map(pageNumber =>
                        <Link to={`/${pageNumber}`} key={pageNumber}
                              className={pageNumber === currentPage ? 'navigation__link active' : 'navigation__link'}
                        >
                            {pageNumber}
                        </Link>
                    )
                }
            </div>
            <button className='navigation__btn btn-right' onClick={() => dispatch(nextPage())}>
                <Link to={`/${currentPage === size.length ? 1 : currentPage + 1}`}>Вперед</Link>
            </button>
        </div>
    )
}
