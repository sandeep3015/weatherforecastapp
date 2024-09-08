import { useState, useEffect } from 'react'
import './index.css'
import { useParams } from 'react-router-dom'
import dateFormat from 'dateformat';

const ForecastPage = () => {

    const [forecastData, setForecastData] = useState()
    const [isLoading, setLoading] = useState(true)

    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    const { city } = useParams()
    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        const getForecastData = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
                console.log(url)

                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const forecastJsonData = await res.json()
                const forecastDataByDay = forecastJsonData.list.filter((item, index) => index
                % 8 === 0)
                setForecastData(forecastDataByDay)
                setLoading(false)
            }catch(error){
                console.log(error.message)
            }
        } 
        getForecastData()
}, [city, apiKey])

    return(
        <div className='forecast-data'>
            <h1 className='forecast-heading'>Forecast</h1>
            {
                isLoading ? (
                    <p style={{color: 'white'}}>Loading...</p>
                ) : (
                    <div className='forecast-data-display'>
                        {forecastData.map((day, index) => {

                            let forecastWeatherIcon

                            if (day.weather[0].main === 'Clouds') {
                                forecastWeatherIcon = 'https://png.pngtree.com/png-clipart/20231017/original/pngtree-blue-3d-cloud-png-image_13329544.png'
                            } else if (day.weather[0].main === 'Rain') {
                                forecastWeatherIcon = 'https://static.vecteezy.com/system/resources/previews/012/806/415/original/3d-cartoon-weather-rain-clouds-with-thunderstorm-dark-cloud-sign-with-lightning-isolated-on-transparent-background-3d-render-illustration-png.png'
                            } else if (day.weather[0].main === 'Rain') {
                                forecastWeatherIcon = 'https://png.pngtree.com/png-vector/20240123/ourmid/pngtree-cloud-3d-render-png-image_11487016.png'
                            } else {
                                forecastWeatherIcon = 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-yellow-sun-with-sunrays-effect-png-image_4221537.png'
                            }

                            const date = dateFormat(day.dt_txt, "mmm dS, yyyy")

                            return (
                                
                                <div key = {index} className='data-container'>
                                    <p className='date'>Date: {date}</p>
                                    <p className='forecast-temp'><span className='date'>Temp: </span>{(day.main.temp - 273.15).toFixed(1)}°C</p>
                                    <img src={forecastWeatherIcon} alt='Forecast Weather Icon' style={{height: 30, marginRight: 5}}/>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default ForecastPage
