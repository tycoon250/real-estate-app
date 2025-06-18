export const validateForm = (values, step) => {
  const errors = {};

  switch (step) {
    case 0: // Basic Information
      if (!values.agencyName?.trim()) {
        errors.agencyName = "Agency name is required";
      } else if (values.agencyName.length < 3) {
        errors.agencyName = "Agency name must be at least 3 characters";
      }

      if (!values.licenseNumber?.trim()) {
        errors.licenseNumber = "License number is required";
      }

      if (!values.yearsOfExperience) {
        errors.yearsOfExperience = "Years of experience is required";
      } else if (
        isNaN(Number(values.yearsOfExperience)) ||
        Number(values.yearsOfExperience) < 0
      ) {
        errors.yearsOfExperience = "Please enter a valid number";
      }
      break;

    case 1: // Contact Information
      if (!values.officeAddress?.trim()) {
        errors.officeAddress = "Office address is required";
      }

      if (values.website && !isValidUrl(values.website)) {
        errors.website = "Please enter a valid website URL";
      }

      if (!values.email?.trim()) {
        errors.email = "Email is required";
      } else if (!isValidEmail(values.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!values.phone?.trim()) {
        errors.phone = "Phone number is required";
      }
      break;

    case 2: // Document Upload
      if (!values.document) {
        errors.document = "Please upload your verification document";
      }
      break;
  }

  return errors;
};

export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
