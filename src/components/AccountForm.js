import React, { useState } from "react";
import { updateAccount } from "../http";
const AccountForm = () => {
  const [userFormData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phone: "",
    password: "",
    wantAccount: false,
  });

  const isSignUpEnabled =
    userFormData.fullName.length > 3 &&
    userFormData.emailAddress.length > 0 &&
    userFormData.phone.length > 9 &&
    userFormData.password.length > 5;

  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function addUser() {
    const formData = {
      UserName: userFormData.fullName,
      email: userFormData.emailAddress,
      phone: userFormData.phone,
      password: userFormData.password,
    };

    try {
      const data = JSON.stringify(formData);
      const message = await updateAccount(data);
      console.log("Update successful:", message);
    } catch (error) {
      console.error("Error updating account:", error.message);
    }
  }

  const handleSignUp = () => {
    if (isSignUpEnabled) {
      addUser();
      setShowThankYou(true);

      setFormData({
        fullName: "",
        emailAddress: "",
        phone: "",
        password: "",
        wantAccount: false,
      });
    } else {
      console.error("Please fill in all required fields.");
    }
  };

  const closeThankYou = () => {
    setShowThankYou(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        margin: "20px",
      }}
    >
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              name="fullName"
              placeholder="Jane Doe"
              value={userFormData.fullName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-email-address"
            >
              Email Address
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-email-address"
              type="email"
              name="emailAddress"
              placeholder="name@domain.com"
              value={userFormData.emailAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-email-address"
            >
              Phone Number
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-phone-number"
              type="tel"
              name="phone"
              placeholder="9999192912"
              value={userFormData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-password"
              type="password"
              name="password"
              placeholder="******************"
              value={userFormData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              name="wantAccount"
              checked={userFormData.wantAccount}
              onChange={handleChange}
            />
            <span className="text-sm">Want to have an account?</span>
          </label>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className={`shadow bg-blue-700 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${
                isSignUpEnabled ? "" : "cursor-not-allowed opacity-50"
              }`}
              type="button"
              onClick={handleSignUp}
              disabled={!isSignUpEnabled}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>

      {showThankYou && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="text-xl font-bold mb-3">Thank You!</p>
            <p>Your sign-up was successful.</p>
            <button
              className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
              onClick={closeThankYou}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountForm;
