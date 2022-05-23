import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Search = () => {

    const [inputData, setInputData] = useState("");

    const navigate = useNavigate();

    const submitHandler =  (e) => {
       e.preventDefault();
       navigate("/searched/" + inputData, { state : { name : inputData } });
    }

  return (
    <FormStyle onSubmit={submitHandler}>
       <FaSearch />
       <input 
            onChange={ (e) => setInputData(e.target.value)}
            type="text" 
            value={inputData} 
        />
    </FormStyle>
  )
}

const FormStyle = styled.form`
    display: flex;
    justify-content: center;
    align-item: center;
    align-items: center;
    position: relative;
    width: 100%;
    
    input {
        width: 100%;
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        padding: 1rem 3rem;
        outline: none;
        color: white;
        border-radius: 1rem;
    }

    svg {
        position: absolute;
        top: 49%;
        left: 0%;
        transform: translate(100%, -50%);
        color: #fff;
    }
`

export default Search