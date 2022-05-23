import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styledComponents from 'styled-components'

const Recipes = () => {

    const params = useParams(); 

    const [ detail, setDetail ] = useState({});
    const [ activeTab, setActiveTab ] = useState("instructions");

    const fetchDetail = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        console.log(detailData);
        setDetail(detailData);
    }

    useEffect( () => {
        fetchDetail();
    }, [params.name] )



    return (
        <DetailWrapper>
            <div>
                <h2>{ detail.title }</h2>
                <img src={ detail.image } alt="" />
            </div>
            <Info>
                <div style={{ marginBottom: '2rem', display: 'flex' }}>
                    <Button
                        className={ activeTab === 'instructions' ? 'active' : '' } 
                        onClick={ () => setActiveTab("instructions") }
                    >
                        Instruction
                    </Button>
                    <Button 
                        className={ activeTab === 'ingredients' ? 'active' : '' } 
                        onClick={ () => setActiveTab("ingredients")}
                    >
                        Ingredients
                    </Button>
                </div>
                { activeTab === "instructions" && (
                    <div>
                        <p dangerouslySetInnerHTML={ { __html: detail.summary}}></p>
                        <p dangerouslySetInnerHTML={ { __html: detail.instructions}}></p>
                    </div>
                )}

                { activeTab === "ingredients" && (
                    <ul>
                    { detail.extendedIngredients.map( ingredient => 
                        <li key={ ingredient.id }>{ ingredient.original }</li>
                    )}
                </ul>
                )}
                
                
            </Info>
        </DetailWrapper>
    );
};

const DetailWrapper = styledComponents.div`
    margin-top: 8rem;
    margin-bottom: 5rem;
    display: flex;
    justify-content : space-between;
    align-item: center;


    h2 {
        margin-bottom: 2rem;
    }

    p {
        margin-bottom: 1rem;
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    img {
        width: 350px;
        border-radius: 30px;
    }
`

const Button = styledComponents.div`
   width: 160px;
   padding: 1rem 2rem;
   color: #313131;
   background: white;
   border: 2px solid black;
   margin-right: 2rem;
   font-weight: 600;
   cursor: pointer;
   outline: none;

   &.active {
    background : linear-gradient(35deg, #494949, #313131); 
    color: white;   
  }
`

const Info = styledComponents.div`
   margin-left: 2rem;
    
`

export default Recipes