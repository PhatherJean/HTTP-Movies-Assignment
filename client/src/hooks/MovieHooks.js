import { useState } from "react";

const useMovieHooks = (initialState, submitFunc) => {
  const [movieList, setMovieList] = useState(initialState);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunc();
    console.log("from hooks", form);
  };

  return [movieList, setMovieList, form, setForm, handleChange, handleSubmit];
};
export default useMovieHooks;
