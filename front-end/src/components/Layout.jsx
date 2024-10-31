// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Menu from './Menu';

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <Menu />
            <main className="flex-grow p-4">
                <Outlet /> 
            </main>
        </div>
    );
}
