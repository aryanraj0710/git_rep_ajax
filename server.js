const express = require('express');
const cors = require('cors');
const { create } = require('xmlbuilder2');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/data', (req, res) => {
    
    const xmlData = create({ version: '1.0' })
      .ele('root')
        .ele('message').txt('Hello from the XML Server!').up()
        .ele('status').txt('success').up()
        .ele('timestamp').txt(new Date().toISOString()).up()
      .end({ prettyPrint: true });

    res.header('Content-Type', 'application/xml');
    res.send(xmlData);
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});