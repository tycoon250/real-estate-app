import React, { useState, useEffect, useRef } from "react";
import { Upload, AlertCircle, Trash2, X } from "lucide-react";

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchPartners();
  }, [API_URL]);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/contact/partners/all`);
      if (!response.ok) throw new Error("Failed to fetch partners");
      const data = await response.json();
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the file in state
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging logs
    if (!selectedFile) {
      setError("Please select a logo file");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("name", e.target.elements.name.value);
      formData.append("logo", selectedFile);


      const response = await fetch(`${API_URL}/api/contact/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload partner");
      }

      await fetchPartners();
      e.target.reset();  // Reset form inputs, including 'name'
      setSelectedFile(null);  // Clear the selected file
      setImagePreview(null);  // Clear the image preview
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload partner");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (partnerId) => {
    try {
      setDeleteLoading(partnerId);
      const response = await fetch(
        `${API_URL}/api/contact/partner/${partnerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete partner");
      }

      await fetchPartners();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete partner");
    } finally {
      setDeleteLoading(null);
    }
  };

  const resetForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  console.log(partners)
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Partner Management
          </h1>

          {/* Upload Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Add New Partner</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Partner Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter partner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Logo
                </label>
                <div className="relative">
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                      imagePreview
                        ? "border-blue-500"
                        : "border-gray-300 border-dashed"
                    } rounded-lg transition duration-200`}
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={API_URL+'/'+imagePreview}
                          alt="Preview"
                          className="h-32 w-32 object-contain"
                        />
                        <button
                          type="button"
                          onClick={resetForm}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="logo"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="logo"
                              name="logo"
                              type="file"
                              ref={fileInputRef}
                              className="sr-only"
                              required
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition duration-200"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  "Upload Partner"
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Partners Grid */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Current Partners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner._id}
                  className="bg-gray-50 rounded-lg p-6 flex flex-col items-center group relative hover:shadow-md transition duration-200"
                >
                  <img
                    src={`${partner.logo.path}`}
                    alt={`${partner.name} logo`}
                    className="h-24 w-24 object-contain mb-3"
                  />
                  <h3 className="text-lg font-medium text-gray-900 text-center">
                    {partner.name}
                  </h3>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    disabled={deleteLoading === partner._id}
                    className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-200 transition-all duration-200"
                    title="Delete partner"
                  >
                    {deleteLoading === partner._id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent"></div>
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                </div>
              ))}
            </div>
            {partners.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No partners found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Add your first partner using the form above
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
