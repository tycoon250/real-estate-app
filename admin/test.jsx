import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2, X, ExternalLink } from "lucide-react";
import axios from "axios";

function SellerApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const API_URL = `${API_BASE_URL}/api/seller`;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/seller-applications`, {
        withCredentials: true,
      });

      setApplications(response.data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationUpdate = async (userId, status) => {
    setProcessingId(userId);
    try {
      const response = await fetch(`/api/admin/seller-applications/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update application");

      setApplications((prev) => prev.filter((app) => app._id !== userId));
      setSelectedApplication(null);
    } catch (err) {
      setError(err.message || "Failed to update application");
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              Seller Applications
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Review and manage pending seller applications
            </p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="mt-8 text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No pending applications</p>
          </div>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          Applicant Details
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Agency Information
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {applications.map((application) => (
                        <tr
                          key={application._id}
                          onClick={() => setSelectedApplication(application)}
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3">
                            <div className="flex items-center">
                              {application.profileImage ? (
                                <img
                                  src={`${API_BASE_URL}${application.profileImage}`}
                                  alt=""
                                  className="h-10 w-10 rounded-full"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-500 text-sm">
                                    {application.name?.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {application.name}
                                </div>
                                <div className="text-gray-500">
                                  {application.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4">
                            <div className="text-gray-900">
                              {application.sellerApplication.agencyName}
                            </div>
                            <div className="text-gray-500">
                              License:{" "}
                              {application.sellerApplication.licenseNumber}
                            </div>
                            <div className="text-gray-500">
                              {application.sellerApplication.yearsOfExperience}{" "}
                              years exp.
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4">
                            <div className="text-gray-900">
                              {application.phoneNumber}
                            </div>
                            <div className="text-gray-500">
                              {application.address?.city}
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplicationUpdate(
                                    application._id,
                                    "approved"
                                  );
                                }}
                                disabled={!!processingId}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                              >
                                {processingId === application._id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                )}
                                Approve
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplicationUpdate(
                                    application._id,
                                    "rejected"
                                  );
                                }}
                                disabled={!!processingId}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                              >
                                {processingId === application._id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <XCircle className="w-4 h-4 mr-1" />
                                )}
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Application Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedApplication(null)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                      Seller Application Details
                    </h3>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-4">
                        {selectedApplication.profileImage ? (
                          <img
                            src={`${API_BASE_URL}${selectedApplication.profileImage}`}
                            alt=""
                            className="h-16 w-16 rounded-full"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xl">
                              {selectedApplication.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">
                            {selectedApplication.name}
                          </h4>
                          <p className="text-gray-500">
                            {selectedApplication.email}
                          </p>
                          <p className="text-gray-500">
                            {selectedApplication.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Agency Information
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.sellerApplication.agencyName}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          License:{" "}
                          {selectedApplication.sellerApplication.licenseNumber}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            selectedApplication.sellerApplication
                              .yearsOfExperience
                          }{" "}
                          years experience
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Address
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.sellerApplication.officeAddress}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.address?.city}
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.address?.street}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500">
                        Website
                      </h4>
                      <a
                        href={selectedApplication.sellerApplication.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {selectedApplication.sellerApplication.website}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500">
                        Documents
                      </h4>
                      <a
                        href={selectedApplication.sellerApplication.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Document
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">
                        Application Date
                      </h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(
                          selectedApplication.sellerApplication.submittedAt
                        )}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() =>
                          handleApplicationUpdate(
                            selectedApplication._id,
                            "approved"
                          )
                        }
                        disabled={!!processingId}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        {processingId === selectedApplication._id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Approve Application
                      </button>
                      <button
                        onClick={() =>
                          handleApplicationUpdate(
                            selectedApplication._id,
                            "rejected"
                          )
                        }
                        disabled={!!processingId}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        {processingId === selectedApplication._id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}
                        Reject Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerApplication;
