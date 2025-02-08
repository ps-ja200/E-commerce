const dotenv = require('dotenv');

dotenv.config();

// Ensure all necessary environment variables are defined
// Example variables
process.env.MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri_here';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'your_session_secret_here';
