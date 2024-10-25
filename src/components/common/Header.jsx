import React from 'react';
import logo from './assets/logo.png'; // Update the path as necessary

const Header = () => {
    return (
        <header className="py-3 bg-light">
            <div className="container text-center">
                <img src={logo} alt="CampusMart Logo" style={{ maxHeight: '100px', width: 'auto' }} />
                <h1 className="text-primary">CampusMart</h1>
            </div>
        </header>
    );
};

export default Header;
