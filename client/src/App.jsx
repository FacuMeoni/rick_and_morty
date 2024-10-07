import './App.css'
import HomePage from './pages/home_page'
import { Routes, Route } from "react-router-dom";
import AuthPage from './pages/auth_page';
import PageNotFound from './pages/page_not_found';
import CharacterDetail from './pages/character_detail';

function App() {

  return (
      <div className="App">
        <Routes>
            <Route exact path='/' element={ <AuthPage/> }/ >
            <Route exact path='/home' element={ <HomePage/> } />
            <Route path='/character/:id' element={ <CharacterDetail/> } />
            <Route path='*' element={ <PageNotFound />} />
        </Routes>
      </div>
  )
}

export default App
