import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';
import '../index.css';

function Home() {
  const [clubesData, setClubesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.cartola.globo.com/clubes`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClubesData(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <img
        className='cartola-logo'
        src='https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png'
        alt='cartola Logo'
      />
      <div className='card-list'>
        <ul>
          {Object.values(clubesData).slice(1).map((clube) => (
            <li key={clube.id} className='container-times'>
              <Link to={`/atletas/${clube.id}`}>
                <img src={clube.escudos['45x45']} />
              </Link>
              <div className='container-texts'>
                <h1 className='nome-time'>{clube.nome}</h1>
                <h1 className='apelido-time'>{clube.apelido}</h1>
              </div>

            </li>

          ))}
        </ul>
      </div>
    </div >
  );
}

export default Home;
