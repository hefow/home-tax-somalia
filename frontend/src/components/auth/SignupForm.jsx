import React, { useState } from 'react';

function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'homeowner'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToCommunication, setAgreeToCommunication] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Use and Privacy Policy');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Sign up now</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="input"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <div className="flex">
            <select className="input w-20 mr-2">
              <option value="+1">+1</option>
              <option value="+252">+252</option>
            </select>
            <input
              type="tel"
              id="phone_number"
              className="input flex-1"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>

        {/* Terms and Communication Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              By creating an account, I agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of use</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="communication"
              className="mt-1"
              checked={agreeToCommunication}
              onChange={(e) => setAgreeToCommunication(e.target.checked)}
            />
            <label htmlFor="communication" className="ml-2 text-sm text-gray-600">
              By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Sign up
        </button>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
