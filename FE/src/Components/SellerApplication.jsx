import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import FormStep from "./FormStep";
import FileUpload from "./FileUpload";
import AnimatedLogo from "./AnimatedLogo";
import { validateForm, FormErrors } from "../utils/validation";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const SellerApplication = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;
  const [formData, setFormData] = useState({
    agencyName: "",
    licenseNumber: "",
    yearsOfExperience: "",
    officeAddress: "",
    website: "",
    email: "",
    phone: "",
    document: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()

  // Reset errors when changing steps
  useEffect(() => {
    setErrors({});
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelected = (file) => {
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const validateStep = () => {
    const newErrors = validateForm(formData, step);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps - 1) {
        setStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      setIsSubmitting(true);

      // Simulating an API call
      try {
        const data = new FormData();
        data.append("agencyName", formData.agencyName);
        data.append("licenseNumber", formData.licenseNumber);
        data.append("yearsOfExperience", formData.yearsOfExperience);
        data.append("officeAddress", formData.officeAddress);
        data.append("website", formData.website);
        data.append("email", formData.email);
        data.append("phone", formData.phone);

        // Append the document file only if it exists
        if (formData.document) {
          data.append("document", formData.document);
        }

        const response = await axios.post(
          `${API_URL}/api/seller/apply-seller`,
          data,
          { withCredentials: true }
        );

        if (response) {
          console.log("response:", response);
        }
        // Simulating API response time
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        toast.success("Application submitted successfully!");

        // If you want to reset the form data
        setFormData({
          agencyName: "",
          licenseNumber: "",
          yearsOfExperience: "",
          officeAddress: "",
          website: "",
          email: "",
          phone: "",
          document: null,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(
          "There was a problem submitting your application. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white shadow-elevation"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Application Submitted
        </h2>
        <p className="text-center text-foreground/70 mb-6 max-w-md">
          Thank you for applying to become a seller! We've received your
          application and will review it shortly. You'll receive a notification
          once your application has been processed.
        </p>
        <motion.div
          className="w-full from-orange-500 to-orange-100 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-3"></div>
              <h3 className="font-medium">Application Status</h3>
            </div>
            <p className="mt-2 pl-6 text-sm text-foreground/70">
              Pending review. This typically takes 1-3 business days.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="animated-button w-full"
          >
            Return to Home
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-2xl from-orange-500 to-orange-100 glass-panel overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="p-8">
        <div className="flex flex-col from-orange-500 to-orange-100 items-center mb-8">
          <AnimatedLogo />
          <h1 className="text-2xl sm:text-3xl  font-bold text-foreground text-center">
            Seller Application
          </h1>
          <p className="text-foreground/70 text-center mt-2 max-w-md">
            Complete this form to apply for seller status and start listing your
            properties.
          </p>
        </div>

        <ProgressBar currentStep={step} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          <FormStep isActive={step === 0}>
            <div className="space-y-6">
              <div>
                <label htmlFor="agencyName" className="form-label">
                  Agency Name
                </label>
                <input
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  className={`form-input ${
                    errors.agencyName ? "border-destructive" : ""
                  }`}
                  placeholder="Enter your agency name"
                  value={formData.agencyName}
                  onChange={handleChange}
                />
                {errors.agencyName && (
                  <p className="form-error text-red-500">{errors.agencyName}</p>
                )}
              </div>

              <div>
                <label htmlFor="licenseNumber" className="form-label">
                  License Number
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  className={`form-input ${
                    errors.licenseNumber ? "border-destructive" : ""
                  }`}
                  placeholder="Enter your real estate license number"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
                {errors.licenseNumber && (
                  <p className="text-red-500">{errors.licenseNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="form-label">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  className={`form-input ${
                    errors.yearsOfExperience ? "border-destructive" : ""
                  }`}
                  placeholder="How many years of experience do you have?"
                  min="0"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
                {errors.yearsOfExperience && (
                  <p className="form-error text-red-500">
                    {errors.yearsOfExperience}
                  </p>
                )}
              </div>
            </div>
          </FormStep>

          {/* Step 2: Contact Information */}
          <FormStep isActive={step === 1}>
            <div className="space-y-6">
              <div>
                <label htmlFor="officeAddress" className="form-label">
                  Office Address
                </label>
                <input
                  type="text"
                  id="officeAddress"
                  name="officeAddress"
                  className={`form-input ${
                    errors.officeAddress ? "border-destructive" : ""
                  }`}
                  placeholder="Enter your office address"
                  value={formData.officeAddress}
                  onChange={handleChange}
                />
                {errors.officeAddress && (
                  <p className="form-error text-red-500">
                    {errors.officeAddress}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="form-label">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className={`form-input ${
                    errors.website ? "border-destructive" : ""
                  }`}
                  placeholder="https://youragency.com"
                  value={formData.website}
                  onChange={handleChange}
                />
                {errors.website && (
                  <p className="form-error text-red-500">{errors.website}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="form-label">
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    placeholder="contact@youragency.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="form-error text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${
                      errors.phone ? "border-destructive" : ""
                    }`}
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="form-error text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </FormStep>

          {/* Step 3: Document Upload */}
          <FormStep isActive={step === 2}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Verification Document
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Please upload a document that verifies your real estate
                  license, such as a scan of your license certificate or an
                  official document from your licensing authority.
                </p>

                <FileUpload
                  onFileSelected={handleFileSelected}
                  error={errors.document}
                />
              </div>

              <div className="mt-6 bg-secondary/50 p-4 rounded-lg border border-border">
                <h4 className="text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-2 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Important Note
                </h4>
                <p className="text-xs text-foreground/70 mt-1">
                  By submitting this application, you confirm that all
                  information provided is accurate and complete. Your
                  application will be reviewed within 1-3 business days.
                </p>
              </div>
            </div>
          </FormStep>

          <div className="mt-8 flex justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 rounded-lg text-foreground font-medium bg-secondary hover:bg-secondary/80 transition-all duration-200"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="animated-button"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="animated-button flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <motion.div
        className="bg-gradient-to-tr from-orange-500 to-orange-100 p-4 border-t border-border/50 text-center text-sm text-foreground/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Need help with your application? Contact our support at
        support@example.com
      </motion.div>
    </motion.div>
  );
};

export default SellerApplication;
