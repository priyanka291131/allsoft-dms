import React, { useState } from "react";
import bgImage from "../assets/bg.png";
import FileUpload from "./FileUpload";
import FileDownload from "./FileDownload";
import FileSearch from "./FileSearch"; // Search component
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";


// Dummy files for search functionality
const dummyFiles = [
  { name: "John_Report.pdf", date: "2025-09-20", category: "Personal", tags: ["Report", "Invoice"] },
  { name: "Emily_Invoice.docx", date: "2025-09-21", category: "Personal", tags: ["Invoice"] },
  { name: "Accounts_Report.pdf", date: "2025-09-22", category: "Professional", tags: ["Report"] },
  { name: "HR_Policy.docx", date: "2025-09-23", category: "Professional", tags: ["Policy"] },
  { name: "Finance_Excel.xlsx", date: "2025-09-24", category: "Professional", tags: ["Finance"] },
];


const DashboardPage = () => {
  const navigate = useNavigate(); // add this
  const [activeTab, setActiveTab] = useState("upload");
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [files] = useState(dummyFiles);

  const handleSelectFile = (file) => {
    alert(`Opening file: ${file.name}`);
  };

  const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    localStorage.removeItem("currentUser");

    alert("You have logged out successfully!");

    navigate("/");
  }
};

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Logout Button (Top Right) */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 z-30 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition transform hover:scale-105"
      >
        Logout
      </button>

      {/* Sliding Navbar */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute z-20 top-0 left-0 h-full w-56 bg-white/50 backdrop-blur-md p-6 flex flex-col gap-6 shadow-lg rounded-r-3xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsNavOpen(false)}
              className="self-end mb-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition transform hover:scale-110"
              title="Close Navbar"
            >
              ✕
            </button>

            {/* Navbar Items */}
            <button
              onClick={() => setActiveTab("upload")}
              className={`p-3 rounded-lg text-left font-semibold ${
                activeTab === "upload" ? "bg-blue-600 text-white" : "hover:bg-blue-100"
              }`}
            >
              File Upload
            </button>
            <button
              onClick={() => setActiveTab("download")}
              className={`p-3 rounded-lg text-left font-semibold ${
                activeTab === "download" ? "bg-blue-600 text-white" : "hover:bg-blue-100"
              }`}
            >
              File Download
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`p-3 rounded-lg text-left font-semibold ${
                activeTab === "search" ? "bg-blue-600 text-white" : "hover:bg-blue-100"
              }`}
            >
              Search File
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar Open Button */}
      {!isNavOpen && (
        <button
          onClick={() => setIsNavOpen(true)}
          className="absolute top-6 left-6 z-30 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110"
          title="Open Navbar"
        >
          ☰
        </button>
      )}

      {/* Main Content */}
      <div
        className="flex flex-col justify-start items-center p-8 relative z-10 transition-all duration-300"
        style={{ marginLeft: isNavOpen ? "14rem" : "0" }}
      >
        {/* Top Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white/80 text-center">
          Manage Your Document
        </h1>

        {/* Animated Card */}
        <motion.div
          key={activeTab}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/50 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl flex justify-center"
        >
          <div className="w-full flex justify-center">
            {activeTab === "upload" && <FileUpload />}
            {activeTab === "download" && <FileDownload />}
            {activeTab === "search" && (
              <FileSearch files={files} onSelectFile={handleSelectFile} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
