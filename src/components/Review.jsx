import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewForm = ({ productId, productName }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // ✅ new flag

  useEffect(() => {
    const checkIfReviewed = async () => {
      try {
        const res = await axios.get(`https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/reviews/check/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.data.alreadyReviewed) {
          setAlreadyReviewed(true);
        }
      } catch (err) {
        console.error('Review check failed:', err);
        toast.error('Error checking review status');
      } finally {
        setIsChecking(false); // ✅ done checking
      }
    };

    checkIfReviewed();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        'https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/reviews',
        { productId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success('Review submitted successfully ✅');
      setAlreadyReviewed(true); // ✅ update after submit
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review ❌');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Until check is complete, render nothing
  if (isChecking) return null;

  if (alreadyReviewed) {
    return (
      <div className="text-green-600 font-semibold text-sm">
        ✅ You already submitted a review for <strong>{productName}</strong>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
        Leave a Review for <span className="text-indigo-600">{productName}</span>
      </h4>

      <div>
        <label className="block text-sm font-medium dark:text-white">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-24 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium dark:text-white">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
          placeholder="Share your thoughts..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
