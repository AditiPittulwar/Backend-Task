let results=[]
const getmain =(req,res)=>{
    res.status(200).render("index",({data :results}))
}

const getaboutinfo=(req,res)=>{
    res.status(200).render("about")
}
const getcontactinfo=(req,res)=>{
    res.status(200).render("contact")
}
const postdata = (request,response)=>{
     const { name, phone, email } = request.body
    results.push({
         name,
         phone,
         email
    })
}
export {getmain,getaboutinfo,getcontactinfo,postdata}