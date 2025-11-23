import React, { useState } from "react";
import { X, Star } from "lucide-react";
import Button from "../ui/Button";

const ReviewModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, title, comment });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Create Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Overall rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-[#FFA41C] text-[#FFA41C]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Add a headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's most important to know?"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#e77600] focus:border-[#e77600] outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Add a written review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#e77600] focus:border-[#e77600] outline-none resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || rating === 0}
              variant="primary"
              className="w-auto"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
