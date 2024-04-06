import "./HomeBanner.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CONFIG } from '../../../config';


import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";



export const HomeBanner = ({myRef}) => {
  
  const langState = useSelector((state) => state.lang.lang);
  const [data, setData] = useState([])
  
  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(
          "http://51.20.3.117:8000/slayder_list/"
        );
        setData(data);
      } catch (error) {
        console.log(error.message)
      }
    }
    getData();
    console.log(data);
  }, []);


  return (
    <div className='home-banner' >
      <div className="home-banner-overlay"></div>
      <Swiper
        modules={[Navigation, Pagination , A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination = {{clickable: true}}
        loop={true}
        grabCursor
        autoplay={{
          delay: 500000,
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map(({id, name, img, car_name, button_name_hy, button_name_ru, button_name_en}) => {
          return(
            <SwiperSlide key={id}>
              <div className="home-banner-item">
                <div className="home-banner-item-middle">
                  <h1>{name}</h1>
                  <img src={img} alt="" />
                  <p>{car_name}</p>
                  <button onClick={() => {
                    myRef.current.scrollIntoView({
                      behavior: "smooth"
                    })
                  }}>{langState==="hy"? button_name_hy : langState==="ru"? button_name_ru : button_name_en}</button>
                  </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}


