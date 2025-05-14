const ContactModel = require("../models/contact");

class ContactController {
  static contactInsert = async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email, phone, message } = req.body;
      const result = await ContactModel.create({
        name,
        email,
        phone,
        message,
      });
      return res.status(201).json({
        message: "Data Inserted Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static contactDisplay = async (req, res) => {
    try {
      const contact = await ContactModel.find();
      return res.status(200).json({
        success: true,
        message: "Data Displayed Successfully",
        contact,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static contactView = async (req, res) => {
    try {
      const  id  = req.params.id;
      const contact = await ContactModel.findById(id);
      return res.status(200).json({
        success: true,
        message: "Data Displayed Successfully",
        contact,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static contactDelete = async (req, res) => {
    try {
      const  id  = req.params.id;
      const contact = await ContactModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Data Deleted Successfully",
        contact,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static contactUpdate = async (req, res) => {
    try {
      // console.log(req.body);
      const  id  = req.params.id;
      const { name, email, phone, message } = req.body;
      await ContactModel.findByIdAndUpdate(id,{
        name,
        email,
        phone,
        message,
      });
        return res.status(201).json({
            success: true,
            message: "Data Updated Successfully",
        })
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ContactController;
