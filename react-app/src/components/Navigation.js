import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/produkter">Produkter</Link></li>
                <li><Link to="/om-oss">Om oss</Link></li>
                <li><Link to="/kontakt">Kontakt</Link></li>
                <li><Link to="/kundvagn"><FaShoppingCart /></Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;