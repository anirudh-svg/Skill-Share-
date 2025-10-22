// Format date to relative time
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return date.toLocaleDateString();
};

// Format date for booking display
export const formatBookingDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Format time for booking display
export const formatBookingTime = (startTime, endTime) => {
  return `${startTime} - ${endTime}`;
};

// Generate meeting link
export const generateMeetingLink = () => {
  return `https://meet.google.com/we-grow-${Math.random().toString(36).substr(2, 8)}`;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get skill level color
export const getSkillLevelColor = (level) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-900 text-green-200';
    case 'Intermediate':
      return 'bg-yellow-900 text-yellow-200';
    case 'Expert':
      return 'bg-red-900 text-red-200';
    default:
      return 'bg-gray-700 text-gray-300';
  }
};