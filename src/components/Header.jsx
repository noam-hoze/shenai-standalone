import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    UserCircle,
    Home,
    FileText,
    Moon,
    Activity,
    Leaf,
    Wallet,
    Menu,
    Flag,
} from "lucide-react";
import "./Header.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        {
            path: import.meta.env.VITE_BWELL_BASE_URL,
            label: "Home",
            icon: Home,
        },
        {
            path: import.meta.env.VITE_BWELL_BASE_URL + "/reports",
            label: "Reports",
            icon: FileText,
        },
        {
            path: import.meta.env.VITE_BWELL_BASE_URL + "/sleep",
            label: "Sleep",
            icon: Moon,
        },
        {
            path: import.meta.env.VITE_BWELL_BASE_URL + "/activity",
            label: "Activity",
            icon: Activity,
        },
        {
            path: import.meta.env.VITE_BWELL_BASE_URL + "/nutrition",
            label: "Nutrition",
            icon: Leaf,
        },
        {
            path: import.meta.env.VITE_BWELL_BASE_URL + "/goals",
            label: "My Goals",
            icon: Flag,
        },
        {
            path: import.meta.env.VITE_BWELL_BASE_URL + "/wallet",
            label: "Wallet",
            icon: Wallet,
        },
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="header-left">
                    <Link to={import.meta.env.VITE_BWELL_BASE_URL} className="logo">
                        <img
                            src="/lovable-uploads/765ffe1f-7f04-4b14-88a1-feb2561263a2.png"
                            alt="B-Well Logo"
                            className="logo-img"
                        />
                    </Link>

                    <nav className="nav-desktop">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className={`nav-link ${
                                    isActive(link.path) ? "active" : ""
                                }`}
                            >
                                <link.icon className="icon" />
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="header-right">
                    <button
                        className="mobile-menu-button"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="icon" />
                    </button>

                    <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
                        <div className="mobile-menu-content">
                            <div className="mobile-menu-header">
                                <button onClick={() => setIsOpen(false)}>
                                    &times;
                                </button>
                            </div>
                            <nav className="nav-mobile">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`nav-link-mobile ${
                                            isActive(link.path) ? "active" : ""
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <link.icon className="icon" />
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                                <Link
                                    to={
                                        import.meta.env.VITE_BWELL_BASE_URL +
                                        "/profile"
                                    }
                                    className={`nav-link-mobile ${
                                        isActive("/profile") ? "active" : ""
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <UserCircle className="icon" />
                                    <span>Profile</span>
                                </Link>
                            </nav>
                        </div>
                        <div
                            className="mobile-menu-overlay"
                            onClick={() => setIsOpen(false)}
                        ></div>
                    </div>

                    <button
                        className="profile-button"
                        onClick={() =>
                            (window.location.href =
                                import.meta.env.VITE_BWELL_BASE_URL +
                                "/profile")
                        }
                    >
                        <UserCircle className="profile-icon" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
