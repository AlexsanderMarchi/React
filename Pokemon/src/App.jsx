import { useState, useEffect } from 'react';
import './App.css';


function App() {


  const titulo = 'Minha calculadora com Vite'


  const [pokemon, setPokemon] = useState({});
  const [pokemonAtual, setPokemonAtual] = useState(1);






  useEffect(() => {




    const fetchData = async () => {
      const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonAtual}`);


      const data = await reponse.json();
      setPokemon(data);
      console.log(data);
    }


    fetchData();


  }, [pokemonAtual])




  const nextPokemon = () => {
    setPokemonAtual(pokemonAtual + 1);
  }


  const previousPokemon = () => {
    if (pokemonAtual > 1) {
      setPokemonAtual(pokemonAtual - 1);
    }
  }


  return (
    <>
      <div>
        <img src={pokemon.sprites.front_default}></img>
        <h1>{pokemon.name}</h1>
      </div>
      <p></p>


      <button onClick = {nextPokemon}> Proximo </button>
      <button onClick = {previousPokemon}> Anterior </button>
    </>
  )
}


export default App