import multer from "multer"


const storage = multer.diskStorage({
    destination: process.cwd() + "/public/images",
    filename: (req, file, callback) => {
        let newName = new Date().getTime() + "_" + file.originalname
        callback(null, newName)
    }
})

const upload = multer({storage: storage})

export default upload