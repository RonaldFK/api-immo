import express from 'express'

export const router = express.Router()

// GET, POST, PATCH , DELETE
router.get('/',()=>{
    console.log('test');
    
})