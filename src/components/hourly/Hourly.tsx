import { useEffect } from 'react'
import './Hourly.css'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getHourlydata, setIsHourlyLoading } from '../../redux/slices/weatherSlice'
import HourCard from '../hourCard/HourCard'
import Shimmer from '../shimmer/Shimmer'

const Hourly = () => {
    const dispatch = useDispatch()
    const { userLocation, hourly, searched, loading } = useSelector((store: any) => store.weather)

    const getHourlyData = (isSeached: boolean, city: null | string, lat: number | undefined, long: number | undefined) => {
        dispatch(setIsHourlyLoading(true))
        const uri = isSeached ?
            `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${city}&days=1&aqi=no&alerts=no` :
            `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${lat},${long}&days=1&aqi=no&alerts=no`

        fetch(uri)
            .then(res => res.json())
            .then((data:any) => {
                if (data.error) {
                    dispatch(setIsHourlyLoading(true))
                } else {
                    dispatch(setIsHourlyLoading(false))
                    dispatch(getHourlydata(data?.forecast?.forecastday[0]?.hour))
                }
            })

            .catch((err) => {
                dispatch(setIsHourlyLoading(false))
            })

    }

    useEffect(() => {
        if (Object.keys(userLocation).length > 0) {
            if (searched) getHourlyData(true, userLocation?.city, userLocation?.latitude, userLocation?.longitude)
            else getHourlyData(false, userLocation?.city, userLocation?.latitude, userLocation?.longitude)
        }
    }, [userLocation])

    return (
        <div className="hourly">
            <div className="title">
                <h2 className='section-title'>Hourly</h2>
                <div className="date">
                    {`${(new Date())}`.split(" ")[1]}
                    <span>, </span>
                    {`${(new Date())}`.split(" ")[2]}
                </div>
            </div>

            <div className="hour-cards">
                {
                    !loading.isHourlyLoading ? (
                        hourly ? (
                            hourly.length > 0 && (
                                hourly.map((hour: any) => {
                                    return (
                                        <HourCard
                                            hour={{ time: hour.time, icon: hour.condition.icon, temp: hour.temp_c, text: hour.condition.text }}
                                        />
                                    )
                                })
                            )
                        ) : ('loading..')
                    ) : (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                                        <Shimmer height="6rem" width="5rem" borderRadius="0.5rem" margin="1rem" />
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

export default Hourly