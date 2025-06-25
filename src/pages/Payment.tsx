import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';

const Payment = () => {
  const { getTotalPrice, clearCart, items } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [billId, setBillId] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [billItems, setBillItems] = useState<any[]>([]);

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`;
  };

  const handlePayment = () => {
    if (!selectedMethod) return;
    
    // Store the current cart data before clearing
    const currentTotal = getTotalPrice();
    const currentItems = [...items];
    
    // Simulate payment processing
    setTimeout(() => {
      const newBillId = `BILL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setBillId(newBillId);
      setPaidAmount(currentTotal);
      setBillItems(currentItems);
      setPaymentSuccess(true);
      clearCart();
    }, 2000);
  };

  const generateBillData = () => {
    const billData = {
      billId: billId,
      amount: formatPrice(paidAmount),
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
      items: billItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: formatPrice(item.price),
        total: formatPrice(item.price * item.quantity)
      })),
      totalAmount: formatPrice(paidAmount),
      paymentMethod: selectedMethod === 'upi' ? 'UPI Payment' : 'Credit/Debit Card'
    };
    
    return JSON.stringify(billData, null, 2);
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using Google Pay, PhonePe, Paytm, or any UPI app'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay cards accepted'
    }
  ];

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-green-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Bill ID: {billId}</p>
              <p className="text-lg font-semibold text-green-600">Amount Paid: {formatPrice(paidAmount)}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Your Digital Receipt</h3>
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                <QRCodeSVG
                  value={generateBillData()}
                  size={200}
                  className="mx-auto"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan this QR code for your receipt</p>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Payment Gateway</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-lg">
              <span>Total Amount:</span>
              <span className="font-bold text-blue-600">{formatPrice(getTotalPrice())}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
            
            <div className="space-y-4 mb-8">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handlePayment}
              disabled={!selectedMethod}
              className={`w-full py-4 rounded-lg text-lg font-semibold transition-all ${
                selectedMethod
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedMethod ? `Pay ${formatPrice(getTotalPrice())}` : 'Select Payment Method'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
