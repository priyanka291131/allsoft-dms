import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const FileDownload = () => {
  // Dummy files with more variety
  const allFiles = [
    { name: "John_Report.pdf", date: "2025-09-20", category: "Personal" },
    { name: "Emily_Invoice.pdf", date: "2025-09-21", category: "Personal" },
    { name: "Tom_Notes.pdf", date: "2025-09-22", category: "Personal" },
    { name: "Accounts_Report.pdf", date: "2025-09-22", category: "Professional" },
    { name: "HR_Policy.pdf", date: "2025-09-23", category: "Professional" },
    { name: "IT_Presentation.pdf", date: "2025-09-24", category: "Professional" },
    { name: "Finance_Budget.pdf", date: "2025-09-24", category: "Professional" },
    { name: "John_PersonalNote.pdf", date: "2025-09-25", category: "Personal" },
    { name: "Emily_Project.pdf", date: "2025-09-25", category: "Personal" },
  ];

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(allFiles);

  useEffect(() => {
    const filtered = allFiles.filter((file) => {
      const fileDate = new Date(file.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesCategory = category ? file.category === category : true;
      const matchesSearch = search
        ? file.name.toLowerCase().startsWith(search.toLowerCase())
        : true;
      const matchesFrom = from ? fileDate >= from : true;
      const matchesTo = to ? fileDate <= to : true;

      return matchesCategory && matchesSearch && matchesFrom && matchesTo;
    });
    setFilteredFiles(filtered);
  }, [category, search, fromDate, toDate]);

  // Function to download all as zip
  const handleDownloadZip = async () => {
    if (filteredFiles.length === 0) return;

    const zip = new JSZip();
    filteredFiles.forEach((file) => {
      // just dummy text, replace with actual file content from backend
      zip.file(file.name, `This is dummy content for ${file.name}`);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "documents.zip");
  };

  return (
    <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
        Download Files
      </h2>

      {/* Filters */}
      <div className="w-full flex flex-col sm:flex-row gap-3 mb-6 justify-between">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>

        <div className="flex-1 flex flex-col">
          <label className="text-sm font-semibold mb-1 text-black">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-sm font-semibold mb-1 text-black">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <input
          type="text"
          placeholder="Search by first letters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      {/* Download All as ZIP */}
      <button
        onClick={handleDownloadZip}
        disabled={filteredFiles.length === 0}
        className={`mb-4 px-6 py-2 rounded font-semibold transition ${
          filteredFiles.length > 0
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Download All as ZIP
      </button>

      {/* Files List */}
      <ul className="w-full max-h-96 overflow-y-auto space-y-2">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <li
              key={file.name}
              className="flex justify-between items-center p-3 bg-white/70 rounded-xl shadow-sm border border-gray-200"
            >
              <span className="text-black text-base">{file.name}</span>
         
            </li>
          ))
        ) : (
          <li className="text-gray-600 text-center p-3">No files found</li>
        )}
      </ul>
    </div>
  );
};

export default FileDownload;
