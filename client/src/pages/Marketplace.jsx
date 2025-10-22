import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'Sarah Miller',
      location: 'New York, NY',
      profilePicture: 'https://via.placeholder.com/100',
      skillsOffered: [
        { name: 'Python', level: 'Expert' },
        { name: 'Data Science', level: 'Intermediate' }
      ],
      skillsWanted: [
        { name: 'UI/UX Design', level: 'Beginner' }
      ],
      averageRating: 4.9,
      totalRatings: 18
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      profilePicture: 'https://via.placeholder.com/100',
      skillsOffered: [
        { name: 'UI/UX Design', level: 'Expert' },
        { name: 'Figma', level: 'Expert' }
      ],
      skillsWanted: [
        { name: 'Python', level: 'Beginner' }
      ],
      averageRating: 4.7,
      totalRatings: 15
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Austin, TX',
      profilePicture: 'https://via.placeholder.com/100',
      skillsOffered: [
        { name: 'Spanish', level: 'Native' },
        { name: 'Copywriting', level: 'Intermediate' }
      ],
      skillsWanted: [
        { name: 'Digital Marketing', level: 'Beginner' }
      ],
      averageRating: 4.9,
      totalRatings: 22
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Skill Marketplace</h1>
      
      {/* Search and Filters */}
      <div className="profile-card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-gray-300 mb-2">Search</label>
            <input
              type="text"
              id="search"
              className="input-field w-full"
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              id="location"
              className="input-field w-full"
              placeholder="City or state..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="skill" className="block text-gray-300 mb-2">Skill</label>
            <input
              type="text"
              id="skill"
              className="input-field w-full"
              placeholder="Specific skill..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* User Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="profile-card">
            <div className="flex items-center mb-4">
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.location}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm">{user.averageRating} ({user.totalRatings})</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Skills Offered:</h4>
              <div className="flex flex-wrap">
                {user.skillsOffered.map((skill, index) => (
                  <span key={index} className="skill-chip text-xs">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Skills Wanted:</h4>
              <div className="flex flex-wrap">
                {user.skillsWanted.map((skill, index) => (
                  <span key={index} className="skill-chip text-xs bg-purple-900 text-purple-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link to={`/chat/${user.id}`} className="btn-primary flex-1 text-center">
                Chat Now
              </Link>
              <button className="btn-secondary flex-1">
                Request Trade
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;