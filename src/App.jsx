
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Routes ,Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    
      
    </>
  )
}

export default App;
