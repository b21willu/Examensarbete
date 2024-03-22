import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/produkter">Produkter</Link></li>
                <li><Link to="/om-oss">Om oss</Link></li>
                <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;