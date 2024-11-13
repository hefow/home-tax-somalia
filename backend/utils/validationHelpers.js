/**
 * Validates a phone number string
 * Accepts formats: +252XXX-XXX-XXXX or 252XXXXXXXXX
 */
export function validatePhoneNumber(phone) {
  // Remove any spaces or special characters except + and -
  const cleanPhone = phone.replace(/[^\d+-]/g, '');
  
  // Check if it's a valid Somali phone number
  const somaliaPhoneRegex = /^(\+252|252)?[67]\d{8}$/;
  
  if (!somaliaPhoneRegex.test(cleanPhone)) {
    throw new Error('Please enter a valid Somalia phone number starting with +252 or 252');
  }
  
  return cleanPhone;
}

/**
 * Validates full name
 * Rules: 2-50 chars, letters/spaces only, at least two parts
 */
export function validateFullName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Full name is required');
  }

  const cleanName = name.trim();
  
  if (cleanName.length < 2 || cleanName.length > 50) {
    throw new Error('Full name must be between 2 and 50 characters');
  }

  // Check if contains only letters and spaces
  if (!/^[A-Za-z\s]+$/.test(cleanName)) {
    throw new Error('Full name can only contain letters and spaces');
  }

  // Check if has at least two parts (first and last name)
  const nameParts = cleanName.split(/\s+/);
  if (nameParts.length < 2) {
    throw new Error('Please provide both first and last name');
  }

  return cleanName;
}

/**
 * Validates address
 * Rules: 5-100 chars, must contain numbers and letters
 */
export function validateAddress(address) {
  if (!address || typeof address !== 'string') {
    throw new Error('Address is required');
  }

  const cleanAddress = address.trim();

  if (cleanAddress.length < 5 || cleanAddress.length > 100) {
    throw new Error('Address must be between 5 and 100 characters');
  }

  // Check if address has both numbers and letters
  if (!/\d/.test(cleanAddress) || !/[a-zA-Z]/.test(cleanAddress)) {
    throw new Error('Address must contain both numbers and letters');
  }

  return cleanAddress;
}

/**
 * Validates age
 * Rules: Must be between 18 and 120
 */
export function validateAge(age) {
  const numAge = Number(age);

  if (isNaN(numAge) || !Number.isInteger(numAge)) {
    throw new Error('Age must be a valid number');
  }

  if (numAge < 18) {
    throw new Error('You must be at least 18 years old');
  }

  if (numAge > 120) {
    throw new Error('Please enter a valid age below 120');
  }

  return numAge;
}

/**
 * Validates the entire homeowner form data
 */
export function validateHomeownerForm(formData) {
  const errors = {};
  const validatedData = { ...formData };

  try {
    validatedData.fullName = validateFullName(formData.fullName);
  } catch (error) {
    errors.fullName = error.message;
  }

  try {
    validatedData.phone = validatePhoneNumber(formData.phone);
  } catch (error) {
    errors.phone = error.message;
  }

  try {
    validatedData.address = validateAddress(formData.address);
  } catch (error) {
    errors.address = error.message;
  }

  try {
    validatedData.age = validateAge(formData.age);
  } catch (error) {
    errors.age = error.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    validatedData
  };
}
