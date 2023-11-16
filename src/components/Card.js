import React, { useState } from "react";

function Card(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-7 grid grid-cols-1 gap-3">
      <div className="max-w-lg p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.UserName}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.email}
        </p>
        <button
          onClick={openModal}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          See More
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative p-8 bg-white w-full max-w-md rounded-md shadow-md">
              <h1 className="text-2xl font-bold mb-4">
                {props.UserName}'s Details
              </h1>

              <p>Email: {props.email}</p>
              <p>Phone : {props.phone}</p>
              <p>Account creation : {props.creationDate}</p>
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
