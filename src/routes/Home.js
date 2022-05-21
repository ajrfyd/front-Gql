import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from 'styled-components';
import Loading from "../components/Loading";
import Movie from "../components/Movie";

const GET_DATAS = gql`
  {
    realAllMovies {
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
    }
  }
`
const Home = () => {
  const { loading, error, data } = useQuery(GET_DATAS);
  console.log(data)
  return (
    <Container>
      <Header>
        <h1>Apollo 2022</h1>
        <h3>I Love GraphQL</h3>
      </Header>
      {
        loading && <Loading />
      }
      {/* {
        !loading && 
        data.realAllMovies && (
          <Movies>
            {
              data.realAllMovies.map(m => <Movie key={m.id} id={m.id} medium_cover_image={m.medium_cover_image}/>)
            }
          </Movies>
        )
      } */}
      <Movies>
        {
          data?.realAllMovies?.map(m => <Movie key={m.id} id={m.id} medium_cover_image={m.medium_cover_image}/>)
        }
      </Movies>
    </Container>
  )
}

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  color: #fff;

  h1 {
    margin: 0;
    padding: 1rem;
  }
  h3 {
    padding: 2rem;
  }
`

const Header = styled.header`
  height: 20%;
  background-color: pink;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 70%;
  position: relative;
  top: -40px;
`