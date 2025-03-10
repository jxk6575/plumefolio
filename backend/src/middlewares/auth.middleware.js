const jwt = require('jsonwebtoken');
const { User, Photo } = require('../models');

// 验证JWT令牌
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: '未提供授权令牌' });
  }
  
  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: '未提供授权令牌' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: '无效的令牌' });
  }
};

// 检查用户是否为管理员
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: '需要管理员权限' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ message: '服务器错误' });
  }
};

// 检查用户是否为资源所有者或管理员
const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 如果是管理员，直接通过
    if (user.role === 'admin') {
      return next();
    }
    
    // 检查是否为照片所有者
    const photoId = req.params.id;
    const photo = await Photo.findByPk(photoId);
    
    if (!photo) {
      return res.status(404).json({ message: '照片不存在' });
    }
    
    if (photo.userId !== req.userId) {
      return res.status(403).json({ message: '没有权限修改此资源' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isOwnerOrAdmin
}; 