import express from 'express';
const router = express.Router()
import users from '../models/user_model.js'
import admin from '../models/admin_model.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js';

router.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new users({
        name: name,
        email: email,
        password: hash
    })

    user.save()
        .then(savedUser => {
            savedUser = savedUser.toObject()
            delete savedUser.password;
            res.json(savedUser)
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    users.findOne({ email: email })
        .then(user => {
            const isValid = bcrypt.compareSync(password, user.password)
            if (isValid) {
                user = user.toObject()
                delete user.password;
                res.json(user)
            } else {
                res.status(400).json('worng credentials')
            }
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.post('/adminregister', (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const ad = new admin({
        userName: userName,
        password: hash
    })

    ad.save()
        .then(savedUser => {
            savedUser = savedUser.toObject()
            delete savedUser.password;
            res.json(savedUser)
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.post('/adminLogin', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json('incorrect form submission');
    }    
        const pwHash = await bcrypt.hash(password);
          const user = await usermodel.findOne({ userName: username, password: pwHash }).exec();
                    if (user){
                user = user.toObject()
                delete user.password;
                res.json(user)
                    }else {
                res.status(400).json('worng credentials')
            }
        })
        .catch(err => {
            res.json("error " + err)
        })
})
export default router
