import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Movie = ({ id, medium_cover_image }) => {

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={medium_cover_image}/>
      </Link>
    </Container>
  )
}

export default Movie;

const Container = styled.div`
  height: 380px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16),
  0 3px 6px rgba(0, 0, 0, .23);
  overflow: hidden;
`

const Poster = styled.div`
  background-image: url(${props => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`