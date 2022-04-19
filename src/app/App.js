import Dashboard from './Dashboard'
import Footer from './common/components/Footer'

const copyrightText = '' +
  'All sprite content © Pokémon Database, 2008-2022. Pokémon images & names © 1995-2022 Nintendo/Game Freak.'

function App() {
  return (
    <div className='container-fluid'>
      <Dashboard />
      <div className='row' style={{marginTop: 20}}>
        <Footer copyrightText={copyrightText} />
      </div>
    </div>
  )
}

export default App
