import React, { useState, useEffect } from 'react'
import './style.scss'
import Clock from './Date';
import Modal from './Modal';
const Today = ({ city, clicked }) => {
    const [data, setData] = useState([]);

    const key = 'fb8b35a37304d98e955760be96b16348';

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
            .then(response => response.json())
            .then(dataa => {
                setData([dataa]);
            })
            .catch(err => {
                console.log(err)
            })
    }, [clicked])


    const renderAuthButton = () => {
        if (city !== 'undefined') {
            return (
                <div>
                    {data.map(dataa => <div key={dataa.id}>
                        <h2>{dataa.name},
                            {dataa.sys.country}</h2>
                        <div className='for_flex'>
                            <img src={`http://openweathermap.org/img/wn/${dataa.weather[0].icon}@2x.png`} alt="weather"></img>
                            <h1>{dataa.main.temp} <span>&#8451;</span> </h1>
                        </div>
                        <p>Feels like {dataa.main.feels_like}.Few {dataa.weather[0].description} .{dataa.weather[0].main} </p>
                        <div className='for_flex border'>
                            <ul>
                                <li>{dataa.wind.speed}m/s NNW</li>
                                <li>Humidity:{dataa.main.humidity}%</li>
                                <li>Dew point: {dataa.main.temp_min}&#8451;</li>
                            </ul>
                            <ul>
                                <li>{dataa.main.pressure}hPa</li>
                                <li>Uv:8</li>
                                <li>Visibility: {Number(dataa.visibility) / 1000}km</li>
                            </ul>
                        </div>
                    </div>)
                    }
                    <Modal city={city} clicked={clicked} />
                </div>
            )
        } else {
            return "";
        }
    }


    return (
        <div className="inputVal">
            <Clock />
            {renderAuthButton()}
        </div>
    )



}


export default Today;
