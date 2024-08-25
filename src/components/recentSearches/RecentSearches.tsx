import './RecentSearches.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLocation, setSearched } from '../../redux/slices/weatherSlice'

const RecentSearches = () => {
    const dispatch = useDispatch()
    const { recentSearches } = useSelector((store: any) => store.weather)
    const recents = [...new Set(recentSearches)]

    const handelRecent = (e: any) => {
        dispatch(setSearched(true))
        dispatch(getUserLocation({ city: e.target.innerText }))
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="recent">
                <h2>Recent Seaches</h2>
                <div className="recents">
                    {
                        recents && (
                            recents?.length > 0 ? (
                                recents.map((recent: any) => {
                                    return (
                                        <div className="recent-item">
                                            <p onClick={handelRecent}>{recent}</p>
                                        </div>
                                    )
                                })
                            ) : (
                                <p>No recent searches!</p>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default RecentSearches