const express = require('express')
const router = express.Router()

const post = require('../models/post')

//POST (create data)
router.post('/', async(req,res)=>{
    //console.log(req.body)

    const postData = new post({
        user: req.body.user,
        title: req.body.title,
        text: req.body.text,
        hashtag: req.body.hashtag,
        location: req.body.location,
        url:req.body.url
    })
    // try to insert
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }

})

// GET 1 (Read)
router.get('/', async(req,res)=>{
    try{
        const getPosts = await post.find()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }

})

// GET 2 (Read)
router.get('/:postId', async(req,res)=>{
    try{
        const getPostByID = await post.findById(req.params.postId)
        res.send(getPostByID)
    }catch(err){
        res.send({message:err})
    }

})

// Patch (Update)
router.patch('/:postId', async(req,res)=>{
    try{
        const updatePostById = await post.updateOne(
            {_id:req.params.postId},
            {
                $set:{
                    user: req.body.user,
                    title: req.body.title,
                    text: req.body.text,
                    hashtag: req.body.hashtag,
                    location: req.body.location,
                    url:req.body.url
                }
            }
        )
        res.send(updatePostById)

    } catch(err){
        res.send({message:err})
    }
})

// DELETE (delete)

router.delete('/:postId',async(req,res)=>{
    try{
        const deletePostById = await post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports =  router