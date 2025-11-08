import express from "express"
import {getmain,getaboutinfo,getcontactinfo} from "../Controller/control.js"

const routes = express.Router()

routes.get("/",getmain)
routes.get("/contact",getcontactinfo)
routes.get("/about",getaboutinfo)

export {routes}