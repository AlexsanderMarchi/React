import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Jogadores from './pages/jogadores';


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/atletas/:idTime', element: <Jogadores />}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)