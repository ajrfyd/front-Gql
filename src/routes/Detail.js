import React from "react";
import styled from 'styled-components';
import { useParams, useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const GET_DATA = gql`
    query getMovie($id: Int!) {
      realMovie(id: $id) {
        id
        title
        url
        year
        rating
        runtime
        genres
        summary
        description_full
        small_cover_image
        medium_cover_image
        large_cover_image
        isLiked @client
      } 
      suggestions(id: $id) {
        id
        medium_cover_image
      }
    }
  `

  const goBackHandler = () => navigate(-1)

  const { loading, error, data } = useQuery(GET_DATA, { variables: { id: +id }});
  

  return (
    <Container>
      <Btn onClick={goBackHandler}>Back</Btn>
      <Column>
        <Title>{loading ? <Loading/> : `${data.realMovie.title} ${data.realMovie.isLiked ? '❤️' : '👅'}`}</Title>
        {
          !loading && data.realMovie && (
            <>
              {" "}
              <SubTitle>{data.realMovie.year} {data.realMovie.runtime}Minutes</SubTitle>
              <Desc>{data.realMovie.description_full}</Desc>
            </>
          )
        }
      </Column>
      <Poster bg={data?.realMovie?.medium_cover_image}></Poster>
    </Container>
  )
}

export default Detail; 

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
`
const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`
const SubTitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`

const Desc = styled.p`
  
`

const Poster = styled.div`
  width: 25%;
  background-color: transparent;
  height: 60%;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`

const Btn = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  outline: none;
  padding: .5rem .7rem;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`