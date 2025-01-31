import React, { useState, useEffect } from 'react';
import '../../assets/styles/Header.css';
import logoImage from '../../assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo, smoothScrollToPosition } from '../utils/scrollUtils'; // <--- Make sure this path is correct

const Header = ( { onProjectsClick, aboutMeRef, onContactClick, onCloseSubheader} ) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => {
      const willClose = prevMenuOpen === true;
      const newState = !prevMenuOpen;

      if (willClose) {
        // The hamburger is going from Open to Closed.
        // Let's also close the subheader
        onCloseSubheader();
      }
      return newState;
    });
  };



   const handleAboutClick = () => {
     console.log('About button clicked');
     if (aboutMeRef?.current) {
       const position = aboutMeRef.current.getBoundingClientRect().top + window.pageYOffset - 180;
       console.log('Scrolling to:', position);
       smoothScrollToPosition(position, 500);
     } else {
       console.log('aboutMeRef not found');
     }
   };

   const handleContactClick = () => {
        console.log('About button clicked');
        if (onContactClick?.current) {
          const position = onContactClick.current.getBoundingClientRect().top + window.pageYOffset - 180;
          console.log('Scrolling to:', position);
          smoothScrollToPosition(position, 500);
        } else {
          console.log('aboutMeRef not found');
        }
      };


  const handleHomeClick = () => {
      if (location.pathname === '/') {
        smoothScrollToPosition(0, 500);
      } else {
        navigate('/');
      }
    };

    const handleProjectsClick = () => {
        if (onProjectsClick) {
          onProjectsClick(); // Trigger callback passed from HomePage.js
        }
      };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'navigation-open' : ''}`}>
      <button
        className={`hamburger-menu ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
        <button onClick={handleHomeClick}>
          Home
        </button>

        {/* Call our merged scrolling logic to scroll to #projects-section */}
        <button onClick={handleProjectsClick}>
          Projects
        </button>

        <button onClick={handleAboutClick}>
          About
        </button>
        <button onClick={handleContactClick}>
          Contact
        </button>
      </nav>
    </header>
  );
};

export default Header;
