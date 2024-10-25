import React from 'react';

const Footer = () => {
    return (
        <footer className="py-3 bg-dark text-light mt-auto">
            <div className="container text-center">
                <p className="mb-0">© {new Date().getFullYear()} CampusMart. All rights reserved.</p>
                <div>
                    <a href="/privacy-policy" className="text-light">Privacy Policy</a> | 
                    <a href="/terms-of-service" className="text-light"> Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
