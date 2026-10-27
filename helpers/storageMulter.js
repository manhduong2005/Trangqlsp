const multer = require("multer");
// trả về đối tường storage chứa 2 quy tắc lưu ở đâu - destination và đặt tên là gì - filename
module.exports = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  })
  return storage;
}