import React, { useState, useEffect } from "react";

const FileSearch = ({ onSelectFile }) => {
  // Dummy data
  const dummyFiles = [
    {
      name: "Resume.pdf",
      category: "Professional",
      tags: ["cv", "job"],
      date: "2025-01-12",
    },
    {
      name: "Project_Report.pdf",
      category: "Professional",
      tags: ["report", "project"],
      date: "2025-02-08",
    },
    {
      name: "Birthday_Photos.pdf",
      category: "Personal",
      tags: ["birthday", "family"],
      date: "2025-03-15",
    },
    {
      name: "Travel_Plan.pdf",
      category: "Personal",
      tags: ["travel", "plan"],
      date: "2025-04-20",
    },
    {
      name: "Invoice_March.pdf",
      category: "Professional",
      tags: ["invoice", "billing"],
      date: "2025-03-05",
    },
    {
      name: "Notes.pdf",
      category: "Personal",
      tags: ["ideas", "notes"],
      date: "2025-01-25",
    },
  ];

  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(dummyFiles);

  // Filter files whenever inputs change
  useEffect(() => {
    const filtered = dummyFiles.filter((file) => {
      const fileDate = new Date(file.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesCategory = category ? file.category === category : true;

      // ✅ Search both by added tags AND current input
      const matchesTags =
        tags.length > 0
          ? tags.every((t) => file.tags?.includes(t))
          : true;

      const matchesInput =
        tagInput.trim() !== ""
          ? file.name.toLowerCase().startsWith(tagInput.toLowerCase()) ||
            file.tags.some((t) =>
              t.toLowerCase().startsWith(tagInput.toLowerCase())
            )
          : true;

      const matchesFrom = from ? fileDate >= from : true;
      const matchesTo = to ? fileDate <= to : true;

      return (
        matchesCategory &&
        matchesTags &&
        matchesInput &&
        matchesFrom &&
        matchesTo
      );
    });

    setFilteredFiles(filtered);
  }, [category, tags, tagInput, fromDate, toDate]);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
      e.preventDefault();
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-center">
        Search Files
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
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
          <label className="text-sm font-semibold mb-1 text-black">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-sm font-semibold mb-1 text-black">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <input
          type="text"
          placeholder="Search or press Enter to add tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="flex-1 p-2 border rounded"
        />
      </div>

      {/* Tags display */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-300"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag} ✕
          </span>
        ))}
      </div>

      {/* Results */}
      <ul className="space-y-2 max-h-80 overflow-y-auto">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <li
              key={file.name}
              className="flex justify-between items-center p-3 bg-white/70 rounded-xl shadow-sm border border-gray-200"
            >
              <span className="text-black text-base">{file.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onSelectFile?.(file)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Open
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                  Download
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-600 text-center p-3">No files found</li>
        )}
      </ul>
    </div>
  );
};

export default FileSearch;
