import React from 'react';

const CartDrawer = ({ isOpen, onClose, cartItems }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end">
      <div className="bg-white w-80 shadow-lg p-4">
        <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
        <ul className="mt-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center py-2">
              <img src={item.image} alt={item.title} className="w-12 h-12 rounded-md" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CartDrawer;
