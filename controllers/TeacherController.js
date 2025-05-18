const teacherModel = require('../models/teacher')

class TeacherController {
    static teacherInsert = async (req, res) => {
        try {
            const { name, email, phone, subject } = req.body
            const teacher = await teacherModel.create({
                name,
                email,
                phone,
                subject
            })
            return res.status(201).json({
                message: "Data Insert Successfully",
                data: teacher
            })
        } catch (error) {
            console.log(error)
        }
    }

    static teacherDisplay = async (req, res) => {
        try {
            // const id = req.params.id
            const teacher = await teacherModel.find()
            return res.status(200).json({
                success: true,
                message: "Data Displayed Done!",
                teacher
            })
        } catch (error) {
            console.log(error)
        }
    }
    static teacherView = async (req, res) => {
        try {
            const id = req.params.id
            const teacher = await teacherModel.findById(id)
            return res.status(200).json({
                success: true,
                message: "Data view Done!",
                teacher
            })
        } catch (error) {
            console.log(error)
        }
    }
    static teacherUpdate = async (req, res) => {
        try {
            const id = req.params.id
            const { name, email, phone, subject } = req.body
            const teacher = await teacherModel.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                subject
            })
            return res.status(201).json({
                success: true,
                message: "Data Updated sucessfully!",
                teacher
            })
        } catch (error) {
            console.log(error)
        }
    }
    static teacherDelete = async (req, res) => {
        try {
            const id = req.params.id
            const teacher = await teacherModel.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Data Successfully Deleted",
                teacher
            })
        } catch (error) {

        }
    }
}
module.exports = TeacherController