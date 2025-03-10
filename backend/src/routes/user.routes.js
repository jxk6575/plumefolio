const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// 用户注册
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('用户名不能为空')
      .isLength({ min: 3, max: 30 }).withMessage('用户名长度必须在3-30个字符之间')
      .trim(),
    body('email').notEmpty().withMessage('邮箱不能为空')
      .isEmail().withMessage('邮箱格式不正确')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('密码不能为空')
      .isLength({ min: 6 }).withMessage('密码长度不能少于6个字符')
  ],
  userController.register
);

// 用户登录
router.post(
  '/login',
  [
    body('email').notEmpty().withMessage('邮箱不能为空')
      .isEmail().withMessage('邮箱格式不正确')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('密码不能为空')
  ],
  userController.login
);

// 获取当前用户信息
router.get(
  '/me',
  [
    authMiddleware.verifyToken
  ],
  userController.getCurrentUser
);

// 更新用户信息
router.put(
  '/me',
  [
    authMiddleware.verifyToken,
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    body('password').optional().isLength({ min: 6 }).withMessage('密码长度不能少于6个字符')
  ],
  userController.updateUser
);

// 获取用户上传的照片
router.get(
  '/me/photos',
  [
    authMiddleware.verifyToken
  ],
  userController.getUserPhotos
);

// 管理员获取所有用户 (需要管理员权限)
router.get(
  '/',
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin
  ],
  userController.getAllUsers
);

// 管理员获取单个用户 (需要管理员权限)
router.get(
  '/:id',
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin
  ],
  userController.getUserById
);

// 管理员更新用户状态 (需要管理员权限)
router.put(
  '/:id/status',
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    body('status').notEmpty().withMessage('状态不能为空')
      .isIn(['active', 'inactive', 'banned']).withMessage('状态值无效')
  ],
  userController.updateUserStatus
);

module.exports = router; 