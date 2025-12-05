const asyncHandler = require('express-async-handler')
const Contact = require("../models/contactModel")
const getAllContact = asyncHandler(async (req,res) =>{
 const Contacts = await Contact.find({user_id:req.user.id})   
 res.status(200).json(Contacts)
})
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
     res.status(404)
     throw new Error("contact not found")
    }
 res.status(200).json(contact)
})
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
     res.status(404)
     throw new Error("contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error('user has no permisson to change another user contact')
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
 res.status(200).json(updatedContact)
})
const createContact =asyncHandler( async(req,res)=>{
 const {name,email,phone} = req.body
 if(!name || !email || !phone){
    res.status(400)
    throw new Error("All fields are mandatory")
 }
 const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
 })
 console.log("Data ",req.body)
 res.status(201).json(contact)
})
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Correct check: does the logged-in user own this contact?
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User has no permission to delete another user's contact");
  }

  await contact.deleteOne();
  res.status(200).json({ message: "Contact deleted successfully" });
});


module.exports = {
    getContact,
    getAllContact,
    updateContact,
    createContact,
    deleteContact
}