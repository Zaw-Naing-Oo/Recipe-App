import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

const Searched = () => {

  const params = useParams();

    const [searchedRecipes, setSearchedRecipes] = useState([]);

    const getSearched = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
        );
        const receips = await data.json();
        setSearchedRecipes(receips.results);
    };

    useEffect( () => {
        getSearched(params.search);
        // console.log(params.search)
    }, [params.search])
    
    const location = useLocation();
    const name = location.state.name;

  return( <Grid>
           { searchedRecipes.map( item => {
             return (
               <Link to={'/recipe/' + item.id }>
                  <Card>
                    <img src={ item.image } alt={ item.title}  />
                    <h4>{ item.title }</h4>
                  </Card>
               </Link>
              )
           })}
   
          </Grid>
  )
}


const Grid = Styled.div`
    display : grid;
    grid-template-columns : repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap : 1rem;
`;

const Card = Styled.div`
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

export default Searched