const express = require('express')
const cors = require('cors')
const app = express()
const blogRoutes = require('./routes/app-routes')

// middlewares
app.use(cors())
app.use(express.json())

app.use('/blog',blogRoutes)

app.all('*', (req, resp) => {
    resp.status(404).send("route does not exists!")
});


app.listen('3000', ()=>{
    console.log('server running on 3000...')
})

