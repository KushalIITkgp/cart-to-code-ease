
import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  const steps = [
    {
      icon: QrCode,
      title: 'Scan QR Code',
      description: 'Scan the QR code on your shopping trolley to connect your mobile device',
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingCart,
      title: 'Add Items',
      description: 'Add items to your trolley and watch them appear in your digital cart',
      color: 'bg-green-500'
    },
    {
      icon: CreditCard,
      title: 'Checkout',
      description: 'Complete your purchase with our secure payment gateway',
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Enjoy Shopping',
      description: 'Get your digital receipt and enjoy your seamless shopping experience',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">SmartCart</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the future of shopping with our intelligent cart system. 
            Scan, shop, and pay seamlessly!
          </p>
          <Link
            to="/cart"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Your Cart
          </Link>
        </div>

        {/* Steps Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose SmartCart?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <QrCode className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Scan and go! No more waiting in long checkout lines.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <ShoppingCart className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">See your cart update instantly as you shop.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CreditCard className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Multiple payment options with bank-grade security.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
