import React, { useState, useEffect } from "react";

const FileUpload = () => {
  const [category, setCategory] = useState("");
  const [subOptions, setSubOptions] = useState([]);
  const [subSelection, setSubSelection] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);

  const personalNames = ["John", "Tom", "Emily"];
  const professionalDepartments = ["Accounts", "HR", "IT", "Finance"];

  useEffect(() => {
    setAllTags(["Invoice", "Report", "Salary", "Presentation"]);
  }, []);

  useEffect(() => {
    if (category === "Personal") setSubOptions(personalNames);
    else if (category === "Professional") setSubOptions(professionalDepartments);
    else setSubOptions([]);
    setSubSelection("");
  }, [category]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Allowed extensions and MIME types
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

    const fileType = selected.type;
    const fileName = selected.name.toLowerCase();
    const fileExt = fileName.substring(fileName.lastIndexOf("."));

    if (!allowedTypes.includes(fileType) || !allowedExtensions.includes(fileExt)) {
      alert("❌ Only PDF, JPG, JPEG, and PNG files are allowed.");
      e.target.value = ""; // clear the file input
      return;
    }

    setFile(selected);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTag = e.target.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        if (!allTags.includes(newTag)) setAllTags([...allTags, newTag]);
      }
      e.target.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("⚠️ Please select a valid file before uploading.");
      return;
    }
    const formData = {
      date,
      category,
      subSelection,
      tags,
      remarks,
      fileName: file.name,
    };
    console.log("File Upload Data:", formData);
    alert("✅ File uploaded successfully!");
    setDate("");
    setCategory("");
    setSubSelection("");
    setTags([]);
    setRemarks("");
    setFile(null);
  };

  return (
    <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl text-black flex flex-col gap-3">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-900 drop-shadow-md">
        File Upload
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 w-full">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          required
        >
          <option value="">--Select Category--</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>

        <select
          value={subSelection}
          onChange={(e) => setSubSelection(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          required
        >
          <option value="">
            --Select {category === "Personal" ? "Name" : "Department"}--
          </option>
          {subOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Press Enter to add tag"
            onKeyDown={handleAddTag}
            className="w-full p-3 border rounded-lg text-base"
          />
        </div>

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          rows={3}
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full text-base"
          accept=".pdf,.jpg,.jpeg,.png,image/*"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition text-base font-semibold"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
