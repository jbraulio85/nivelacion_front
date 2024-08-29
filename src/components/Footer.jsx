import { TbWorldWww } from "react-icons/tb"
import logo from '../assets/img/EscudoTransparente.png'

export const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-400 p-4 flex justify-between items-center'>
        <aside className='flex items-center ml-8'>
            <img 
                src={logo} 
                alt="Escudo"
                width="30"
                height="30" 
            />
            <span className='ml-4 flex items-center'>
                <p className='m-0 p-0 leading-none text-base'>
                    {new Date().getFullYear()} Fundación Kinal
                </p>
            </span>
        </aside>
        <nav className='flex items-center mr-8'>
            <a 
                href="https://www.kinal.org.gt/"
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center'
            >
                <TbWorldWww size={30}/>
            </a>
        </nav>
    </footer>
  )
}
