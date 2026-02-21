const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')))

// Handle all routes - serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
