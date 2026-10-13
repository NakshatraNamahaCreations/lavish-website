import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { FaRegEdit, FaStar } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import ReviewGallery from "./ReviewGallery";
import { getAuthAxios, getAxios } from "../utils/api";
import AuthModal from "./AuthModal";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }
  if (hasHalf) {
    stars.push(
      <span key="half" className="relative">
        <FaStar className="text-yellow-400 opacity-50" />
        <span className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
          <FaStar className="text-yellow-400" />
        </span>
      </span>
    );
  }
  while (stars.length < 5) {
    stars.push(<FaStar key={stars.length} className="text-gray-300" />);
  }
  return <div className="flex">{stars}</div>;
};

const ReviewCard = ({ review }) => (
  <div className="flex md:gap-5 gap-3 max-w-lg md:p-4 rounded-lg mt-10">
    <div>
      <img
      
        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
        alt="avatar"
        className="w-20 h-20 rounded-full"
      />
    </div>
    <div>
      <p className="font-medium">{review?.customer?.fullName || "Anonymous"}</p>
      <p className="text-gray-500">
        Reviewed in{" "}
        {new Date(review?.createdAt).toLocaleString("default", {
          month: "long",
        })}
      </p>
      <div className="flex items-center text-yellow-400 py-3">
        <StarRating rating={Number(review.rating)} />
        <span className="ml-2 text-gray-700 font-semibold">
          {Number(review.rating).toFixed(1)} / 5
        </span>
      </div>
      <p>{review.reviewText}</p>
      {Array.isArray(review.images) &&
        review.images.some((img) => img && img.trim() !== "") && (
          <div className="flex flex-wrap gap-2 mt-2">
            {review.images
              .filter((img) => img && img.trim() !== "")
              .map((img, idx) => (
                <img
                   loading="lazy"
          decoding="async"
                  key={idx}
                  src={img}
                  alt={`review-img-${idx}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
          </div>
        )}
    </div>
  </div>
);

const Review = ({ serviceId,  serviceRating }) => {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [rating, setRating] = useState("");
  const [totalReviews, setTotalReviews] = useState(0);
  const [page, setPage] = useState(1);
  const [imageFiles, setImageFiles] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [submitting, setSubmitting] = useState(false); 

  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  // console.log("Customer ID", customerId);

  useEffect(() => {
    if (serviceId) fetchReviews();
  }, [serviceId, page]);

  const fetchReviews = async () => {
    try {
      const res = await getAxios().get(
        `/reviews/service/${serviceId}?page=${page}&limit=2`
      );
      if (page === 1) {
        setReviews(res.data.reviews || []);
      } else {
        setReviews((prev) => [...prev, ...res.data.reviews]);
      }
      setGalleryImages(res.data.images || []);
      setTotalReviews(res.data.totalReviews || 0);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };
  const handleShowReviewBox = () => {
    if (!customerId) {
      setShowAuthModal(true);
      return;
    } else {
      setShowReviewBox(true);
    }
  };

  const loadMoreReviews = () => setPage((prev) => prev + 1);

  const hasMoreReviews = reviews.length < totalReviews;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleRatingChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setRating("");
      return;
    }
    if (!/^\d*\.?\d*$/.test(value)) return;
    let num = Number(value);
    if (num > 5) num = 5;
    if (num < 0) num = 0;
    setRating(value === "" ? "" : num);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText.trim()) return alert("Please enter a review");

    if (
      rating === "" ||
      isNaN(Number(rating)) ||
      Number(rating) < 0 ||
      Number(rating) > 5
    ) {
      return alert("Please enter a valid rating between 0 and 5");
    }

    const formData = new FormData();
    formData.append("customerId", customerId);
    formData.append("serviceId", serviceId);
    formData.append("rating", rating);
    formData.append("reviewText", reviewText);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    setSubmitting(true);
    try {
      await getAuthAxios().post("/reviews/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setReviewText("");
      setImageFiles([]);
      setRating("");
      setShowReviewBox(false);
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to submit review. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="my-10">
        <h5 className="font-bold text-3xl text-center">Rating</h5>
        <div className="bg-gray-100 w-full md:p-10 py-10 px-4 flex md:gap-14 gap-4 my-4 justify-center">
          <div>
            {serviceRating ? (
              <h6 className="flex items-center gap-1 justify-center text-4xl font-bold">
                {serviceRating}
                <IoIosStar className="text-green-600" />
              </h6>
            ) : null}
            <p className="md:text-2xl text-xl text-gray-400">
              {totalReviews} Ratings
            </p>
          </div>
          <div className="h-20 border border-gray-600" />
          <div onClick={handleShowReviewBox}>
            <p className="flex items-center gap-3 md:text-2xl text-xl cursor-pointer">
              Write a review <FaRegEdit />
            </p>
          </div>
        </div>

        {showReviewBox && (
          <form
            className="flex flex-col md:w-1/2 mx-auto gap-5"
            onSubmit={handleReviewSubmit}
            encType="multipart/form-data"
          >
            <label className="text-lg font-medium">
              Write your Experience with Lavish Events.
            </label>
            <textarea
              rows="4"
              placeholder="Write your review here!"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="p-3 resize-none border border-gray-300 rounded-md"
            ></textarea>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={rating}
                onChange={handleRatingChange}
                className="w-20 p-2 border rounded"
                placeholder="Rating"
              />
              <FaStar className="text-yellow-400 text-2xl" />
              <span className="ml-2 text-gray-600">
                {rating !== "" ? rating : 0} / 5
              </span>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Upload Images (optional):
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mb-2"
              />
              {imageFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {imageFiles.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || reviewText.trim() === ""}
              className={`bg-green-600 p-4 text-white text-2xl uppercase flex items-center justify-center gap-2 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>

      <div className="px-4 md:px-0 border rounded-lg p-2">
        <p className="font-bold md:text-2xl">Reviews</p>
        <div className="flex text-yellow-400 py-2">
          <StarRating rating={5} />
        </div>
        <ReviewGallery images={galleryImages} />
        {reviews.map((r, idx) => (
          <ReviewCard key={idx} review={r} />
        ))}

        {hasMoreReviews && (
          <button
            onClick={loadMoreReviews}
            className="text-primary font-bold flex items-center pt-4"
          >
            Read more reviews <MdArrowRightAlt size={25} />
          </button>
        )}
      </div>

      {showAuthModal && (
        <AuthModal
          setIsModalOpen={setShowAuthModal}
          onLoginSuccess={() => {
            setShowAuthModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Review;
