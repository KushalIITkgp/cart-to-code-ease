
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Start shopping to add items to your cart</p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
          <p className="text-gray-600 mb-8">{getTotalItems()} items in your cart</p>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-semibold">{formatPrice(item.price)} each</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors mt-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-blue-600">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            
            <Link
              to="/payment"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
