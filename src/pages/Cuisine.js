import React, { useState,useEffect } from 'react'
import Styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

const Cuisine = () => {

    const [cuisine, setCuisine] = useState([]);
    const params = useParams();

    // console.log(params);

    const getCuisines = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
        );
        const receips = await data.json();
        setCuisine(receips.results);
    };

    useEffect( () => {
        getCuisines(params.type);
        // console.log(params.type)
    }, [params.type])

  return <Grid
         animate={{ opacity: 1 }}
         initial={{ opacity: 0 }}
         exit={{ opacity: 0 }}
         transition= {{ duration: 0.5 }}
         >
        { cuisine.map( item => {
            return(
                <Link to={"/recipe/" + item.id}>
                    <Card key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Card>
                </Link>
            
            )})
        }
    </Grid>
}

const Grid = Styled(motion.div)`
    display : grid;
    grid-template-columns : repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap : 1rem;
`;

const Card = Styled(motion.div)`
   img {
       width : 100%;
       border-radius : 2rem;
   }
   a {
       text-decoration : none;
   }
   h4 {
       text-align : center;
       padding : 1rem;
   }
`;


export default Cuisine