import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const submitHandle = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            let result = await fetch('http://localhost:5001/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            result = await result.json();
            if (result.success) {
                localStorage.setItem('user', JSON.stringify(result));
                if (result.user.email === "ayush@gmail.com") {
                    localStorage.setItem('admin', JSON.stringify(result));
                }
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (e) {
            setError(e.message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F2EDE6]">
            <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full lg:w-3/4 xl:w-2/3 mt-20">
                <img
                    className="w-full lg:w-1/2 h-auto rounded-lg"
                    src="one.jpg"
                    alt="logo"
                />
                <div className="w-full p-8 lg:w-1/2">
                    <div className="flex justify-center mb-4">
                        <img
                            className="w-16 h-16 rounded-full"
                            src="T.png"
                            alt="logo"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-[#563113] mb-6">Jiyaji Tailor</h1>
                    {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
                    <form onSubmit={submitHandle} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@company.com"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-600">
                                    I accept the{' '}
                                    <span className="font-medium text-blue-600 hover:underline">Terms and Conditions</span>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-[white] bg-[#563100] rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                        <p className="text-sm font-light text-gray-600 text-center">
                            Don't have an account?{' '}
                            <Link to={'/signup'} className="font-medium text-blue-600 hover:underline">
                                Signup here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
