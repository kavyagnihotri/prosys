const Application = require("../models/applicationModel")
const Student = require("../models/studentModel")
const Project = require("../models/ProjectModel")
const Professor = require("../models/profModel")

const getApplications = async (req, res) => {
    const applications = await Application.find({}).sort({ createdAt: -1 })
    res.status(200).json(applications)
}

const createApplication = async (req, res) => {
    const { projectID, studentEmail, type, sop } = req.body
    try {
        if (!projectID) {
            return res.status(400).json({ error: "Please fill the Project ID" })
        }

        if (!studentEmail) {
            return res.status(400).json({ error: "Please fill the Student Email" })
        }

        const student = await Student.findOne({ email: studentEmail })
        if (!student) {
            return res.status(400).json({ error: "Not a valid Student Email" })
        }

        const proj = await Project.findOne({ _id: projectID })
        if (!proj || proj["approved"] != 1) {
            return res.status(400).json({ error: "Not a valid Project ID" })
        }

        const project = await Project.findOne({ _id: projectID })
        const profEmail = project["professorEmail"]
        const projectTitle = project["title"]
        const applicaiton = await Application.create({ projectTitle, projectID, profEmail, studentEmail, type, sop })
        project.applicants.push(studentEmail)
        await project.save()

        res.status(200).json(applicaiton)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addScore = async (req, res) => {
    const { appId, newScore } = req.body
    try {
        const application = await Application.findOne({ _id: appId })
        application.score = newScore
        await application.save()
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateStatus = async (req, res) => {
    const { appId, status } = req.body
    // console.log(req.body)
    try {
        const application = await Application.findOne({ _id: appId })
        // console.log(appToUpdate)
        application.status = status
        await application.save()
        // res.status(200).json("Updated")
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getRanked = async (req, res) => {
    const applications = await Application.find().sort({ score: "desc" })
    res.status(200).json(applications)
}

const acceptApplication = async (req, res) => {
    const id = req.body.id

    try {
        const application = await Application.findOne({ _id: id })

        application.studentStatus = 1
        application.status = 4
        await application.save()

        const studentEmail = application["studentEmail"]
        const projectID = application["projectID"]
        const project = await Project.findOne({ _id: projectID })

        project.acceptedStudents.push(studentEmail)

        // const index = project.applicants.indexOf(studentEmail)
        // project.applicants.splice(index, 1)

        await project.save()
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const rejectApplication = async (req, res) => {
    const { id } = req.body

    try {
        const application = await Application.findByIdAndUpdate(id, { studentStatus: 0, status: 4 }, { new: true })

        // Filter the remaining applications by project and professor email, and sort by score
        const remainingApplications = await Application.find({
            status: 2,
            score: { $ne: -1 },
            profEmail: application.profEmail,
            projectID: application.projectID,
        }).sort({ score: -1, createdAt: -1 })

        // If there are any remaining applications, select the top one by score and process it
        if (remainingApplications.length > 0) {
            const topApplication = remainingApplications[0]
            const { studentEmail, profEmail } = topApplication

            try {
                // Find the student and professor objects corresponding to the top application
                const student = await Student.findOne({ email: studentEmail }).exec()
                const prof = await Professor.findOne({ email: profEmail }).exec()

                if (student.dept === prof.dept) {
                    topApplication.status = 1
                } else {
                    topApplication.status = 3
                }
                await topApplication.save()
            } catch (error) {
                console.log(error)
            }
        }

        res.status(200).json({ message: "Application rejected successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getApplications,
    createApplication,
    addScore,
    getRanked,
    updateStatus,
    acceptApplication,
    rejectApplication,
    deleteApplication,
}
