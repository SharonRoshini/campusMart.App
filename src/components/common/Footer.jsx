import React from 'react';

const Footer = () => {
    return (
        <footer
            className="bg-dark text-light mt-auto"
            style={{ padding: '10px 0', fontSize: '0.85rem' }} // Reduced padding and font size
        >
            <div className="container text-center">
                <p className="mb-1">© {new Date().getFullYear()} CampusMart. All rights reserved.</p>
                <div>
                    <a href="/privacy-policy" className="text-light" style={{ marginRight: '10px' }}>
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" className="text-light">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

