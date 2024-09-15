import React from "react";

const UseValidation = (form, type) => {
  const errors = {};
  if (type === "register") {
    if (!form.Name.trim()) {
      errors.Name = "Name is required.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.Email) {
      errors.Email = "Email is required.";
    } else if (!emailPattern.test(form.Email)) {
      errors.Email = "Invalid email address.";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!form.PhoneNumber) {
      errors.PhoneNumber = "Phone number is required.";
    } else if (!phonePattern.test(form.PhoneNumber)) {
      errors.PhoneNumber = "Invalid phone number.";
    }
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.Email) {
      errors.Email = "Email is required.";
    } else if (!emailPattern.test(form.Email)) {
      errors.Email = "Invalid email address.";
    }

    return errors;
  }
  return errors;
};

export default UseValidation;
