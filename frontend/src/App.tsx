import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login";
import { CadastroUsuario } from "./pages/CadastroUsuario";
import { Oportunidades } from './pages/Oportunidades';
import { OportunidadeDetalhe } from './pages/OportunidadeDetalhe';

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Rota inicial - tela de Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota para tela de cadastro de usuário */}
        <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        <Route path="/oportunidades" element ={<Oportunidades />} />
        <Route path="/detalhe" element ={<OportunidadeDetalhe />} />
      </Routes>
    </Router>
    
  );
}

export default App;