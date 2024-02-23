require('dotenv').config()
const express = require('express')
const app = express()
//io server setup? for live drafting
const cors = require('cors')
const moragn = require('morgan')
const PORT = process.env.PORT
const secret = process.env.SECRET
