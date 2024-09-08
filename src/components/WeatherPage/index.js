import { useState, useEffect } from 'react'
import './index.css'
import { useParams, useNavigate } from 'react-router-dom'
import ForecastPage from '../ForecastPage'

const WeatherPage = () => {

    const [cityWeather, setCityWeather] = useState(null)
    const [error, setError] = useState(null);
    const [weatherBackground, setWeatherBackground] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('https://png.pngtree.com/png-clipart/20231017/original/pngtree-blue-3d-cloud-png-image_13329544.png')
    const { city } = useParams()
    console.log(city)
    const redirect = useNavigate()
    const apiKey = process.env.REACT_APP_API_KEY
    console.log(apiKey)

    useEffect( () => {
            const getCityWeather = async () => {
                try {
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
                    console.log(url)

                    const res = await fetch(url)
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const weatherJsonData = await res.json()
                    if (weatherJsonData && weatherJsonData.main) {
                        setCityWeather(weatherJsonData);
                        console.log(weatherJsonData)
                    } else {
                        throw new Error('Invalid data structure from API');
                    }
                
                }catch(error){
                    setError(error.message)
                }
            } 
            getCityWeather()
    }, [city, apiKey])


    useEffect(() => {
        if (cityWeather?.weather?.[0]) {
            const weatherDescription = cityWeather.weather[0].main;
            if (weatherDescription === 'Clouds') {
                setWeatherBackground('https://images.wallpaperscraft.com/image/single/lightning_thunderstorm_clouds_128281_3840x2160.jpg');
                setWeatherIcon('https://png.pngtree.com/png-clipart/20231017/original/pngtree-blue-3d-cloud-png-image_13329544.png')
            } else if (weatherDescription === 'Rain') {
                setWeatherBackground('https://getwallpapers.com/wallpaper/full/9/1/6/699103-rainy-wallpapers-2048x1356-for-hd-1080p.jpg');
                setWeatherIcon('https://static.vecteezy.com/system/resources/previews/012/806/415/original/3d-cartoon-weather-rain-clouds-with-thunderstorm-dark-cloud-sign-with-lightning-isolated-on-transparent-background-3d-render-illustration-png.png')
            } else if (weatherDescription === 'Clear') {
                setWeatherBackground('https://w0.peakpx.com/wallpaper/26/860/HD-wallpaper-clear-blue-sky-rocks-sun-grass-clear-sky-clouds-sea-beach-wawes-grasslands-water-green-beaches-landscape-coast-blue.jpg');
                setWeatherIcon('https://png.pngtree.com/png-vector/20240123/ourmid/pngtree-cloud-3d-render-png-image_11487016.png')
            } else {
                setWeatherBackground('hhttps://wallpapercave.com/wp/g3tz9zY.jpg');
                setWeatherIcon('https://png.pngtree.com/png-clipart/20190705/original/pngtree-yellow-sun-with-sunrays-effect-png-image_4221537.png')
            }
        }
    }, [cityWeather]);

    const onChangePage = () => {
        redirect('/')
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!cityWeather) {
        return <div>Loading...</div>;
    }

    const weatherMain = cityWeather.main;
    const weatherWind = cityWeather.wind;
    const weatherWeather = (cityWeather.weather && cityWeather.weather[0]);
    const tempInCelsius = (weatherMain.temp - 273.15).toFixed(1)
    const tempmax = (weatherMain.temp_max - 273.15).toFixed(1)
    const tempmin = (weatherMain.temp_min - 273.15).toFixed(1)
    const feelsLike = (weatherMain.feels_like - 273.15).toFixed(1)

 
    return (
            <div className='weather-card' style={{backgroundImage: `url(${weatherBackground})`}}>
                <div className='weather-data'>
                    <div className='weather-temp' style={{marginRight:10}}>
                    <h1 style={{color: '#232b2b', fontSize:20}}>Weather</h1>
                    <p style={{color: 'white', fontSize:10}}>Now</p>
                    <div className='temp-condition'>
                        <p className='temperature'>{tempInCelsius}°C</p>
                        <img src={weatherIcon} alt='weather icon' style={{height: 50, marginRight: 5}}/>
                    </div>
                    </div>
                    <div className='weather-description'>
                        <h1 className='city-name' style={{color: 'white'}}>{cityWeather.name}</h1>
                        <p className='description' style={{color: 'white'}}>{weatherWeather.description}</p>
                    </div>
                    <div className='temp-values'>
                        <p className='description' style={{color: 'white', fontSize:14, marginBottom:3}}>feels like: <span style={{color: 'white', fontSize:12}}>{feelsLike}°C</span></p>
                        <p className='description' style={{color: 'white', fontSize:14, marginBottom:3}}>temp max: <span style={{color: 'white', fontSize:12}}>{tempmax}°C</span></p>
                        <p className='description' style={{color: 'white', fontSize:14, marginBottom:3}}>temp min: <span style={{color: 'white', fontSize:12}}>{tempmin}°C</span></p>
                    </div>
                </div>
            <div className='weekly-data'>
                <div className='data'>
                    <h1 className='city-name' style={{color: 'white', fontSize: 20}}>Wind</h1>
                    <p className='description' style={{color: 'white'}}>{weatherWind.speed}m/s</p>
                </div>
                <div className='data'>
                    <h1 className='city-name' style={{color: 'white', fontSize: 20}}>Humidity</h1>
                    <p className='description' style={{color: 'white'}}>{weatherMain.humidity}%</p>
                </div>
                <div className='data'>
                    <h1 className='city-name' style={{color: 'white', fontSize: 20}}>Pressure</h1>
                    <p className='description' style={{color: 'white'}}>{weatherMain.pressure}hPa</p>
                </div>
                <div className='data'>
                    <h1 className='city-name' style={{color: 'white', fontSize: 20}}>Visibility</h1>
                    <p className='description' style={{color: 'white'}}>{cityWeather.visibility}</p>
                </div>
            </div>
            <ForecastPage />
            <button className='back-button' onClick={onChangePage}>Back</button>
        </div>
    )
}

export default WeatherPage