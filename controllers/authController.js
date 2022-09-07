import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/User.js'
import validateLoginInput from '../validation/validateLogin.js'

// @desc Login
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) return res.status(400).send(errors)

  const { username, password } = req.body

  // Check if user exists
  const foundUser = await User.findOne({ username }).exec()

  // If user doesn't exist, return error
  if (!foundUser) {
    return res.status(401).json({ message: 'Incorrect username or password.' })
  }

  // Check user password
  const match = await bcrypt.compare(password, foundUser.password)

  // If password is incorrect, return error
  if (!match)
    return res.status(401).json({ message: 'Incorrect username or password.' })

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        role: foundUser.role
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: 'None', // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiration, matches refresh token
  })

  // Send accessToken containing username and roles
  res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public
const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      const foundUser = await User.findOne({
        username: decoded.username
      }).exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            role: foundUser.role
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.json({ accessToken })
    })
  )
}

// @desc Logout
// @route POST /auth/logout
// @access Public
const logout = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(204)

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })

  res.json({ message: 'Cookie cleared.' })
}

export { login, refresh, logout }
