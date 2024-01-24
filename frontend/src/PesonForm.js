// src/components/PersonForm.js

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const PersonForm = () => {
  const [personDetails, setPersonDetails] = useState({
    firstName: "",
    lastName: "",
    idImage: null,
    // Add other relevant fields
  });

  const videoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonDetails({ ...personDetails, [name]: value });
  };

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleSnapshot = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

      const idImage = canvas.toDataURL("image/png");

      setPersonDetails({ ...personDetails, idImage });

      // Stop the video stream and hide the video element
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the Django backend API endpoint
      const response = await axios.post(
        "http://your-django-backend-api/persons/",
        personDetails
      );

      // Handle success, e.g., display a success message or redirect
      console.log("Person details saved successfully:", response.data);

      // Clear the form after successful submission
      setPersonDetails({
        firstName: "",
        lastName: "",
        idImage: null,
        // Clear other fields as well
      });
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error saving person details:", error);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: Stop the video stream when the component is unmounted
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <form
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <label className="block mb-2">
        First Name:
        <input
          type="text"
          name="firstName"
          value={personDetails.firstName}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Last Name:
        <input
          type="text"
          name="lastName"
          value={personDetails.lastName}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={handleCapture}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Camera
        </button>
        <button
          type="button"
          onClick={handleSnapshot}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Capture ID
        </button>
      </div>

      {videoRef.current && (
        <video
          ref={videoRef}
          className="w-full max-w-sm mx-auto mb-4"
          autoPlay
          playsInline
        />
      )}

      {personDetails.idImage && (
        <img
          src={personDetails.idImage}
          alt="Captured ID"
          className="w-full mb-4"
        />
      )}

      {/* Add other input fields as needed */}

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default PersonForm;
