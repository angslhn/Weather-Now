import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faWind, faGauge, faDroplet, faSun } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const Main = ({ weather, image }) => {
    const data = weather
    const imageSource = image

    return (
        <main>
            <div className="weathernow__check__wrapper">
                <div className="weathernow__check__city__title">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <h2 className="weathernow__check__city__title__text">{ data?.location?.name }</h2>
                </div>
                <div className="weathernow__check__information__weather">
                    <div className="weathernow__check__information__weather__and__temprature">
                        <span className="weathernow__check__information__weather__name">
                         { data && String(data?.current?.condition?.text).split(" ").map((text) => text[0].toUpperCase() + text.slice(1).toLowerCase()).join(" ") }
                        </span>
                        <span className="weathernow__check__information__temprature__value">
                            { data?.current?.temp_c }°C
                        </span>
                    </div>
                    <div className="weathernow__check__information__weather__icon">
                        <img src={ imageSource?.[String(data?.current?.condition?.code)] || imageSource?.["1006"] } alt="Icon not set."/>
                    </div>
                </div>
                <div className="weathernow__check__information__other">
                    <div className="weathernow__check__information__uv__index">
                        <div className="weathernow__check__information__uv__index__icon">
                            <FontAwesomeIcon icon={faSun} />
                        </div>
                        <div className="weathernow__check__information__uv__index__information">
                            <h3 className="weathernow__check__information__uv__index__title__text">
                                UV Index
                            </h3>
                            <span className="weathernow__check__information__uv__index__value">
                            { data?.current?.uv }
                            </span>
                        </div>
                    </div>
                    <div className="weathernow__check__information__humidity">
                        <div className="weathernow__check__information__humidity__icon">
                            <FontAwesomeIcon icon={faDroplet} />
                        </div>
                        <div className="weathernow__check__information__humidity__information">
                            <h3 className="weathernow__check__information__humidity__title__text">
                                Humidity
                            </h3>
                            <span className="weathernow__check__information__humidity__value">
                            { data?.current?.humidity }%
                            </span>
                        </div>
                    </div>
                    <div className="weathernow__check__information__wind__speed">
                        <div className="weathernow__check__information__wind__speed__icon">
                            <FontAwesomeIcon icon={faWind} />
                        </div>
                        <div className="weathernow__check__information__wind__speed__information">
                            <h3 className="weathernow__check__information__wind__speed__title__text">
                                Wind Speed
                            </h3>
                            <span className="weathernow__check__information__wind__speed__value">
                            { data?.current?.wind_kph } kph
                            </span>
                        </div>
                    </div>
                    <div className="weathernow__check__information__pressure">
                        <div className="weathernow__check__information__pressure__icon">
                            <FontAwesomeIcon icon={faGauge} />
                        </div>
                        <div className="weathernow__check__information__pressure__information">
                            <h3 className="weathernow__check__information__pressure__title__text">
                                Pressure
                            </h3>
                            <span className="weathernow__check__information__pressure__value">
                                { data?.current?.pressure_mb } mb
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main
