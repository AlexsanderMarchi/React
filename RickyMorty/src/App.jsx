import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [rickCharacters, setRickCharacters] = useState({})
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [pesquisaNome, setPesquisaNome] = useState('')
  const [resultadoNome, setResultadoNome] = useState('')

  useEffect(() => {

    const fetchData = async () => {
      const reponse = await fetch(`https://rickandmortyapi.com/api/character`);

      if(pesquisaNome){
        reponse += `?name=${pesquisaNome}`
      }else if(pesquisaNome){
        reponse += `?status=${resultadoNome}`
      }

      const data = await reponse.json();
      setRickCharacters(data);
      console.log(data);
    }


    fetchData();


  }, [pesquisaNome, resultadoNome])

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  }

  return (
    <div className='container'>
      <div className='lista-container'>
        <h1>Lista de Personagens</h1>
        <div>

          <input 
          type="text"
          placeholder='Pesquisar por nome' 
          value={pesquisaNome}
          onChange={(e)=> setPesquisaNome(e.target.value)}
          />

          <button>Pesquisar</button>
        </div>
        {Object.values(rickCharacters.results || {}).map((character) => (
          <li key={character.id} className='container-characters'>
            <img
              className='characters-img'
              src={character.image}
              onClick={() => handleCharacterClick(character)}
            />
            <h1 className='nome'>{character.name}</h1>
          </li>
        ))}
      </div>
      <div className='detalhes-container'>
        <h1>Detalhes do Personagem</h1>
        {selectedCharacter && (
          <div className='details'>
            <img className='characters-img' src={selectedCharacter.image} />
            <h1 className='characters-img'> Nome: {selectedCharacter.name}</h1>
            <h1 className='characters-img'> Status: {selectedCharacter.status}</h1>
            <h1 className='characters-img'> Espécie: {selectedCharacter.species}</h1>

          </div>
        )}
      </div>
    </div>

  )
}

export default App
