import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initial = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function AddMovie(props) {
  const [newMovie, setNewMovie] = useState(initial);
  const { id } = useParams();
  const { push } = useHistory();

  const changeHandler = (evt) => {
    const val = evt.target.value;

    setNewMovie({ ...newMovie, [evt.target.name]: val });
  };

  const submit = (evt) => {
    evt.preventDefault();

    axios
      .post(`http://localhost:5000/api/movies/`, {
        ...newMovie,
        stars: newMovie.stars.split(","),
      })
      .then((res) => {
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch((err) => {
        console.log(err.response);
      });
    props.setMovieList(newMovie);
  };
  return (
    <div>
      <h1>Add Movie</h1>

      <form className="update-form" onSubmit={submit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={newMovie.title}
          placeholder="Title"
          required={true}
        />
        <div className="spacers" />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={newMovie.director}
          placeholder="Director"
          required={true}
        />
        <div className="spacers" />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          value={newMovie.meatascore}
          placeholder="Metascore"
          required={true}
        />
        <div className="spacers" />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          value={newMovie.stars}
          placeholder="Stars"
          required={true}
        />
        <div className="spacers" />
        <button>Add Your Flick</button>
      </form>
    </div>
  );
}

export default AddMovie;
