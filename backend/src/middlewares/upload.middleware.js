const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 根据日期创建子目录，避免单个目录文件过多
    const today = new Date();
    const dateDir = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    const uploadPath = path.join(uploadDir, dateDir);
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 只接受图片文件
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件'), false);
  }
};

// 创建上传实例
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 限制20MB
  }
});

// 处理照片上传
const uploadPhoto = (req, res, next) => {
  const photoUpload = upload.single('image');
  
  photoUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: '文件大小不能超过20MB' });
        }
        return res.status(400).json({ message: `上传错误: ${err.message}` });
      }
      return res.status(400).json({ message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: '请上传一张照片' });
    }
    
    // 添加文件信息到请求体
    req.body.imageUrl = `/uploads/${path.relative(uploadDir, req.file.path).replace(/\\/g, '/')}`;
    req.body.originalFilename = req.file.originalname;
    req.body.fileSize = req.file.size;
    req.body.mimeType = req.file.mimetype;
    
    next();
  });
};

module.exports = {
  uploadPhoto
}; 