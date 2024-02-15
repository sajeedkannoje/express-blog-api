const { createPost } = require('../controller/BlogController')


const route = require('express').Router()

route.get('/:id?', createPost)

route.post('/', (req, resp) => {

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