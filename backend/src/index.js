const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');

// 加载环境变量
dotenv.config();

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 路由
const categoryRoutes = require('./routes/category.routes');
const photoRoutes = require('./routes/photo.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/categories', categoryRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/users', userRoutes);

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: '欢迎使用翎羽集(Plumefolio) API' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '服务器错误',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 启动服务器
async function startServer() {
  try {
    // 同步数据库模型
    await sequelize.sync();
    console.log('数据库已同步');

    // 启动服务器
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('启动服务器失败:', error);
  }
}

startServer();

module.exports = app; // 导出用于测试 