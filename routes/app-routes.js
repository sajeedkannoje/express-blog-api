const route = require('express').Router()

route.get('/:id?', (req, resp) => {

    resp.status(200).send("ok")
})

route.post('/', (req, resp) => {

    // create a new post
    resp.status(200).send("ok")
})

route.put('/', (req, resp) => {
    // update the post
    resp.status(200).send("ok")
})


route.delete('/', (req, resp) => {
    // delete the post
    resp.status(200).send("ok")
})

module.exports = route