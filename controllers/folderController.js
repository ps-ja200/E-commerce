const fs = require('fs');
const path = require('path');

const accessFolder = (req, res) => {
    const folderPath = path.join(__dirname, '../public'); // Example folder path
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error accessing folder', error: err });
        }
        res.json({ files });
    });
};

module.exports = { accessFolder };
