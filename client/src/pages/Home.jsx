import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDY1ZGNhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxZTI5M2QiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-white">WE GROW</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 mt-2">
                Together
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100">
              Community Skill Exchange Platform
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link 
                to="/register" 
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Join Community
              </Link>
              <Link 
                to="/login" 
                className="btn-secondary px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Exchange skills and grow together with our community
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="profile-card text-center transform transition duration-500 hover:scale-105">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Create Profile</h3>
              <p className="mt-4 text-gray-300">
                Sign up and create your profile with skills you offer and skills you want to learn.
              </p>
            </div>

            <div className="profile-card text-center transform transition duration-500 hover:scale-105">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Find Matches</h3>
              <p className="mt-4 text-gray-300">
                Discover community members who offer what you want and need what you offer.
              </p>
            </div>

            <div className="profile-card text-center transform transition duration-500 hover:scale-105">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Exchange Skills</h3>
              <p className="mt-4 text-gray-300">
                Connect, schedule sessions, and grow together through peer-to-peer learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Start Growing?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Join thousands of community members exchanging skills and building connections.
            </p>
            <div className="mt-10">
              <Link 
                to="/register" 
                className="btn-primary px-10 py-4 text-lg font-semibold rounded-xl"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;