import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="py-4 sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Logo width="50px" />
            <span className="text-xl font-bold text-white tracking-tight">BlogApp</span>
          </div>
          
          {/* Navigation Links */}
          <ul className="flex items-center gap-x-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        isActive 
                        ? 'text-black bg-white' // Active link: solid white background, black text
                        : 'text-white/70 hover:bg-white/10 hover:text-white' // Inactive link: semi-transparent text, subtle hover
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

