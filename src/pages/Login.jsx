import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Redux/thunks/authThunk';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: 'Tigist',
    password: 'Tigist@1234',
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { username, password } = formData;
    dispatch(getUser({ username, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Login failed:', error);
        navigate('/login');
      });
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="hidden md:block w-[60%]">
        <img src="./watch.png" alt="beacon image" className="w-full object-contain h-[90%]" />
      </div>

      <div className="w-full md:w-[30%] h-full bg-white flex items-center">
        <div className="w-full px-8 md:px-10 py-3">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign up</h1>
          <p className="text-gray-500 mb-8">Welcome Back.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-500 mb-2">
                Username
              </label>
              <input
                type="username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="abebe"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200  focus:outline-none  focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/60 text-white font-medium py-3 px-4 rounded-xl transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
