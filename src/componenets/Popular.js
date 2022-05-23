import React from 'react'
import { useState, useEffect } from 'react';
import Styled from "styled-components"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const Popular = () => {

    const [popular, setPopular] = useState([]);

    useEffect( () => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem("popular");
        if(!check) {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
            );
            const data = await api.json();
            localStorage.setItem("popular", JSON.stringify(data.recipes));
            // console.log(data)
            // console.log(data.recipes)
            setPopular(data.recipes)
        } else {
            setPopular(JSON.parse(check));
        }

    }

  return (
    <div>
        <Wrapper>
            <h3>Popular Pinks</h3>
            <Splide options={{ 
                perPage : 4,
                gap : '5rem',
                arrows : false,
                drag  : 'free',
                pagination : false
                }}>
                { popular.map( recipe => {
                    return (
                        <SplideSlide key={recipe.id}>
                            {/* Each Card will be link card */}
                           <Link to={"/recipe/" + recipe.id } >
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient /> 
                                </Card>
                           </Link>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </Wrapper>
    </div>
  )
}

const Wrapper = Styled.div`
  margin : 4rem 0rem;
`;

const Card = Styled.div`
  min-height : 18rem;
  border-radius : 2rem; 
  overflow : hidden;
  position : relative;

  img {
      border-radius : 2rem; 
      position: absolute;
      width: 100%;
      left: 0;
      height: 100%;
      object-fit: cover;
  }

  p {
    transform: translate(-50%, 0);
    font-size: 1rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 10;
    bottom: 0%;
    width: 100%;
    left: 50%;
    height: 40%;
    font-weight: 600;
    color: white;
}
  }

`; 

const Gradient = Styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular

