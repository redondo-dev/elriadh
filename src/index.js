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
  

  
  
  
 
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

