import React, { useEffect, useState } from 'react'
import Container from '../../common/container/Container'

import "./HomeServices.scss"
import axios from 'axios'
import { useSelector } from 'react-redux'

export const HomeServices = () => {

  const langState = useSelector((state) => state.lang.lang)

  const [dataService, setDataService] = useState([])
  useEffect(() => {
    async function getData() {
        try {
            const { data } = await axios.get(
                "http://51.20.3.117:8000/advantages_list/"
            );
            setDataService(data);
        } catch (error) {
            console.log(error.message)
        }
    }
    getData();
  }, []);
  console.log(dataService[0]);


  return (
    <div className='home-services'>
      <Container>
        <div className="home-services-title">
          <h2>{langState==="hy"?"Մեր ծառայություններն ու առավելությունները":langState==="ru"?"Наши услуги и преимущества":'Our services and benefits'}</h2>
          <p>{langState==="hy"?"Վարձակալությունը հեշտ և առանց դժվարության դարձնելու համար մենք տրամադրում ենք մի շարք ծառայություններ և առավելություններ: Մենք ձեզ ապահովագրում ենք տարբեր տրանսպորտային միջոցներով և վարձակալության ճկուն պայմաններով:":langState==="ru"?"Мы предоставляем различные услуги и преимущества, чтобы сделать аренду легкой и беспроблемной. Мы предоставим вам различные транспортные средства и гибкие условия аренды.":'We provide a variety of services and benefits to make renting easy and hassle-free. We cover you with a variety of vehicles and flexible rental terms.'}</p>
        </div>
        <div className="home-services-items" >
          {dataService.map(({id, img, ad_name_hy, ad_about_hy}) => {
            return(
              <div className="home-services-items-item" key={id}>
                <img src={img} alt="" key={id}/>
                <h3>{ad_name_hy}</h3>
                <p>{ad_about_hy}</p>
              </div>
                )
              })}
        </div>
      </Container>
    </div>
  )
}
