import React, { useEffect, useState } from 'react'
import "./Header.scss"
import Container from "../common/container/Container"
import { BsCurrencyExchange } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import flagArm from "../../assets/header/languages/armenia.png"
import flagUsa from "../../assets/header/languages/united-states.png"
import flagRu from "../../assets/header/languages/russia.png"

import { CONFIG } from '../../config'
import axios from 'axios'
import env from "react-dotenv";
import { useDispatch, useSelector } from 'react-redux';
import { selectEn, selectHy, selectRu } from '../../redux/slices/LangSlice';

export const Header = () => {
  const [change, setChange] = useState(false)
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false)



  // const [data, setData] = useState([])
  const [lang, setLang] = useState("hy")
  
  
  const langState = useSelector((state) => state.lang.lang)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (lang === "en") {
      dispatch(selectEn())
    } else if (lang === "ru") {
      dispatch(selectRu())
    } else {
      dispatch(selectHy())
    }
  }, [lang]);

  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(
          "http://16.171.38.63:8000/header_list/"
        );
        setData(data);
      } catch (error) {
        console.log(error.message)
      }
    }
    getData();
    console.log(data);
  }, []);

  
  function addNav(){
    let nav = document.querySelector(".nav")
    let language = document.querySelector(".language")
    nav.style.display= (nav.style.display == "block") ? "none" : "block"
    language.style.display= (language.style.display == "flex") ? "none" : "flex";
    // if()
  }
  
    // useEffect(() => {
    //   // Fetch data1
    //   axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //     .then(response => {
    //       setData1(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data from API 1:', error);
    //     });
  
    //     console.log(setData1);
    //   }, []);

  


  

  
  

  return (
    <header className='header'>
      <Container>
        {data.map(({id, logo, name,
          page1_hy,page1_ru, page1_en, 
          page2_hy,page2_en,page2_ru, 
          page3_hy, page3_en, page3_ru,  
          page4_hy, page4_en, page4_ru,
          language_logo, currency_logo, search_logo ,search_hy}) => {
            return(
              <div className="row" key={id}>
                <div className="logo">
                  <img src={logo} alt="" />
                  <p>{name}</p>
                </div>
                <ul className='nav'>
                  <li>{langState==="hy"?page1_hy:langState==="en"?page1_en:page1_ru}</li>
                  <li>{langState==="hy"?page2_hy:langState==="en"?page2_en:page2_ru}</li>
                  <li>{langState==="hy"?page3_hy:langState==="en"?page3_en:page3_ru}</li>
                  <li>{langState==="hy"?page4_hy:langState==="en"?page4_en:page4_ru}</li>
                </ul>
                {/* <div className="options">
                  <div className="options-search">
                    <img src={search_logo} alt="" />
                    <span>{search_hy}</span>
                  </div>
                  <div className="options-currency">
                  <img src={currency_logo} alt=""/>
                    <p>AMD</p>
                    <FaChevronDown />
                  </div>
                  <div className="options-language">
                    <select onChange={(e) => {
                      const selectedLang = e.target.value
                      setLang(selectedLang)
                    }}>
                      <option value="hy"><img src={flagArm} alt="hy" /></option>
                      <option value="en"><img src={flagUsa} alt="en" /></option>
                      <option value="ru"><img src={flagRu} alt="ru" /></option>
                    </select>
                  </div>
                </div> */}
                <div className="language">
                  <img src={flagArm} alt="" onClick={() => {
                    setLang("hy")
                  }}/>
                  <img src={flagUsa} alt="" onClick={() => {
                    setLang("en")
                  }}/>
                  <img src={flagRu} alt="" onClick={() => {
                    setLang("ru")
                  }}/>
                </div>
                <div className="burger" onClick={() => {
                  addNav()
                }}>
                  <RxHamburgerMenu />
                  {/* <span></span> */}
                </div>
              </div>
            )
        })}
      </Container>
    </header>
  )
}
