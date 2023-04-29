const Prof = require("../models/profModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Application = require("../models/applicationModel")
const Student = require("../models/studentModel")

const createToken = (id) => {
    return jwt.sign({ _id: id, role: "1" }, process.env.SECRET, { expiresIn: "3d" })
}

const getProfs = async (req, res) => {
    const profs = await Prof.find({})
    res.status(200).json(profs)
}

const getProf = async (req, res) => {
    const email = req.params.id
    try {
        const prof = await Prof.findOne({ email })

        if (!prof) {
            return res.status(404).json({ error: "Professor not found" })
        }
        res.status(200).json(prof)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const dissmissProf = async (req, res) => {
    const id = req.body.id
    try {
        let profToUpdate = await Prof.findById(id)
        profToUpdate.hod = false
        profToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const appointHOD = async (req, res) => {
    const id = req.body.id

    try {
        let profToUpdate = await Prof.findById(id)
        profToUpdate.hod = true
        profToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginProf = async (req, res) => {
    const { email, password } = req.body
    role = "1"

    try {
        const prof = await Prof.login(email, password)
        const token = createToken(prof._id)

        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupProf = async (req, res) => {
    const { email, password, name, dept, chamber, researchInterest, websites, hod } = req.body
    let role = "1"
    try {
        const prof = await Prof.signup(email, password, name, dept, chamber, researchInterest, websites, hod)

        // create a token
        const token = createToken(prof._id)

        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getName = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID, No such professor" })
    }

    const prof = await Prof.findById(id)

    if (!prof) {
        return res.status(404).json({ error: "No such professor" })
    }

    res.status(200).json(prof)
}

const getHoDApprovalApplications = async (req, res) => {
    const email = req.params.id
    // console.log(email)
    const p = await Prof.findOne({ email: email })
    const dept = p.dept
    // console.log(p, dept)
    const profs = await Prof.find({ dept: dept })
    // console.log(profs)
    const pEmail = profs.map((p) => p.email)
    // console.log(pEmail)
    const applications = await Application.find({ profEmail: { $in: pEmail }, status: 3 })
    // console.log(applications)
    const sEmail = applications.map((app) => app.studentEmail)
    const students = await Student.find({ email: { $in: sEmail } })
    // console.log(students)
    const result1 = applications.map((application) => {
        const student = students.find((student) => student.email === application.studentEmail)
        return {
            id: application._id,
            email: student.email,
            studName: student.name,
            studDept: student.dept,
            cgpa: student.cgpa,
            cv_link: student.cv_link,
            per_link: student.per_link,
            aoi: student.aoi,
            profEmail: application.profEmail,
            title: application.projectTitle,
            sop: application.sop,
        }
    })
    const result = result1.map((r) => {
        const prof = profs.find((prof) => prof.email === r.profEmail)
        return {
            id: r.id,
            email: r.email,
            studName: r.studName,
            studDept: r.studDept,
            cgpa: r.cgpa,
            cv_link: r.cv_link,
            per_link: r.per_link,
            aoi: r.aoi,
            profName: prof.name,
            title: r.title,
            sop: r.sop,
        }
    })
    res.status(200).json(result)
}

const hodAccept = async (req, res) => {
    const id = req.params.id
    try {
        const application = await Application.findById(id)
        application.status = 1
        application.save()
        res.status(200).json({ message: "Updated" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const hodReject = async (req, res) => {
    try {
        const id = req.params.id
        const application = await Application.findById(id)
        application.status = 2
        application.save()
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
                const prof = await Prof.findOne({ email: profEmail }).exec()

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
        res.status(200).json({ message: "Updated" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateProfile = async (req, res) => {
    const id = req.params.id

    Prof.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                dept: req.body.dept,
                chamber: req.body.chamber,
                researchInterest: req.body.researchInterest,
                websites: req.body.websites,
                hod: req.body.hod,
            },
        }
    )
        .then((result) => {
            res.status(200).json({
                updated_result: result,
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            })
        })
}

module.exports = {
    signupProf,
    loginProf,
    getProfs,
    dissmissProf,
    appointHOD,
    updateProfile,
    getName,
    getProf,
    hodAccept,
    getHoDApprovalApplications,
    hodReject,
}
