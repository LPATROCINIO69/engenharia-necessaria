import imagem from '../../public/pwa-192x192.png';

export function Logo(){
    return(
        <div
            style = {{
                width:100,
                height:100,
                backgroundImage:`url(${imagem})`,
                backgroundSize:'contain',
                backgroundRepeat:'no-repeat',
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                borderRadius: 4,
                userSelect: 'none'
            }}
        ></div>
    );
}