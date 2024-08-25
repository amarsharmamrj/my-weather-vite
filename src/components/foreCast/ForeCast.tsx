import { useEffect } from 'react'
import './ForeCast.css'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getForeCast, setIsForeCastLoading } from '../../redux/slices/weatherSlice'
import DayCard from '../dayCard/DayCard'
import Shimmer from '../shimmer/Shimmer'

const ForeCast = () => {
    const dispatch = useDispatch()
    const { userLocation, foreCast, searched, loading } = useSelector((store: any) => store.weather)
    
    const getForeCastData = (isSeached: boolean, city: null | string, lat: number | undefined, long: number | undefined) => {
        dispatch(setIsForeCastLoading(true))
        const uri = isSeached ?
            `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${city}&days=3&aqi=no&alerts=no` :
            `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${lat},${long}&days=3&aqi=no&alerts=no`

        fetch(uri)
            .then(res => res.json())
            .then((data: any) => {
                if (data.error) {
                    dispatch(setIsForeCastLoading(true))
                } else {
                    dispatch(setIsForeCastLoading(false))
                    dispatch(getForeCast(data.forecast.forecastday))
                }
            })
            .catch((err) => {
                dispatch(setIsForeCastLoading(false))
            })
    }

    useEffect(() => {
        if (Object.keys(userLocation).length > 0) {
            if (searched) getForeCastData(true, userLocation?.city, userLocation?.latitude, userLocation?.longitude)
            else getForeCastData(false, userLocation?.city, userLocation?.latitude, userLocation?.longitude)
        }
    }, [userLocation])

    return (
        <div className="foreCast">
            <h2 className='section-title'>ForeCast</h2>

            <div className="day-cards">
                {
                    !loading.isForeCastLoading ? (
                        foreCast ? (
                            foreCast.length > 0 && (
                                foreCast.map((day: any) => {
                                    return (
                                        <DayCard day={day} />
                                    )

                                })
                            )
                        ) : ('loading..')
                    ) : (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    [1, 2, 3].map(() => (
                                        <Shimmer height="6rem" width="20rem" borderRadius="0.5rem" margin="1rem" />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ForeCast