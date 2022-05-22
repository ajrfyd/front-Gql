import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useMutation, gql, useQuery } from "@apollo/client";

const Movie = ({ id, medium_cover_image, isLiked }) => {
  const LIKE_MOVIE = gql`
    mutation toggleLike($id: Int!, $isLiked: Boolean!) {
      toggleLike(id: $id, isLiked: $isLiked) @client
    }
  `
//   const GET_DATA = gql`
//   query getMovie($id: Int!) {
//     realMovie(id: $id) {
//       id
//       title
//       url
//       year
//       rating
//       runtime
//       genres
//       summary
//       description_full
//       small_cover_image
//       medium_cover_image
//       large_cover_image
//       isLiked @client
//     } 
//   }
// `

//   useQuery(GET_DATA, { variables: { id: +id } });
  const [toggleLike] = useMutation(LIKE_MOVIE, { variables: { id: +id, isLiked }});

  

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={medium_cover_image}/>
      </Link>
      <button onClick={toggleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
    </Container>
  )
}

export default Movie;

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16),
  0 3px 6px rgba(0, 0, 0, .23);
  border-radius: 10px;
  `

const Poster = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background-image: url(${props => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`