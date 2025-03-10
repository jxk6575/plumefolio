const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const photoController = require('../controllers/photo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

// 获取所有照片
router.get('/', photoController.getAllPhotos);

// 获取单个照片
router.get('/:id', photoController.getPhotoById);

// 上传新照片 (需要登录)
router.post(
  '/',
  [
    authMiddleware.verifyToken,
    uploadMiddleware.uploadPhoto,
    body('title').notEmpty().withMessage('照片标题不能为空').trim(),
    body('categoryId').notEmpty().withMessage('必须选择一个类别').isInt().withMessage('类别ID必须是整数'),
    body('description').optional().trim(),
    body('location').optional().trim(),
    body('tags').optional().trim()
  ],
  photoController.uploadPhoto
);

// 更新照片信息 (需要是照片所有者或管理员)
router.put(
  '/:id',
  [
    authMiddleware.verifyToken,
    authMiddleware.isOwnerOrAdmin,
    body('title').optional().notEmpty().withMessage('照片标题不能为空').trim(),
    body('categoryId').optional().isInt().withMessage('类别ID必须是整数'),
    body('description').optional().trim(),
    body('location').optional().trim(),
    body('tags').optional().trim(),
    body('status').optional().isIn(['public', 'private', 'draft']).withMessage('状态值无效')
  ],
  photoController.updatePhoto
);

// 删除照片 (需要是照片所有者或管理员)
router.delete(
  '/:id',
  [
    authMiddleware.verifyToken,
    authMiddleware.isOwnerOrAdmin
  ],
  photoController.deletePhoto
);

// 增加照片浏览次数
router.post('/:id/view', photoController.incrementViewCount);

// 点赞照片
router.post(
  '/:id/like',
  [
    authMiddleware.verifyToken
  ],
  photoController.likePhoto
);

// 搜索照片
router.get('/search', photoController.searchPhotos);

module.exports = router; 