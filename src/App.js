import './App.css';
import {Container } from 'react-bootstrap';


import { Routes, Route ,Navigate } from 'react-router-dom';

import Navebar from './components/Nav/Navebar.js';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

function App() {
  const user=JSON.parse(localStorage.getItem('profile'));
  
  return (

      <Container>
        <Navebar />
          <Routes>
            <Route path='/' exact element={<Navigate replace  to="/c/posts" />} ></Route>
            <Route path='/c/posts' exact element={<Home/>}  />
            <Route path='/c/posts/search' exact element={<Home/>}  />
            <Route path='/c/posts/:id' exact element={<PostDetails/>}  />
            <Route path='/c/creators/:name'exact element={<CreatorOrTag />} />
            <Route path='/c/tags/:name'exact element={<CreatorOrTag />} />
            {user?(<Route path='/c/Auth' element={<Home/>}></Route>):<Route path='/c/Auth' element={<Auth/>}></Route> }
          </Routes>
    </Container>
    
    
  );
}

export default App;
