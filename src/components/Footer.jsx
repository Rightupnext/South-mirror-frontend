import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 text-sm text-center py-4 px-4">
            <div className="max-w-screen-xl mx-auto w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2">
                <span className="text-gray-600">
                    © {currentYear} | Designed & Developed By:&nbsp;
                    <a
                        href="https://www.rightupnextinnovations.com"
                        className="font-bold text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Right UpNext
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
