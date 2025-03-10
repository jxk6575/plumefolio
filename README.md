# 翎羽集 (Plumefolio)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue: 3.x](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Node: 14.x+](https://img.shields.io/badge/Node-14.x%2B-brightgreen.svg)](https://nodejs.org/)

翎羽集(Plumefolio)是一个专业的鸟类摄影分类平台，帮助鸟类摄影爱好者根据鸟类种类分类存储和管理照片。该平台提供了照片上传和基本管理功能，旨在通过分类系统帮助用户组织和检索他们的摄影作品。

<div align="center">
  <p><i>* 项目徽标设计中</i></p>
</div>

## 目录

- [项目背景](#项目背景)
- [技术栈](#技术栈)
- [当前功能](#当前功能)
- [系统架构](#系统架构)
- [项目结构](#项目结构)
- [鸟类分类系统](#鸟类分类系统)
- [安装和运行](#安装和运行)
- [API文档](#api文档)
- [部署指南](#部署指南)
- [未来规划](#未来规划)
- [贡献指南](#贡献指南)
- [许可证](#许可证)
- [联系我们](#联系我们)

## 项目背景

随着鸟类摄影爱好者数量的增长，管理大量鸟类照片成为一个挑战。传统的照片管理工具往往缺乏对鸟类专业分类的支持，导致摄影师难以有效地组织和检索自己的作品。翎羽集正是为解决这一问题而生，它结合了专业的鸟类分类学知识和现代化的Web技术，为鸟类摄影爱好者提供了一个专属的照片管理平台。

## 技术栈

### 前端
- **框架**: Vue.js 3
- **状态管理**: Vuex 4
- **路由**: Vue Router 4
- **UI组件库**: Element Plus
- **HTTP客户端**: Axios

### 后端
- **运行环境**: Node.js
- **Web框架**: Express.js
- **数据库ORM**: Sequelize
- **认证**: JWT (JSON Web Tokens)
- **文件处理**: Multer

### 数据库与存储
- **关系型数据库**: MySQL
- **图片存储**: 本地文件系统（计划支持阿里云OSS）

### 开发工具
- **代码管理**: Git
- **包管理**: npm

## 当前功能

### 用户管理
- **用户注册与登录**: 支持基本邮箱注册和登录功能
- **个人资料**: 查看用户基本信息

### 照片管理
- **照片上传**: 支持单张照片上传，支持拖放功能
- **照片元数据**: 支持添加标题、描述、标签等基本信息
- **照片分类**: 支持按鸟类种类手动分类
- **照片查看**: 提供网格视图和列表视图两种浏览模式

### 鸟类分类
- **基础分类**: 支持简单的鸟类分类层级（科、属、种）
- **分类管理**: 管理员可以添加基本分类

### 搜索与筛选
- **基础搜索**: 支持按标题和标签搜索
- **分类筛选**: 可按鸟类分类筛选照片

## 系统架构

翎羽集采用前后端分离的架构，前端使用Vue.js构建单页应用(SPA)，后端提供RESTful API。

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│   Browser   │ <──> │  Frontend   │ <──> │   Backend   │
│  (Client)   │      │  (Vue.js)   │      │  (Node.js)  │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
                                                 │
                                                 │
                                                 ▼
                     ┌─────────────┐      ┌─────────────┐
                     │             │      │   Local     │
                     │   MySQL    │ <──> │  File System │
                     │  Database   │      │             │
                     └─────────────┘      └─────────────┘
```

### 数据流
1. 用户通过浏览器访问前端应用
2. 前端Vue.js应用与后端API交互
3. 后端处理请求，与数据库和文件系统交互
4. 后端返回结果给前端
5. 前端渲染数据，展示给用户

## 项目结构

```
plumefolio/
├── frontend/                # 前端Vue.js项目
│   ├── public/              # 静态资源
│   ├── src/                 # 源代码
│   │   ├── assets/          # 资源文件(图片、字体等)
│   │   ├── components/      # 可复用组件
│   │   ├── views/           # 页面组件
│   │   │   ├── Home.vue     # 首页
│   │   │   ├── Gallery.vue  # 图库页
│   │   │   ├── Upload.vue   # 上传页
│   │   │   └── About.vue    # 关于页
│   │   ├── router/          # 路由配置
│   │   ├── store/           # Vuex状态管理
│   │   ├── App.vue          # 主组件
│   │   └── main.js          # 入口文件
│   └── package.json         # 依赖配置
│
├── backend/                 # 后端Node.js项目
│   ├── src/                 # 源代码
│   │   ├── config/          # 配置文件
│   │   ├── controllers/     # 控制器
│   │   ├── middlewares/     # 中间件
│   │   ├── models/          # 数据模型
│   │   ├── routes/          # 路由
│   │   └── index.js         # 入口文件
│   ├── uploads/             # 上传文件存储
│   └── package.json         # 依赖配置
│
└── README.md                # 项目说明
```

## 鸟类分类系统

翎羽集采用基于鸟类学分类体系的方法，目前支持基础的科 > 属 > 种的三级分类法。

### 分类层级
- **科(Family)**: 如文鸟科、鸮科等
- **属(Genus)**: 如麻雀属、猫头鹰属等
- **种(Species)**: 最基本的分类单位，如家麻雀、长耳鸮等

### 分类数据
平台目前支持手动添加鸟类分类数据，未来将预置常见鸟类的分类数据。

## 数据库设计

### 主要数据模型

#### 用户模型 (User)
```javascript
{
  id: Integer (PK),
  username: String,
  email: String,
  password: String (加密存储),
  role: Enum ['user', 'admin'],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### 照片模型 (Photo)
```javascript
{
  id: Integer (PK),
  title: String,
  description: Text,
  imageUrl: String,
  originalFilename: String,
  fileSize: Integer,
  mimeType: String,
  tags: String,
  userId: Integer (FK),
  categoryId: Integer (FK),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### 类别模型 (Category)
```javascript
{
  id: Integer (PK),
  name: String,
  description: Text,
  parent_id: Integer (FK, 自引用),
  level: Integer,  // 1=科, 2=属, 3=种
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## 安全性考虑

### 用户认证与授权
- 采用JWT (JSON Web Tokens)进行基本认证
- 实现基于角色的简单访问控制

### 数据安全
- 用户密码使用bcrypt进行单向哈希存储
- 基本的输入验证

## 安装和运行

### 前提条件

- Node.js (v14+)
- MySQL (v8+)

### 详细安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/yourusername/plumefolio.git
cd plumefolio
```

2. **设置后端**
```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 根据实际情况修改.env文件
# 编辑数据库配置和JWT密钥
```

3. **设置数据库**
```sql
-- 登录MySQL
mysql -u root -p

-- 创建数据库
CREATE DATABASE plumefolio_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. **设置前端**
```bash
# 进入前端目录
cd ../frontend

# 安装依赖
npm install
```

5. **启动开发服务器**
```bash
# 启动后端(在backend目录下)
npm run dev

# 启动前端(在frontend目录下)
npm run serve
```

6. **访问应用**
打开浏览器访问 http://localhost:8080

### 常见问题

**问题**: 无法连接数据库
**解决方案**: 
- 检查MySQL服务是否正在运行
- 验证.env文件中的数据库连接信息是否正确

**问题**: 上传照片失败
**解决方案**:
- 检查uploads目录是否存在且有写入权限

## API文档

翎羽集后端提供了基本的RESTful API，主要分为以下几类：

### 用户API
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/me` - 获取当前用户信息

### 照片API
- `GET /api/photos` - 获取照片列表
- `GET /api/photos/:id` - 获取单个照片详情
- `POST /api/photos` - 上传新照片
- `PUT /api/photos/:id` - 更新照片信息
- `DELETE /api/photos/:id` - 删除照片

### 类别API
- `GET /api/categories` - 获取分类列表
- `GET /api/categories/:id` - 获取单个分类详情
- `POST /api/categories` - 创建新分类

## 部署指南

### 开发环境部署

1. 按照[安装和运行](#安装和运行)部分的步骤配置项目
2. 使用`npm run dev`和`npm run serve`命令启动开发服务器

### 生产环境部署
当前版本主要用于开发和测试，尚未准备好生产环境部署配置。生产环境部署指南将在未来版本中提供。

## 未来规划

### 近期计划 (1-3个月)
- 完善用户个人资料管理功能
- 增强照片编辑功能
- 添加批量上传功能
- 实现照片评论和点赞功能
- 创建预设鸟类分类数据库

### 中期计划 (3-6个月)
- 集成阿里云OSS存储照片
- 实现基础的AI鸟类识别功能
- 添加用户收藏功能
- 优化移动端体验
- 添加图片热度和流行度分析

### 长期计划 (6个月以上)
- 开发移动应用(Android/iOS)
- 添加地图集成，显示照片拍摄地点
- 实现鸟类百科知识库
- 添加国际化和多语言支持
- 实现社区功能，用户可以关注其他摄影师

### 计划中的技术升级
- 添加Redis缓存提高性能
- 使用CDN加速图片访问
- 实现服务端渲染(SSR)提升SEO
- 微服务架构重构，提高可扩展性
- 全面的自动化测试和CI/CD流水线

## 贡献指南

我们欢迎并感谢任何形式的贡献！以下是参与项目的方式:

### 报告Bug
- 使用GitHub Issues提交Bug报告
- 详细描述问题，包括复现步骤

### 提交功能请求
- 使用GitHub Issues提交功能请求
- 清晰描述新功能及其解决的问题

### 代码贡献
1. Fork项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

本项目采用MIT许可证 - 详情请参见[LICENSE](LICENSE)文件

## 联系我们

- 项目维护者: Your Name
- 电子邮件: info@plumefolio.com
- 项目链接: [GitHub](https://github.com/yourusername/plumefolio)

---

<div align="center">
  <p>🐦 Happy Bird Watching! 🐦</p>
</div> 