import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="w-screen h-18 p-2 flex flex-row items-center justify-between relative z-10">
                <img 
                    src="/logo-mun.svg" 
                    alt="logo municipalidad san nicolas de los arroyos" 
                    className="w-32 h-max" 
                />
                {isOpen ? (
                    <img 
                        src="/close-menu.svg" 
                        alt="cerrar" 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="w-12 h-max cursor-pointer" 
                    />
                ) : (
                    <img 
                        src="/menu.svg" 
                        alt="menu" 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="w-12 h-max cursor-pointer" 
                    />
                )}
            </header>
            <nav className={`fixed top-0 left-0 h-screen w-full bg-white transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full">
                    <Link to="/" className="py-4" onClick={() => setIsOpen(false)}>Inicio</Link>
                    <Link to="/registrations" className="py-4" onClick={() => setIsOpen(false)}>Inscripción a becas deportivas</Link>
                    <Link to="/user/profile" className="py-4" onClick={() => setIsOpen(false)}>Seguimiento de solicitud</Link>
                </div>
            </nav>
        </>
    );
}
