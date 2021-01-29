const multer = require('multer');
var fs = require('fs');
if (!fs.existsSync('attachments')) fs.mkdirSync('attachments')
// console.log(fs.existsSync('../attachments'))
const uploadAttachment = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(__dirname+'/../attachments')
            cb(null, __dirname+'/../attachments');
        },
        filename: function (req, file, cb) {

            cb(null, `${Date.now()}-${file.originalname}`);
        }
    }),
});

module.exports = {
    uploadAttachment
}