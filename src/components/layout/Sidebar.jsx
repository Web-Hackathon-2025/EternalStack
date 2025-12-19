import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Shield, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Provider Management', path: '/admin/providers' },
        { icon: Calendar, label: 'Booking History', path: '/admin/bookings' },
        { icon: Shield, label: 'Moderation', path: '/admin/moderation' },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button className="mobile-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    Karigar Admin
                </div>

                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li key={item.path} className="nav-item">
                            <Link
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-footer">
                    <button className="nav-link logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
        </>
    );
};

export default Sidebar;
