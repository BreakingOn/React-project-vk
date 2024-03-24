import React, { useState, useEffect } from 'react';

import './ProductModal.css';

const countries = {
    'Россия': ['Мрсква', 'СПБ', 'Новосибирск'],
    'США': ['Вашингтон', 'Майами', 'Лос-Анджелес'],
    'Япония': ['Токио', 'Осака', 'Йокогама']
  };
const ProductModal = ({ isOpen, onClose, onAddProduct, onUpdateProduct, selectedProduct}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    count: '',
    price: '',
    delivery: 'empty',
    country: '',
    city: []
  });
  ;
  const Ajv = require("ajv");
const AjvFormats = require("ajv-formats");
  const ajv = new Ajv();
  AjvFormats(ajv);
 

  
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || '',
        price: selectedProduct.price || '',
        count: selectedProduct.count || '',
        email: selectedProduct.email || '',
        delivery: selectedProduct.delivery || 'Empty',
        country: selectedProduct.country || '',
        city: selectedProduct.city || '',
      }, [selectedProduct]);
    }
  }, [selectedProduct]);
    const handleSelectAllCities = () => {
        setFormData(prevState => ({
            ...prevState,
            city: countries[formData.country]
        }));
    };
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            let updatedCities;
            if (checked) {
                updatedCities = [...formData.city, value];
            } else {
                updatedCities = formData.city.filter(city => city !== value);
            }
            setFormData(prevState => ({
                ...prevState,
                city: updatedCities
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
      
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProduct) {
        const updatedProduct = {
            ...selectedProduct,
            name: formData.name,
            email: formData.email,
            count: formData.count,
            price: formData.price,
            delivery: formData.delivery,
            country: formData.country,
            city: formData.city,
        };

        onUpdateProduct(updatedProduct); 
    } else {
        onAddProduct(formData); 
    }
    
 
     onClose();
     setFormData({
        name: '',
        email: '',
        count: '',
        price: '',
        delivery: 'empty',
        country: '',
        city: []
      });
};
  

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <span onClick={onClose}>&times;</span>
        <h2>Add product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required  />
          </div>
          <div className="form-group">
            <label>Count:</label>
            <input type="number" name="count" value={formData.count} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group delivery-container">
            <div className="form-group">
              <label>Delivery:</label>
              <select name="delivery" value={formData.delivery} onChange={handleChange} required>
                <option value="empty">Empty</option>
                <option value="country">Country</option>
                <option value="city">City</option>
              </select>
            </div>
            {formData.delivery === 'country' && (
              <div className="form-group">
                <label>Country:</label>
                {Object.keys(countries).map(country => (
                  <div key={country}>
                    <input
                      type="radio"
                      name="country"
                      value={country}
                      checked={formData.country === country}
                      onChange={handleChange}
                    />
                    <label>{country}</label>
                  </div>
                ))}
              </div>
            )}
            {formData.delivery === 'city' && (
              <div className="form-group">
                <label>City:</label>
                <button type="button" onClick={handleSelectAllCities}>Select All</button>
                {countries[formData.country].map(city => (
                  <div key={city}>
                    <input
                      type="checkbox"
                      name="city"
                      value={city}
                      checked={formData.city.includes(city)}
                      onChange={handleChange}
                    />
                    <label>{city}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit">{selectedProduct ? 'Update Product' : 'Add Product'}</button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;