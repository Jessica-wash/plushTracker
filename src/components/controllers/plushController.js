const Express = require('express');
const validateJWT = require('../middleware/validateSession');
const router = Express.Router();
const { PlushModel } = require('../models');
const { validateRole } = require('../middleware');


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
    console.log(req.user.id, req.body, plushEntry)
    try {
        const newPlush = await PlushModel.create(plushEntry);
        res.status(200).json(newPlush);
    }
    catch(err) {
        //console.log(err)
        res.status(500).json({error: `error message ${err}`})
    }
    // PlushModel.create(plushEntry)
})


//  ADMIN CREATE
router.post('/admin/create',  validateRole, async (req, res) => {
    const {name, bio, description, link} = req.body;
    const {id} = req.role;
    const plushEntry = {
        name :name,
        bio: bio,
        description: description,
        link: link,
        owner_id: id,
    }
    console.log(req.user.id, req.body, plushEntry)
    try {
        const newPlush = await PlushModel.create(plushEntry);
        res.status(200).json(newPlush);
    }
    catch(err) {
        //console.log(err)
        res.status(500).json({error: `error message ${err}`})
    }
    // PlushModel.create(plushEntry)
})



/// Get plush by userid
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

// ADMIN VIEW
router.get('/admin/:id', validateRole, async (req, res) => {
    let { id } = req.admin;
    try {
        const userPlush = await PlushModel.findAll({
            where: {
            owner_id: user,
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
        const update = await PlushModel.update(updateList, query);
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
        const update = await PlushModel.update(updateList, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }

})



//Delete Plush              CHECK THIS ENDPOINT
router.delete('/delete', validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const plushId = req.params.id;

    try {
        const query = {
            where: {
                id: plushId,
                owner_id: ownerId,
            }
        };

        await PlushModel.destroy(query);
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

        await PlushModel.destroy(query);
        res.status(200).json({ msg: "Plush has been removed"});
    } catch (err) {
        res.status(500).json({error: err})
    }
})


module.exports = router