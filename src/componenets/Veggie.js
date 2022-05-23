import React from 'react'
import { useState, useEffect } from 'react';
import Styled from "styled-components"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const Veggie = () => {

    const [veggie, setVeggie] = useState([]);

    useEffect( () => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem("veggie");
        if(!check) {
          const api = await fetch(
              `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
          );
          const data = await api.json();
          localStorage.setItem("veggie", JSON.stringify(data.recipes));
          // console.log(data)
          // console.log(data.recipes)
          setVeggie(data.recipes)
        } else {
          setVeggie(JSON.parse(check));
        }

    }

  return (
    <div>
        <Wrapper>
            <h3>Vegatarian Picks</h3>
            <Splide options={{ 
                perPage : 3,
                gap : '5rem',
                arrows : false,
                drag  : 'free',
                pagination : false
                }}>
                { veggie.map( recipe => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Link to={ "/recipe/" + recipe.id }>
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
  margin : 2rem 0rem;
`;

const Card = Styled.div`
  min-width : 12rem;
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

export default Veggie

