import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct, filterProducts, sortProducts, selectFilteredProducts } from './redux/productSlice';

const Products = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false)

  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!editing){
      const newProduct = {
        id: Math.random()*100,
        name: name,
        price: parseFloat(price),
        description: description,
      };
  
      dispatch(addProduct(newProduct));
  
      setId('');
      setName('');
      setPrice('');
      setDescription('');
    }else{
      const newProduct = {
        id: id,
        name: name,
        price: parseFloat(price),
        description: description,
      };
      console.log(newProduct)
      dispatch(updateProduct(newProduct));

      setId('');
      setName('');
      setPrice('');
      setDescription('');
      setEditing(false)
    }

  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (product) => {
    setEditing(true)
    setId(product.id)
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label>Sort by:</label>
        <select onChange={handleSort}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <input
          type="text"
          placeholder="Filter by name"
          onChange={(e) => dispatch(filterProducts(e.target.value))}
      />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        <input type="number" placeholder="Price" value={price} onChange={handlePriceChange} />
        <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} />
        <button type="submit">{editing?"Update Product":"Add Product"}</button>
      </form>
    </div>
  );
};

export default Products;
