import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="profile-card">
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
  );
};

export default UserCard;