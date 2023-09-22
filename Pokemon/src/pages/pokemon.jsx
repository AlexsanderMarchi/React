import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../index.css';

export default function pokemon() {

    const { idPokemon } = useParams()


    const [pokemon, setPokemon] = useState({});


    useEffect(() => {




        const fetchData = async () => {
            const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);


            const data = await reponse.json();
            setPokemon(data);
            console.log(data);
        }


        fetchData();


    }, [])

    return (
        <div className="pokemons">
            {pokemon && (
                <>  
                    <div className="imagensPokemons">
                        <img src={pokemon.sprites?.front_default}></img>
                        <img src={pokemon.sprites?.back_default}></img>
                    </div>
                    
                    <h1>pokemon: {pokemon.name} </h1>
                    <h1>peso: {pokemon.weight} </h1>
                    <h1>altura: {pokemon.height}  </h1>
                    <h1>experiencia: {pokemon.base_experience}  </h1>
                </>
            )}
            <div>
                <Link to={`/`}>
                    <h1>Voltar</h1>
                </Link>
            </div>


        </div>
    )
}
