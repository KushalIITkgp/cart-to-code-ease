
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, ShoppingCart, Home, Phone } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">SmartCart</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg">
              <QrCode size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-around border-t pt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
