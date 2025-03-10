const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// 获取所有类别
router.get('/', categoryController.getAllCategories);

// 获取单个类别
router.get('/:id', categoryController.getCategoryById);

// 创建新类别 (需要管理员权限)
router.post(
  '/',
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    body('name').notEmpty().withMessage('类别名称不能为空').trim(),
    body('description').optional().trim()
  ],
  categoryController.createCategory
);

// 更新类别 (需要管理员权限)
router.put(
  '/:id',
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    body('name').optional().notEmpty().withMessage('类别名称不能为空').trim(),
    body('description').optional().trim()
  ],
  categoryController.updateCategory
);

// 删除类别 (需要管理员权限)
router.delete(
  '/:id',
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin
  ],
  categoryController.deleteCategory
);

// 获取类别下的所有照片
router.get('/:id/photos', categoryController.getCategoryPhotos);

module.exports = router; 