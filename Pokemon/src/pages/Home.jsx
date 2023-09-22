import { Link } from "react-router-dom";
import '../index.css';
import { useState, useEffect } from 'react';

export default function Home() {

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
        <div className="pokemons">
            <h1>Pokemons</h1>
            <div >
                
                <>
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <div>

                            <img src={pokemon.sprites?.front_default}></img>
                            <h1>{pokemon.name}</h1>
                        </div>
                        <p></p>
                    </Link>
                </>




            </div>

            <div >
                <button className="botoes" onClick={previousPokemon}> Anterior </button>
                <button className="botoes" onClick={nextPokemon}> Proximo </button>
            </div>

        </div>
    )
}

// 