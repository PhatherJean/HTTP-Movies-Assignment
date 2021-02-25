import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useMovieHooks from "../hooks/MovieHooks";

const initialForm = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateMovieForm(props) {
  console.log(props);
  const [
    movieList,
    setMovieList,
    form,
    setForm,
    handleChange,
    handleSubmit,
  ] = useMovieHooks(initialForm);
  const id = props.match.params.id;
  const { push } = props.history;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log({ err }));
  });

  return (
    <div className="form">
      <h3
        style={{
          textAlign: "center",
          fontSize: "28px",
          textShadow: "2px 2px midnightBlue",
          color: "slateGray",
        }}
      >
        Update Movie
      </h3>
      <form className="updateForm">
        <label htmlFor="title">Title: </label>
        <input id="title" onChange={handleChange} value={form.title} />
        <br />
        <label htmlFor="director">Director: </label>
        <input id="director" onChange={handleChange} value={form.director} />
        <br />
        <label htmlFor="metascore">Metascore: </label>
        <input
          id="metascore"
          onChange={handleChange}
          type="number"
          value={form.metascore}
        />
        <br />
        <label htmlFor="stars">Stars: </label>
        <input id="stars" onChange={handleChange} value={form.stars} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
