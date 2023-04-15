const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Add your Express routes here

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});