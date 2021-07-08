const { DataTypes } = require('sequelize');
const db = require('../db')
const Express = require('express');
const { PlushCollection } = require('../models');
const validateJWT = require('../middleware/validateSession');
const router = Express.Router();


//// Create plush
router.post('/create',  validateJWT, async (req, res) => {
    const {name, bio, description, link} = req.body;
    const {id} = req.user;
    const plushEntry = {
        name :name,
        bio: bio,
        description: description,
        link: link,
        owner_id: id
    }
    // console.log(req.user.id, req.body, plushEntry)
    try {
        const newPlush = await PlushModel.create(PlushEntry);
        res.status(200).json(newPlush);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
    // PlushModel.create(listEntry)
})


/// Get plush list by user
router.get('/:id', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userPlush = await PlushModel.findAll({
            where: {
            owner_id: id,
            completed: false
        }
        });
        res.status(200).json(userPlush);
    } catch (err) {
        res.status(500).json({error: err})
    }
})


//Update plush entry
router.put('/update/:plushId', validateJWT, async (req, res) => {
    const {name, bio, description, link} = req.body;
    const listId = req.params.plushId;
    const userId = req.user.id;

    const query = {
        where: {
            id: listId,
            owner_id: userId
        }
    }

    const updateList = {
        name: name,
        bio: bio,
        description: description,
        link: link,
    };
    try {
        const update = await ListModel.update(updateList, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }

})

//Create a delete plush from list endpoint
