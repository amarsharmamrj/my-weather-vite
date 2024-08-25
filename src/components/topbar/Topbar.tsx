import { useDispatch, useSelector } from 'react-redux'
import './Topbar.css'
import { changeTheme } from '../../redux/slices/weatherSlice'

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
{/* <MdLightMode /> */ }
{/* <MdDarkMode /> */ }

const Topbar = () => {
    const dispatch = useDispatch()
    const { theme } = useSelector((store: any) => store.weather)

    const handleTheme = () => {
        const newTheme: string = theme == 'light' ? 'dark' : 'light'
        dispatch(changeTheme(newTheme))
    }

    return (
        <div className="topbar">
            <div className="title">
                <h2>My Weather</h2>

                <button onClick={handleTheme}>
                    {
                        theme === 'light' ? (
                            <MdDarkMode />
                        ) : (
                            <MdLightMode />
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default Topbar