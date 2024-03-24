import React from 'react';
import './ProductModal.css';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null;
    const renderDeliveryInfo = () => {
        if (product.delivery === 'country') {
          return <p><strong>Country:</strong> {product.country !== 'empty' ? product.country : 'N/A'}</p>;
        } else if (product.delivery === 'city') {
          return (
            <div>
              <p><strong>Country:</strong> {product.country !== 'empty' ? product.country : 'N/A'}</p>
              <p><strong>City:</strong> {product.city.length > 0 ? product.city.join(', ') : 'N/A'}</p>
            </div>
          );
        }
      };
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Product Details</h2>
        <div className="product-details">
        <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Email:</strong> {product.email}</p>
          <p><strong>Count:</strong> {product.count}</p>
          <p><strong>Price:</strong> {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</p>
          <p><strong>Delivery:</strong> {product.delivery}</p>
          {renderDeliveryInfo()}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;