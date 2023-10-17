import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [rickCharacters, setRickCharacters] = useState({})
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [pesquisaNome, setPesquisaNome] = useState('')
  const [characterStatus, setCharacterStatus] = useState('')
  const [episodes, setEpisodes] = useState({})

  useEffect(() => {

    const fetchData = async (pesquisaNome, characterStatus) => {
      try {
        let api = `https://rickandmortyapi.com/api/character/`;

        if (pesquisaNome) {
          api += `?name=${pesquisaNome}`
        } if (characterStatus) {
          api += api.includes("?")
            ? `&status=${characterStatus}`
            : `?status=${characterStatus}`;
        }

        let response = await fetch(api)
        const data = await response.json();
        setRickCharacters(data);
        console.log(data);

      } catch (error) {
        console.error('Deu ruim: ', error)
      }
    }

    fetchData(pesquisaNome, characterStatus);


  }, [pesquisaNome, characterStatus])


  //para selecionar um personagem para mostrat detalhes

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  }


  //para pegar cada episodio

  const fetchForEachEpisode = async () => {

    const allEpisodes = [];

    for (let i = 0; i < selectedCharacter.episode.length; i++) {

      const url = selectedCharacter.episode[i];
      const responseEpisodes = await fetch(url);
      const dataEpisodes = await responseEpisodes.json();

      allEpisodes.push(dataEpisodes)
    }

    setEpisodes(allEpisodes);
    console.log(allEpisodes)
  }



  useEffect(() => {
    if (selectedCharacter) {
      fetchForEachEpisode();
    }
  }, [selectedCharacter]);

  return (
    <div className='container'>
      <div className='lista-container'>
        <h1 className='title'>Lista de Personagens</h1>
        <div className='pesquisa-container'>

          <input
            type="text"
            placeholder='Pesquisar por nome'
            value={pesquisaNome}
            onChange={(e) => setPesquisaNome(e.target.value)}
            className='pesquisa'
          />

          <select value={characterStatus} onChange={(e) =>
            setCharacterStatus(e.target.value)} className='pesquisa'>
            <option value="">Todos os Status</option>
            <option value="alive">Vivos</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </select>

        </div>
        <ul className='lista'>
          {Object.values(rickCharacters.results || {}).map((character) => (
            <li key={character.id} onClick={() => handleCharacterClick(character)}
              className='container-characters'>
              <img
                className='characters-img'
                src={character.image}
              />
              <h1 className='nome'>{character.name}</h1>
            </li>
          ))}
        </ul>
      </div>
      <div className='detalhes-container'>
        <h1 className='title'>Detalhes do Personagem</h1>
        {selectedCharacter && (
          <div className='detalhes-box'>
            <img className='detalhes-img' src={selectedCharacter.image} />

            <h1 className='detalhes'> Nome: {selectedCharacter.name}</h1>
            <h1 className='detalhes'> Status: {selectedCharacter.status}</h1>
            <h1 className='detalhes'> Espécie: {selectedCharacter.species}</h1>

            <h1 className='title-episodio'>Episódios</h1>
            <div className='episode-list'>
              {Object.values(episodes).map((episodio) => (
                <li key={episodio.id} className='li' >
                  <h1 className='episodios'>{episodio.episode}, {episodio.name}</h1>
                </li>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>

  )
}

export default App
