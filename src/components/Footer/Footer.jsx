import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/Container';

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-20 py-10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          
          {/* Left Section: Logo and Copyright */}
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white tracking-tight">BlogApp</span>
            </Link>
            <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} BlogApp. All Rights Reserved.</p>
          </div>

          {/* Right Section: Links */}
          <div className="flex flex-wrap justify-start md:justify-end gap-x-16 gap-y-8 w-full md:w-auto">
            
            {/* Column Template */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold uppercase tracking-wider text-white/50">
                Company
              </h3>
              <ul className="space-y-3">
                <li><Link className="text-white/80 hover:text-white transition-colors duration-200" to="/">Features</Link></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold uppercase tracking-wider text-white/50">
                Support
              </h3>
              <ul className="space-y-3">
                <li><Link className="text-white/80 hover:text-white transition-colors duration-200" to="/">Account</Link></li>
                <li><Link className="text-white/80 hover:text-white transition-colors duration-200" to="/">Help</Link></li>
                <li><Link className="text-white/80 hover:text-white transition-colors duration-200" to="/">Contact Us</Link></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold uppercase tracking-wider text-white/50">
                Legals
              </h3>
              <ul className="space-y-3">
                <li><Link className="text-white/80 hover:text-white transition-colors duration-200" to="/">Terms & Conditions</Link></li>
                <li><Link className="text-white/80 hover:text-white transition-colors duration-200" to="/">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
