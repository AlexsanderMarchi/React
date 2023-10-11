import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [rickCharacters, setRickCharacters] = useState({})
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [pesquisaNome, setPesquisaNome] = useState('')
  const [characterStatus, setCharacterStatus] = useState('')

  useEffect(() => {

    const fetchData = async () => {
      try {
        let api = `https://rickandmortyapi.com/api/character/`;

        if (pesquisaNome) {
          api += `?name=${pesquisaNome}`
        } else if (characterStatus) {
          api += `?status=${characterStatus}`
        }

        let reponse = await fetch(api)
        const data = await reponse.json();
        setRickCharacters(data);
        console.log(data);

      } catch (error) {
        console.error('Deu ruim: ', error)
      }
    }

    fetchData();


  }, [pesquisaNome, characterStatus])

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  }

  return (
    <div className='container'>
      <div className='lista-container'>
        <h1>Lista de Personagens</h1>
        <div className='pesquisa-container'>

          <div>
            <input
              type="text"
              placeholder='Pesquisar por nome'
              value={pesquisaNome}
              onChange={(e) => setPesquisaNome(e.target.value)}
            />
            <button >Pesquisar</button>
          </div>

          <select value={characterStatus} onChange={(e) =>
            setCharacterStatus(e.target.value)}>
            <option value="">Todos os Status</option>
            <option value="alive">Vivos</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </select>

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
