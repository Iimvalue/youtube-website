import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    if (loginError) {
      setLoginError("");
    }
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .get("https://6823b82b65ba05803397b364.mockapi.io/users")
        .then((res) => {
          const users = res.data;
          const user = users.find(
            (user) =>
              user.username == formData.username &&
              user.password == formData.password
          );

          if (user) {
            localStorage.setItem("username", user.username);
            localStorage.setItem("id", user.id);

            navigate("/");
          } else {
            setLoginError("Invalid email or password");
          }
        })
        .catch((error) => {
          setLoginError("Login failed. Please try again later.");
          console.error("Login error:", error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-4 font-sans">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.edigitalagency.com.au%2Fwp-content%2Fuploads%2FYoutube-logo-white-png.png&f=1&nofb=1&ipt=3af43a836c2e4a50db65e488118baa2a664242d6bbe1a37c6f219c57378a05ad"
        alt="youtube"
        width={230}
        className="mb-3"
      />

      <div className="bg-[#212121] rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Sign in</h2>
          <p className="text-gray-400 mb-6">to continue to YouTube</p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-md">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#121212] text-white rounded-md border ${
                  errors.name ? "border-red-500" : "border-[#303030]"
                } focus:outline-none focus:border-[#3da6ff]`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#121212] text-white rounded-md border ${
                  errors.password ? "border-red-500" : "border-[#303030]"
                } focus:outline-none focus:border-[#3da6ff]`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400"
              >
                {formData.showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-[#3da6ff] hover:text-[#2d96ef] text-sm"
              >
                Forgot password?
              </a>
            </div>

            <div className="flex justify-between mt-6">
              <Link
                to={"/register"}
                className="text-[#3da6ff] hover:text-[#2d96ef] font-medium py-2 px-4 rounded"
              >
                Create account
              </Link>
              <button
                type="submit"
                className="bg-[#3da6ff] hover:bg-[#2d96ef] text-black font-medium py-2 px-6 rounded transition duration-300"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
