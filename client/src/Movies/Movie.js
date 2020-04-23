import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  //part 2 for delete
  const deleteItem = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        const deletedMovie = res;
        const newList = props.movieList.filter(
          (movie) => movie.id !== deletedMovie.data
        );
        props.setMovieList([...newList]);
        push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div
        className="update-button"
        onclick={() => push(`/update-movie/${movie.id}`)}
      >
        Update Movie
      </div>

      <div className="delete-button" onClick={deleteItem}>
        Delete Movie
      </div>
    </div>
  );
};

export default Movie;
