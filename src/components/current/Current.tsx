import { useEffect } from "react"
import { useSelector } from "react-redux"
import { getCurrentData, getUserLocation, setIsCurrentLoading, setIsInValidSearch, setRecentSearches, syncFromLocalStorage } from "../../redux/slices/weatherSlice"
import { useDispatch } from "react-redux"

import './Current.css'

import { WiHumidity } from "react-icons/wi";
import { TbUvIndex } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Shimmer from "../shimmer/Shimmer"

const Current = () => {
    const dispatch = useDispatch()
    const { current, userLocation, searched, loading, recentSearches } = useSelector((store: any) => store.weather)

    const addToRecentSearches = (cityName: string | undefined) => {
        dispatch(setRecentSearches(cityName))
        let newData = [...recentSearches, cityName]
        window.localStorage.setItem('recentSearches', JSON.stringify(newData))
    }

    const fetchCurrentData = (isSeached: boolean, city: undefined | string, lat: number | undefined, long: number | undefined) => {
        dispatch(setIsCurrentLoading(true))
        const uri = isSeached ?
            `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${city}&aqi=no` :
            `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${lat},${long}&aqi=no`

        fetch(uri)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setIsCurrentLoading(false))
                if (data.error) {
                    dispatch(setIsInValidSearch(true))
                    dispatch(setIsCurrentLoading(true))
                } else {
                    if (city) addToRecentSearches(city)
                    dispatch(setIsInValidSearch(false))
                    dispatch(setIsCurrentLoading(false))
                    dispatch(getCurrentData(data))
                }
            })
            .catch((err: any) => {
                dispatch(setIsInValidSearch(false))
                dispatch(setIsCurrentLoading(false))
            })
    }

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                const payload = { latitude: location.coords.latitude, longitude: location.coords.longitude }
                dispatch(getUserLocation(payload))
            });
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    useEffect(() => {
        const fromLocal = window.localStorage.getItem('recentSearches') != null ?
            window.localStorage.getItem('recentSearches') : "[]"

        dispatch(syncFromLocalStorage(JSON.parse(fromLocal)))
    }, [])

    useEffect(() => {
        if (Object.keys(userLocation).length > 0) {
            if (searched) fetchCurrentData(true, userLocation?.city, userLocation?.latitude, userLocation?.longitude)
            else fetchCurrentData(false, userLocation?.city, userLocation?.latitude, userLocation?.longitude)
        }
    }, [userLocation])


    return (
        <div className="current">
            {
                !loading.isCurrentLoading ? (
                    current && (
                        <>
                            <h4 className="location"><FaLocationDot /> {current?.location?.name}, {current?.location?.region}, {current?.location?.country}</h4>
                            <img
                                src={current?.current?.condition?.icon} alt={current?.current?.condition?.text}
                                className="icon"
                            />
                            <p className="temp">{current?.current?.temp_c}<sup> o</sup>C</p>

                            <div className="data-cards">
                                <div className="card">
                                    <div className="icon">
                                        <WiHumidity />
                                    </div>
                                    <div className="data">
                                        <p className="title">Humidity</p>
                                        <p className="value">{current?.current?.humidity}</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="icon">
                                        <TbUvIndex />
                                    </div>
                                    <div className="data">
                                        <p className="title">Uv Index</p>
                                        <p className="value">{current?.current?.uv}</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="icon">
                                        <FaWind />
                                    </div>
                                    <div className="data">
                                        <p className="title">Wind(kph)</p>
                                        <p className="value">{current?.current?.wind_kph}</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="icon">
                                        <MdOutlineVisibilityOff />
                                    </div>
                                    <div className="data">
                                        <p className="title">Visibility(km)</p>
                                        <p className="value">{current?.current?.vis_km}</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="icon">
                                        <FaCloud />
                                    </div>
                                    <div className="data">
                                        <p className="title">Cloud(%)</p>
                                        <p className="value">{current?.current?.cloud}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                ) : (
                    <div>
                        <Shimmer height="1.5rem" width="50%" borderRadius="0" margin="0 auto" />
                        <Shimmer height="2.5rem" width="2.5rem" borderRadius="100%" margin="1rem auto" />
                        <Shimmer height="2rem" width="4rem" borderRadius="0" margin="1rem auto" />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                [1, 2, 3, 4, 5].map(() => (
                                    <Shimmer height="3.2rem" width="8rem" borderRadius="0.5rem" margin="1rem" />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Current