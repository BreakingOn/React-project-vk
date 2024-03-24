import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import ProductModal from './ProductModal';
import EditProductModal from './EditProductModal';
import ProductDetailsModal from './ProductDetailsModal';
import './ProductTable.css'; 

const ProductTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState(useSelector(state => state.products.products));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    
  
      const handleEdit = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setSelectedProduct(productToEdit);
        setIsEditModalOpen(true); 
    };
    const handleUpdateProduct = (updatedProductId, updatedProductData) => {
        const updatedProducts = products.map(product =>
            product.id === updatedProductId ? updatedProductData : product
        );

        setProducts(updatedProducts); 
    };
      const handleSort = (key) => {
        
        if (sortBy === key) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(key);
          setSortOrder('asc');
        }
      };
      

      const getSortClass = (key) => {
        if (key === sortBy) {
          return sortOrder === 'asc' ? 'th-sort-up' : 'th-sort-down';
        }
        return 'th-sort';
      };
      
      const handleAddProduct = (formData) => {
       const newProduct = { id: products.length + 1, ...formData };
        setProducts(prevProducts => [...prevProducts, newProduct]);
      };
    
      const handleDelete = (productId) => {
        setShowConfirmation(true);
        setProductIdToDelete(productId);
      };
      const confirmDelete = () => {
        const updatedProducts = products.filter(product => product.id !== productIdToDelete);
        setProducts(updatedProducts);
        setShowConfirmation(false);
        setProductIdToDelete(null);
    };
    const cancelDelete = () => {
        setShowConfirmation(false);
        setProductIdToDelete(null);
    };
      const handleAddNewClick = () => {
        setIsModalOpen(true); 
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false); 
      };
      const handleOpenDetailsModal = (product) => {
        setSelectedProductDetails(product);
        setIsDetailsModalOpen(true);
      };
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (!sortBy) return 0;
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      
  return (
    <div>
        <SearchBar onAddNewClick={handleAddNewClick} onSearchButtonClick={setSearchQuery} />
      <table className="product-table">
        <thead>
          <tr>
          <th className={getSortClass('name')} onClick={() => handleSort('name')}>
            Name
          </th>
          <th className={getSortClass('price')} onClick={() => handleSort('price')}>
            Price
          </th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product.id}>
                
           <td><a href="#" onClick={() => handleOpenDetailsModal(product)}>{product.name} ({product.count})</a></td>
            <td>{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</td>
            <td>
              <button onClick={() => handleEdit(product.id)} className='btnadd'>Изменить</button>
              <button onClick={() => handleDelete(product.id)} className='btnadd'>Удалить</button>
              {showConfirmation && productIdToDelete === product.id && (
                <div className="confirmation-modal">
                            <p>Вы уверены, что хотите удалить этот товар?</p>
                <button onClick={confirmDelete}>Удалить</button>
                <button onClick={cancelDelete}>Отмена</button>
                </div>
            )}
            </td>
          </tr>
          ))}
        </tbody>
      </table>
       
      <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} onAddProduct={handleAddProduct}/>
      <EditProductModal isEditOpen={isEditModalOpen} onEditClose={() => setIsEditModalOpen(false)} onUpdateProduct={handleUpdateProduct} selectedProduct={selectedProduct}  />
      <ProductDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} product={selectedProductDetails}/>
    </div>
  );
};

export default ProductTable;