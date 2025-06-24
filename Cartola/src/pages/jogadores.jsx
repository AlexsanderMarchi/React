import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import './pages.css';
import '../index.css';

function Jogadores() {
  const { idTime } = useParams();
  const [jogadores, setJogadores] = useState({ atletas: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.cartola.globo.com/atletas/mercado/${idTime}`);
      const data = await response.json();
      setJogadores(data);
      console.log(data);
    }

    fetchData();
  }, [idTime]);



  if (!jogadores.atletas) {
    return (
      <div className='container'>
      <img
        className='cartola-logo'
        src='https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png'
        alt='cartola Logo'
      />
      <div className='card-list-na'>
        <ul>
        {Object.values(jogadores.clubes || {}).map((clube) => (
            <h1 className='text-title'>Jogadores do {clube.nome}</h1>
          ))}
        </ul>
      </div>
    </div>
    );
  }


  return (
    <div className='container'>
      <img
        className='cartola-logo'
        src='https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png'
        alt='cartola Logo'
      />
      <div className='card-list'>
        <ul>
          {Object.values(jogadores.clubes || {}).map((clube) => (
            <h1 className='text-title'>Jogadores do {clube.nome}</h1>
          ))}

          {jogadores.atletas.map((atleta) => {
            const fotoUrl = atleta.foto && atleta.foto.replace('FORMATO', '220x220');


            if (fotoUrl) {
              return (
                <li key={atleta.atleta_id} className='container-jogadores'>
                  <img
                    className='jogadores-img'
                    src={fotoUrl}
                  />
                  <h1 className='nome-jogador'>{atleta.nome}</h1>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default Jogadores;


