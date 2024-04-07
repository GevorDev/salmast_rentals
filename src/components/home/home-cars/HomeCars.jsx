import React, { useEffect, useState, useRef } from 'react'
import "./HomeCars.scss"
import Conatiner from "../../common/container/Container"
import { CONFIG } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import Popup from 'reactjs-popup'
import { activate, closePopup } from '../../../redux/slices/PopupSlice'

export const HomeCars = ({ myRef }) => {
    const [active, setActive] = useState(1);
    const [show, setShow] = useState(false)
    const [dataList, setDataList] = useState([])
    const [dataCar, setDataCar] = useState([])
    const [filter, setFilter] = useState(1);

//   const langState = useSelector((state) => state.lang.lang)
    const [reservData, setReservData] = useState([])
    const [costData, setCostData] = useState([])

    const homeCars = useSelector((state) => state.homeCars.homeCars);
    const homeCarsOptions = useSelector((state) => state.homeCars.homeCarsOptions);
    const langState = useSelector((state) => state.lang.lang)
    const popupWin = useSelector((state) => state.popup.windows)

    const dispatch = useDispatch()

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(
                    "http://16.171.38.63:8000/cost_list/"
                    
                );
                setCostData(data);
            } catch (error) {
                console.log(error.message)
            }
        }
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(
                    "http://16.171.38.63:8000/reservation_list/"
                );
                setReservData(data);
            } catch (error) {
                console.log(error.message)
            }
        }
        getData();
    }, []);
    
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(
                    "http://16.171.38.63:8000/choise_list/"
                );
                setDataList(data);
            } catch (error) {
                console.log(error.message)
            }
        }
        getData();
    }, []);
    
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(
                    "http://16.171.38.63:8000/product_list/"
                );
                setDataCar(data);
            } catch (error) {
                console.log(error.message)
            }
        }
        getData();
    }, []);

    const handleFilterChange = (category) => {
        setFilter(category);
      };

      const filteredData = filter
      ? dataCar.filter((item) => item.choice === filter)
      : dataCar;
      console.log(filteredData);

      return (
        <div ref={myRef} className='home-cars' >
            <Conatiner>
                <div className="home-cars-top">
                    <h4>{langState==="en"?"Select the Class of the vehicle":langState==="ru"?"Выберите Класс автомобиля":"Ընտրեք մեքենայի Դասը"}</h4>
                    <ul className="home-cars-top-list">
                        {dataList.map(({ id, name_hy, car_logo, act_car_logo, car_about_hy, car_about_en, car_about_ru, }) => {
                            return (
                                <li
                                    key={id}
                                    onClick={() => {
                                        setActive(id)
                                        handleFilterChange(id)
                                    }}
                                    style={{ background: active === id ? "var(--blue)" : "#0F0F0F0D" }}
                                >
                                    <img src={car_logo} alt="" style={{ display: active === id ? "none" : "flex" }} />
                                    <img src={act_car_logo} alt="" style={{ display: active === id ? "flex" : "none" }} />
                                    <p style={{ color: active === id ? "white" : "black" }}>{langState==="en"?car_about_en:langState==="ru"?car_about_ru:car_about_hy}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="home-cars-bottom" >
                    <div className="home-cars-bottom-title">
                        <h2>{langState==="ru"?"Рекомендуемый выбор":langState==="en"?"Recommended choice":"Առաջարկվող ընտրանին"}</h2>
                        <button onClick={() =>{
                            // handleFilterChange(id)
                        }}>{langState==="ru"?"Увидеть все":langState==="en"?"See all":"Տեսնել բոլորը"}</button>
                    </div>
                    <div className="home-cars-bottom-items">
                        {filteredData.map(({ id, choice, car_name_hy, car_name_ru, car_name_en,
                        car_logo, 
                        speed_name_hy, speed_name_ru, speed_name_en,
                        speed_logo, 
                        gearbox_name_hy, gearbox_name_ru, gearbox_name_en, 
                        gearbox_logo,
                        person_name_hy, person_name_en, person_name_ru,
                        person_logo, 
                        fuel_name_hy, fuel_name_ru, fuel_name_en, 
                        fuel_logo,
                        car_button_hy, car_button_en, car_button_ru,
                        price_text_hy, price_text_en, price_text_ru }) =>{
                            return(
                                <div className="home-cars-bottom-items-item" key={id}>
                                    <img src={car_logo} alt="" />
                                    <h4>{car_name_en}</h4>
                                    <ul className='home-cars-bottom-items-item-options'>
                                        <li>
                                            <img src={speed_logo} alt="" />
                                            <p>{langState==="en"?speed_name_en:langState==="ru"?speed_name_ru:speed_name_hy}</p>
                                        </li>
                                        <li>
                                            <img src={gearbox_logo} alt="" />
                                            <p>{gearbox_name_hy}</p>
                                        </li>
                                        <li>
                                            <img src={person_logo} alt="" />
                                            <p>{langState==="en"?person_name_en:langState==="ru"?person_name_ru:person_name_hy}</p>
                                        </li>
                                        <li>
                                            <img src={fuel_logo} alt="" />
                                            <p>{langState==="en"?fuel_name_en:langState==="ru"?fuel_name_ru:fuel_name_hy}</p>
                                        </li>
                                    </ul>
                                    <div className="home-cars-bottom-items-item-book">
                                        <button onClick={() => dispatch(activate(id))}>{langState==="en"?car_button_en:langState==="ru"?car_button_ru:car_button_hy}</button>
                                        <p>{langState==="en"?price_text_en:langState==="ru"?price_text_ru:price_text_hy}</p>
                                    </div>
                                    {/* - {choice} */}
                                </div>
                            )
                            // -{choice}
                        })}
                    </div>
                </div>
                <div className="popup" style={{display: "flex", gap: "20px"}}>
                    {popupWin.map(({id, active}) => {
                        if(active){

                            console.log(reservData[id-1]);
                            return(
                                reservData.map(({product, name_en, name_hy, name_ru,
                                    car_name, car_img, 
                                    gear_name_hy, gear_name_ru, gear_name_en, gear_about_en, gear_about_ru, gear_about_hy,
                                    engine_name_en, engine_name_hy, engine_name_ru, engine_about_en, engine_about_ru, engine_about_hy,
                                    year_name_en, year_name_hy, year_name_ru, year_about_hy, year_about_ru, year_about_en,
                                    air_name_en, air_name_hy, air_name_ru, air_about_en, air_about_hy, air_about_ru,
                                    number_name_en, number_name_ru, number_name_hy, number_about,
                                    roof_name_en, roof_name_hy, roof_name_ru, roof_about_en, roof_about_hy, roof_about_ru
                                }) => {
                                    if (id === product){
                                        return (
                                            <div  className={`home-cars-popup`} key={id}>
                                                <div className="home-cars-popup-upper">
                                                    <div className='close-popup'>
                                                        <span onClick={() => {
                                                            dispatch(closePopup())
                                                        }}>
                                                            x
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="home-cars-popup-lower">
                                                <div className="home-cars-popup-left">
                                                    <div className="home-cars-popup-left-title">
                                                        <span>
                                                            Free cancellation
                                                        </span>
                                                        <h4>{car_name}</h4>
                                                        <p>Or alternative</p>
                                                    </div>
                                                    <div className="home-cars-popup-left-options">
                                                        <div className="home-cars-popup-left-options-specifications">
                                                            <h2>{langState==="en"?name_en:langState==="ru"?name_ru:name_hy}</h2>
                                                            <div className="home-cars-popup-left-options-specifications-item">
                                                                <h4>{langState==="en"?gear_name_en:langState==="ru"?gear_name_ru:gear_name_hy}</h4>
                                                                <p>{langState==="en"?gear_about_en:langState==="ru"?gear_about_ru:gear_about_hy}</p>
                                                            </div>
                                                            <div className="home-cars-popup-left-options-specifications-item">
                                                                <h4>{langState==="en"?engine_name_en:langState==="ru"?engine_name_ru:engine_name_hy}</h4>
                                                                <p>{langState==="en"?engine_about_en:langState==="ru"?engine_about_ru:engine_about_hy}</p>
                                                            </div>
                                                            <div className="home-cars-popup-left-options-specifications-item">
                                                                <h4>{langState==="en"?year_name_en:langState==="ru"?year_name_ru:year_name_hy}</h4>
                                                                <p>{langState==="en"?year_about_en:langState==="ru"?year_about_ru:year_about_hy}</p>
                                                            </div>
                                                            <div className="home-cars-popup-left-options-specifications-item">
                                                                <h4>{langState==="en"?air_name_en:langState==="ru"?air_name_ru:air_name_hy}</h4>
                                                                <p>{langState==="en"?air_about_en:langState==="ru"?air_about_ru:air_about_hy}</p>
                                                            </div>
                                                            <div className="home-cars-popup-left-options-specifications-item">
                                                                <h4>{langState==="en"?number_name_en:langState==="ru"?number_name_ru:number_name_hy}</h4>
                                                                <p>{number_about}</p>
                                                            </div>
                                                            <div className="home-cars-popup-left-options-specifications-item">
                                                                <h4>{langState==="en"?roof_name_en:langState==="ru"?roof_name_ru:roof_name_hy}</h4>
                                                                <p>{langState==="en"?roof_about_en:langState==="ru"?roof_about_ru:roof_about_hy}</p>
                                                            </div>


                                                        </div>
                                                        <div className="home-cars-popup-left-options-insurance">
                                                            <h2></h2>
                                                            
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-cars-popup-right">
                                                    <img src={car_img} alt="nkar" className='home-cars-popup-right-img'/>
                                                    <h3>{langState==="en" ? "cost" : langState==="ru" ? "расходы" : "արժեքը"}</h3>
                                                    <div className="home-cars-popup-right-options">
                                                        <div className="home-cars-popup-right-options-delivery">

                                                            {costData.map(({del_name_en, del_name_ru, del_name_hy, del_num,
                                                                            drop_name_en, drop_name_ru, drop_name_hy, drop_num,
                                                                            pick_name_en, pick_name_ru, pick_name_hy, pick_num, id}) => {
                                                                return(
                                                                    <div className="home-cars-popup-right-options-delivery-item" key={id}>
                                                                        <div>
                                                                            <h4>{langState==="en"?del_name_en : langState === "ru" ? del_name_ru : del_name_hy}</h4>
                                                                            <p>{del_num}$</p>
                                                                        </div>
                                                                        <div>
                                                                            <h4>{langState==="en"?pick_name_en : langState === "ru" ? pick_name_ru : pick_name_hy}</h4>
                                                                            <p>{pick_num}$</p>
                                                                        </div>
                                                                        <div>
                                                                            <h4>{langState==="en"?drop_name_en : langState === "ru" ? drop_name_ru : drop_name_hy}</h4>
                                                                            <p>{drop_num }$</p>
                                                                        </div>   
                                                                    </div>
                                                                )
                                                            })}

                                                            {/* {CONFIG.homecarsPopupDelivery.map(({id, text,desc}) => {
                                                                return(
                                                                    <div className="home-cars-popup-right-options-delivery-item" key={id}>
                                                                        <h4>{text}</h4>
                                                                        <p>{desc}</p>
                                                                    </div>
                                                                )
                                                            })}  */}
                                                        </div>
                                                        <button className='home-cars-popup-right-options-rent'>{langState==="en"?"Booking":langState==="ru"?"Бронирование":"Ամրագրել"}</button>
                                                    </div>
                                                </div>
                                                </div>
                                                
                                                
                                            </div>
                                        )
                                    }else{
                                        return ""
                                    }
                                })
                            )
                        } else {
                            return ""
                        }
                    })}
                    
                </div>
            </Conatiner>
            
        </div>

    )
}