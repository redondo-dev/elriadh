import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';




import {
  createBrowserRouter,
   RouterProvider,
} from "react-router-dom";


import Hadith  from './pages/Hadith';
import Tafsir from './pages/Tafsir';
import Home from './pages/Home';
import Error404 from './components/Error404';
import VideoTypes from './components/videoTypes/VideoTypes';
import Quran from './components/coranlu/Quranlu';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement:<Error404 />,
  },
  
  
  {
    path: "/hadith",
    element:<Hadith/>,
   
  },
  {
    path: "/tafsir",
    element: <Tafsir/>,
   
  },
  {
    path: "/quran",
    element: <Quran/>,
   
  },

  {
    path: "/videos",
    element:<VideoTypes/>,
   
  },
  
  
 
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

