import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [moviesList, setMoviesList] = useState({})
  const [nameMovie, setNameMovie] = useState("")
  const [movie, setMovie] = useState('')

  useEffect(() => {

    const fetchData = async () => {

      if (movie) {
        const reponse = await fetch(`http://www.omdbapi.com/?apikey=e8e0ffb8&t=${movie}`);
        const data = await reponse.json();
        setMoviesList(data);
        console.log(data);
      }

    }

    fetchData();

  }, [movie])

  const buscarFilme = () => {
    setMovie(nameMovie);
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <div>
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={nameMovie}
          onChange={(e) => setNameMovie(e.target.value)}
        />
        <button onClick={buscarFilme}>Pesquisar</button>
      </div>
      {moviesList.Title && (
        <div>
          <h2>Título: {moviesList.Title}</h2>
          <p>Ano: {moviesList.Year}</p>
          <p>Gênero: {moviesList.Genre}</p>
          <p>Classificação: {moviesList.Rated}</p>
          <p>Descrição: {moviesList.Plot}</p>
          <img src={moviesList.Poster}></img>
        </div>
      )}
    </div>
  );
}

export default App
