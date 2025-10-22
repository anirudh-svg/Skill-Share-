import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about teaching and learning new technologies. Love hiking and photography in my free time.',
    profilePicture: 'https://via.placeholder.com/150',
    skillsOffered: [
      { name: 'JavaScript', level: 'Expert' },
      { name: 'React', level: 'Intermediate' },
      { name: 'Node.js', level: 'Expert' }
    ],
    skillsWanted: [
      { name: 'Spanish', level: 'Beginner' },
      { name: 'Photography', level: 'Beginner' }
    ],
    averageRating: 4.8,
    totalRatings: 12
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // In a real app, you would save to the backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="mt-2 text-gray-400">Manage your skills and connect with others</p>
          </div>
          <button 
            onClick={isEditing ? handleSave : toggleEdit}
            className="mt-4 md:mt-0 btn-primary px-6 py-3 rounded-lg"
          >
            {isEditing ? (
              <>
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Profile
              </>
            ) : (
              <>
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="profile-card">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img 
                    src={profile.profilePicture} 
                    alt={profile.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500"
                  />
                  {isEditing && (
                    <button className="absolute bottom-4 right-4 bg-indigo-600 rounded-full p-2 text-white hover:bg-indigo-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <p className="text-gray-400 mt-1">{profile.location}</p>
                <div className="flex items-center justify-center mt-3 bg-gray-800 rounded-full py-1 px-3 w-fit mx-auto">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium text-white">{profile.averageRating}</span>
                  <span className="text-gray-400 ml-1">({profile.totalRatings} reviews)</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-white">About Me</h3>
                </div>
                <p className="text-gray-300">{profile.bio}</p>
              </div>
            </div>
          </div>

          {/* Skills Sections */}
          <div className="lg:col-span-2">
            <div className="profile-card mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white">Skills I Offer</h3>
                </div>
                {isEditing && (
                  <button className="btn-secondary px-4 py-2 rounded-lg flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Skill
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill.name} 
                    <span className="ml-2 px-2 py-0.5 bg-indigo-800 text-indigo-200 rounded-full text-xs">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-bold text-white">Skills I Want to Learn</h3>
                </div>
                {isEditing && (
                  <button className="btn-secondary px-4 py-2 rounded-lg flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Skill
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill, index) => (
                  <span key={index} className="skill-chip bg-purple-900 text-purple-200">
                    {skill.name} 
                    <span className="ml-2 px-2 py-0.5 bg-purple-800 text-purple-200 rounded-full text-xs">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/marketplace" 
                className="btn-primary px-6 py-3 rounded-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Skill Matches
              </Link>
              <Link 
                to="/chat" 
                className="btn-secondary px-6 py-3 rounded-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                View Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;