import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  useEffect(() => {
    fetch(`https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, [id]);

  if (!product) return <p className="text-center dark:text-white">Loading...</p>;

 return (
  <div className="w-full bg-white dark:bg-gray-900 py-10">
    <div className="max-w-6xl mx-auto p-6 dark:text-white">
      
      {/* Product Detail Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={`https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/images/${product.image}`}
          alt={product.name}
          className="w-full h-80 object-cover rounded shadow"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-indigo-600 dark:text-indigo-400 mb-4">PKR{product.price}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

<div className="mt-2">
  <span className={`text-sm font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
    {product.quantity > 0 
      ? `In stock: ${product.quantity} left` 
      : 'Out of stock'}
  </span>
</div>


          <div className="flex items-center space-x-4 mb-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border p-2 w-20 rounded dark:bg-gray-800 dark:border-gray-600"
            />
          <button
  disabled={product.quantity === 0}
  onClick={() => addToCart(product)}
  className={`mt-4 px-4 py-2 rounded text-white font-semibold transition ${
    product.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
  }`}
>
  {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
</button>

          </div>
        </div>
      </div>

      {/* ✅ Reviews section moved inside max-w-6xl */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet for this product.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li
                key={index}
                className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-gray-50 dark:bg-gray-800 shadow"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="text-yellow-500">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

};

export default ProductDetail;
