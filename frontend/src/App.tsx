import { Button } from "./components/Button";
import { Input } from "./components/Input";
import {Logo} from "./components/Logo";
import { Login } from "./pages/Login";

function App() {
  return (
    // <div>
    //   <Logo></Logo>
    //   <h1>Bem-vindo ao Sistema de Oportunidades</h1>
    //   <Button>Teste</Button>
    //   <Input
    //       label="E-mail"
    //       type="email"
    //       placeholder="armando.lero@gmail.com"
    //       required
    //     />
    // </div>
    <Login />
  );
}

export default App;