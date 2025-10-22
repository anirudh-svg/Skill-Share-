// Health check utilities for monitoring and diagnostics

const mongoose = require('mongoose');

// Extended health check
const getHealthStatus = async () => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB'
    },
    database: {
      status: 'OK',
      name: 'MongoDB'
    },
    environment: {
      node_version: process.version,
      node_env: process.env.NODE_ENV || 'development',
      platform: process.platform,
      arch: process.arch
    }
  };

  try {
    // Check database connection
    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
      healthCheck.database.status = 'ERROR';
      healthCheck.status = 'ERROR';
    }
    
    // Add database stats if connected
    if (dbState === 1) {
      const dbStats = await mongoose.connection.db.admin().serverStatus();
      healthCheck.database.version = dbStats.version;
      healthCheck.database.connections = dbStats.connections;
    }
  } catch (error) {
    healthCheck.database.status = 'ERROR';
    healthCheck.database.error = error.message;
    healthCheck.status = 'ERROR';
  }

  return healthCheck;
};

module.exports = {
  getHealthStatus
};