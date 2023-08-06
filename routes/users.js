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
    console.log(req.body)
      const validate = async (req, username, password, reply) => {
        try{
  const user = await admin.findOne({userName: username}, function(doc){ return doc})
            console.log(user)
           let validate =  bcrypt.compareSync(password, user.password)
           console.log(user)
           if (validate) {
            return user.toObject()
           } 
              }
            catch (error) {
                console.log(error)
            }
            }
      const user = validate(req, username, password).then((res) => {return res})
      console.log(user)
                    if (user){
                delete user.password;
                res.json(JSON.stringify(user))
                     }else {
                res.status(400).json('worng credentials')
            }
        
            })
export default router
