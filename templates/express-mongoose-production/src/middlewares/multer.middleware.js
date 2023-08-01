const multer = require('multer')

// Define multer storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${Date.now()}.${ext}`)
  }
})

// Define multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    const err = new Error('Not an image! Please upload only images.')
    cb(err, false)
  }
}

const multerUpload = multer({
  fileFilter: multerFilter,
  storage: multerStorage
})

module.exports = multerUpload
