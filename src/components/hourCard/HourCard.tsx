import './HourCard.css'

type Hour = {
    time: string,
    icon: string,
    temp: number,
    text: string
}

interface IHour {
    hour: Hour
}

const HourCard = (props: IHour) => {
    const { hour } = props
    return (
        <div
            className={`card ${hour.time.split(' ')[1].split(":")[0] == `${(new Date()).getHours()}` ? 'now' : ''}`}
        >
            <p className="time">
                {
                    hour.time.split(' ')[1].split(":")[0] == `${(new Date()).getHours()}` ? 'Now' : hour.time.split(' ')[1]
                }
            </p>
            <img src={hour.icon} alt={hour.text} className="icon" />
            <p className="temp">{hour.temp}<sup> o</sup>C</p>
        </div>
    )
}

export default HourCard