import '../src/assets/style/main.scss'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Lobby } from './pages/Lobby'
import { Codeblock } from './pages/Codeblock'
import { AppHeader } from './cmps/AppHedear'
import { AppFooter } from './cmps/AppFooter'


export function App() {
  return (
    <>
      <Router>
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<Lobby/>} />
            <Route path="/codeblock" element={<Codeblock/>} />
          </Routes>
        </main>
        <AppFooter/>
      </Router>
    </>
  )
}

