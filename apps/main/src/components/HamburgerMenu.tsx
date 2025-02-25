import { useState, useEffect, useRef } from 'react';
import {
    DocumentIcon,
    EnvelopeIcon,
    ChevronRightIcon,
    IdentificationIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(
        null
    );
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setActiveSubmenu(null);
    };

    const toggleSubmenu = (submenu: string) => {
        setActiveSubmenu(
            activeSubmenu === submenu ? null : submenu
        );
    };

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsOpen(false);
                setActiveSubmenu(null);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );
        return () =>
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Navigation menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 z-10">
                    {/* Contact Section */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                toggleSubmenu('contact')
                            }
                            className="w-full px-4 py-2 text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <IdentificationIcon className="w-5 h-5" />
                                Contact
                            </span>
                            <ChevronRightIcon
                                className={`w-4 h-4 transition-transform ${activeSubmenu ===
                                        'contact'
                                        ? 'rotate-90'
                                        : ''
                                    }`}
                            />
                        </button>

                        {activeSubmenu === 'contact' && (
                            <div className="bg-gray-50 dark:bg-gray-900">
                                <a
                                    href="mailto:mail@ryancruz.com"
                                    className="block px-6 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                >
                                    <EnvelopeIcon className="w-5 h-5" />
                                    Email
                                </a>
                                <a
                                    href="/Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-6 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                >
                                    <DocumentIcon className="w-5 h-5" />
                                    Resume
                                </a>
                                <a
                                    href="https://linkedin.com/in/cruzryan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-6 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 72 72"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            className="fill-current"
                                            d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
                                        />
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Tools Section */}
                    <a
                        href="https://tools.ryancruz.com"
                        className="block w-full px-4 py-2 text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <WrenchScrewdriverIcon className="w-5 h-5" />
                        Tools
                    </a>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;