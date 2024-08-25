import './DayCard.css'
import dayjs from 'dayjs'

import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { TbTemperaturePlus } from "react-icons/tb";
import { TbTemperatureMinus } from "react-icons/tb";
import { FaCloudRain } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const DayCard = (props: any) => {
    const { date, day, astro } = props.day
    return (
        <div className="card">
            <div className="header">
                <p className="day">{dayjs(date).format('DD, MMM-YY')}</p>
                <p className="date">{dayjs(date).format('ddd')}</p>
            </div>
            <div className="items">
                <div className="item">
                    <div className="field">
                        <div className="icon">
                            <GiSunrise />
                        </div>
                        <p className="text">sunrise</p>
                    </div>
                    <div className="value">
                        <p>
                            {astro.sunrise}
                        </p>
                    </div>
                </div>
                <div className="item">
                    <div className="field">
                        <div className="icon">
                            <GiSunset />
                        </div>
                        <p className="text">sunset</p>
                    </div>
                    <div className="value">
                        <p>
                            {astro.sunset}
                        </p>
                    </div>
                </div>
                <div className="item">
                    <div className="field">
                        <div className="icon">
                            <WiHumidity />
                        </div>
                        <p className="text">humidity</p>
                    </div>
                    <div className="value">
                        <p>
                            {day.avghumidity} %
                        </p>
                    </div>
                </div>
                <div className="item">
                    <div className="field">
                        <div className="icon">
                            <TbTemperaturePlus />
                        </div>
                        <p className="text">max temp</p>
                    </div>
                    <div className="value">
                        <p>
                            {day.maxtemp_c}<sup>o</sup>C
                        </p>
                    </div>
                </div>
                <div className="item">
                    <div className="field">
                        <div className="icon">
                            <TbTemperatureMinus />
                        </div>
                        <p className="text">min temp</p>
                    </div>
                    <div className="value">
                        <p>
                            {day.mintemp_c}<sup>o</sup>C
                        </p>
                    </div>
                </div>
                <div className="item">
                    <div className="field">
                        <div className="icon">
                            <FaCloudRain />
                        </div>
                        <p className="text">rain change</p>
                    </div>
                    <div className="value">
                        <p>
                            {day.daily_chance_of_rain} %
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayCard