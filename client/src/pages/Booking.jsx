import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Booking = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for bookings
  const bookings = {
    upcoming: [
      {
        id: 1,
        with: 'Sarah Miller',
        skill: 'UI/UX Design',
        date: 'Sat, Oct 25',
        time: '2:00 PM - 3:00 PM',
        status: 'confirmed',
        meetingLink: 'https://meet.google.com/we-grow-abc123'
      },
      {
        id: 2,
        with: 'Michael Chen',
        skill: 'Python Basics',
        date: 'Wed, Oct 29',
        time: '10:00 AM - 11:00 AM',
        status: 'pending',
        meetingLink: null
      }
    ],
    past: [
      {
        id: 3,
        with: 'Emma Rodriguez',
        skill: 'Copywriting',
        date: 'Sat, Oct 18',
        time: '1:00 PM - 2:00 PM',
        status: 'completed',
        meetingLink: null
      }
    ]
  };

  const handleAccept = (id) => {
    // In a real app, this would make an API call
    alert(`Accepted booking #${id}`);
  };

  const handleReject = (id) => {
    // In a real app, this would make an API call
    alert(`Rejected booking #${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-indigo-500 text-indigo-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'past'
              ? 'border-b-2 border-indigo-500 text-indigo-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>
      
      {/* Booking List */}
      <div className="space-y-4">
        {bookings[activeTab].length === 0 ? (
          <div className="profile-card text-center py-12">
            <p className="text-gray-400">
              {activeTab === 'upcoming' 
                ? 'You have no upcoming bookings.' 
                : 'You have no past bookings.'}
            </p>
            <Link to="/marketplace" className="btn-primary mt-4 inline-block">
              Find Skill Matches
            </Link>
          </div>
        ) : (
          bookings[activeTab].map(booking => (
            <div key={booking.id} className="profile-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">{booking.skill}</h3>
                  <p className="text-gray-400">with {booking.with}</p>
                  <p className="mt-2">
                    <span className="font-medium">{booking.date}</span> at{' '}
                    <span className="font-medium">{booking.time}</span>
                  </p>
                  
                  {booking.meetingLink && (
                    <a 
                      href={booking.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-indigo-400 hover:text-indigo-300"
                    >
                      Join Meeting
                    </a>
                  )}
                </div>
                
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-900 text-green-200' 
                      : booking.status === 'pending' 
                        ? 'bg-yellow-900 text-yellow-200'
                        : 'bg-gray-700 text-gray-300'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  
                  {booking.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => handleAccept(booking.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleReject(booking.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Booking;