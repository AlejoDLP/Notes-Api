const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')

const passport = require('passport')

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.post(
    '/users/signin',
    passport.authenticate('local', {
        successRedirect: '/notes',
        failureRedirect: '/users/signin',
        failureFlash: true
    })
)

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post(
    '/users/signup',
    body('name', 'Name must have more than 3 characters')
        .exists({ checkFalsy: true, checkNull: true })
        .isLength({ min: 3 })
        .trim()
        .escape(),
    body('email', 'Your email is not valid')
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Your password must be at least 5 characters')
        .exists({ checkFalsy: true, checkNull: true })
        .isLength({ min: 5 })
        .trim(),
    body('confirm_password', 'Passwords do not match').custom(
        (value, { req }) => value === req.body.password
    ),

    async (req, res, next) => {
        const { name, email, password, confirm_password } = req.body
        const exp_val_errors = validationResult(req)
        const errors = []
        exp_val_errors
            .array({ onlyFirstError: true })
            .map((err) => errors.push({ text: err.msg }))

        if (errors.length > 0) {
            return res.render('users/signup', {
                errors,
                name,
                email,
                password,
                confirm_password
            })
        }

        // Look for email coincidence
        const userFound = await User.findOne({ email: email })
        if (userFound) {
            req.flash('error_msg', 'The Email is already in use.')
            return res.redirect('/users/signup')
        }

        // Saving a New User
        const newUser = new User({ name, email, password })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'You are registered.')
        res.redirect('/users/signin')
    }
)

module.exports = router
