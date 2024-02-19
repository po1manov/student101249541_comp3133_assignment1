const app = require('./app');

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
