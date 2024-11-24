import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Lobby } from './pages/Lobby'
import { Codeblock } from './pages/Codeblock'

export function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Lobby/>} />
            <Route path="/codeblock" element={<Codeblock/>} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

