import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initial = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = (props) => {
  const [movieInfo, setMovieInfo] = useState(initial);
  const { id } = useParams();
  const { push } = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovieInfo(res.data);
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.statusText);
      });
  }, [id]);

  const changeHandler = (evt) => {
    const val = evt.target.value;

    setMovieInfo({ ...movieInfo, [evt.target.name]: val });
  };

  const submit = (evt) => {
    evt.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        ...movieInfo,
        stars: movieInfo.stars.split(","),
      })
      .then((res) => {
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch((err) => {
        console.log(err.response);
      });
    props.setMovieList(movieInfo);
  };

  return (
    <div>
      <form className="update-form" onSubmit={submit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={movieInfo.title}
          placeholder="Title"
          required={true}
        />
        <div className="spacers" />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={movieInfo.director}
          placeholder="Director"
          required={true}
        />
        <div className="spacers" />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          value={movieInfo.meatascore}
          placeholder="Metascore"
          required={true}
        />
        <div className="spacers" />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          value={movieInfo.stars}
          placeholder="Stars"
          required={true}
        />
        <div className="spacers" />
        <button>Update Movie</button>
      </form>
    </div>
  );
};
export default UpdateForm;
