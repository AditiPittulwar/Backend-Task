
const getmain =(req,res)=>{
    res.status(200).render("index")
}

const getaboutinfo=(req,res)=>{
    res.status(200).render("about")
}
const getcontactinfo=(req,res)=>{
    res.status(200).render("contact")
}

export {getmain,getaboutinfo,getcontactinfo}