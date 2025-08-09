import { Logo } from './Logo';
import '../styles/HeaderPage.css';




export function HeaderPage(){
    return(
        <header className="logo-header">
                        <Logo />
                        <h1>Engenharia Necessária</h1>
                    </header>
    );
}
