// pages/index.js
"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [editableProduct, setEditableProduct] = useState(null);
  const { data: session, status } = useSession(); // Destructuring 'data' and 'status' from useSession()

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session]); // Fetch products only when session changes

  const fetchProducts = () => {
    fetch('/api/product')
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  const handleEdit = (product) => {
    setEditableProduct(product);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/productupdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableProduct),
      });

      if (response.ok) {
        // Product updated successfully, reset editableProduct
        setEditableProduct(null);
        // Refresh product list
        fetchProducts();
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleInputChange = (e, field) => {
    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [field]: e.target.value,
    }));
  };

  // If session is loading, display loading message
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If session is not present, prompt user to log in
  if (!session) {
    return <div>Please login to view the dashboard.</div>;
  }

  // Render dashboard when session exists
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4">
            {editableProduct && editableProduct.id === product.id ? (
              <div>
                <label className='mr-2'>Title: </label>
                <input
                  type="text"
                  value={editableProduct.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                />
                <br />
                <label className='mr-2'>Description:</label>
                <input
                  type="text"
                  value={editableProduct.description}
                  onChange={(e) => handleInputChange(e, 'description')}
                />
                <br />
                <label className='mr-2'>Price:</label>
                <input
                  type="number"
                  value={editableProduct.price}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
                <br />
                <label className='mr-2'>Items in Stock:</label>
                <input
                  type="number"
                  value={editableProduct.itemsInStock}
                  onChange={(e) => handleInputChange(e, 'itemsInStock')}
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                    <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4 cursor-pointer" // Set object-fit to "contain"
            />
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2">Price: ${product.price}</p>
                <p>Items in Stock: {product.itemsInStock}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleEdit(product)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
