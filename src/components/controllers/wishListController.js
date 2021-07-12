const Express = require('express');
const validateJWT = require('../middleware');
const router = Express.Router();
const { WishModel } = require('../models');
const validateRole  = require('../middleware');




//// Create plush
router.post('/create',  validateJWT, async (req, res) => {
    const {name, bio, description, link} = req.body;
    const {id} = req.user;
    const PlushEntry = {
        name :name,
        bio: bio,
        description: description,
        link: link,
        owner_id: id
    }
    // console.log(req.user.id, req.body, plushEntry)
    try {
        const newPlush = await WishModel.create(PlushEntry);
        res.status(200).json(newPlush);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
    // WishModel.create(plushEntry)
})


//  ADMIN CREATE
router.post('/admin/create',  validateRole, async (req, res) => {
    const {name, bio, description, link} = req.body;
    const {id} = req.admin;
    const plushEntry = {
        name :name,
        bio: bio,
        description: description,
        link: link,
        owner_id: id
    }
    console.log(req.user.id, req.body, plushEntry)
    try {
        const newPlush = await WishModel.create(plushEntry);
        res.status(200).json(newPlush);
    }
    catch(err) {
        //console.log(err)
        res.status(500).json({error: `error message ${err}`})
    }
    // WishModel.create(plushEntry)
})



/// Get plush list by user
router.get('/:id', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userPlush = await WishModel.findAll({
            where: {
            owner_id: id
        }
        });
        res.status(200).json(userPlush);
    } catch (err) {
        res.status(500).json({error: err})
    }
})


// ADMIN VIEW
router.get('/admin/:id', validateRole, async (req, res) => {
    let { id } = req.user.role;
    try {
        const userPlush = await WishModel.findAll({
            where: {
            owner_id: id
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
        const update = await WishModel.update(updateList, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }

})

// ADMIN UPDATE
router.put('/admin/update/:plushId', validateRole, async (req, res) => {
    const {name, bio, description, link} = req.body;
    const listId = req.params.plushId;
    const userId = req.user.admin;

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
        const update = await WishModel.update(updateList, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }

})



//Create a delete plush from list endpoint
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const plushId = req.params.id;

    try {
        const query = {
            where: {
                id: plushId,
                owner_id: ownerId,
            }
        };

        await WishModel.destroy(query);
        res.status(200).json({ msg: "Plush has been removed"});
    } catch (err) {
        res.status(500).json({error: err})
    }
})


// ADMIN DELETE
router.delete('/admin/delete/:id', validateRole, async (req, res) => {
    const ownerId = req.user.admin;
    const plushId = req.params.id;

    try {
        const query = {
            where: {
                id: plushId,
                owner_id: ownerId,
            }
        };

        await WishModel.destroy(query);
        res.status(200).json({ msg: "Plush has been removed"});
    } catch (err) {
        res.status(500).json({error: err})
    }
})

module.exports = router