<template>
  <div class="about">
    <div class="container py-5">
      <h1 class="text-center mb-5">关于翎羽集</h1>
      
      <div class="row mb-5">
        <div class="col-md-6">
          <h2 class="mb-3">我们的使命</h2>
          <p class="lead">
            翎羽集(Plumefolio)致力于为鸟类摄影爱好者提供一个专业的照片管理和分享平台。
          </p>
          <p>
            我们的使命是通过技术手段帮助鸟类摄影爱好者更好地整理、分类和展示他们的作品，同时促进鸟类爱好者之间的交流与分享，
            提高公众对鸟类多样性的认识和保护意识。
          </p>
        </div>
        <div class="col-md-6">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body d-flex align-items-center justify-content-center">
              <i class="el-icon-picture display-1 text-primary"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mb-5">
        <div class="col-md-6 order-md-2">
          <h2 class="mb-3">我们的特色</h2>
          <ul class="feature-list">
            <li>
              <i class="el-icon-collection-tag text-primary me-2"></i>
              <strong>智能分类：</strong> 根据鸟类种类自动分类您的照片
            </li>
            <li>
              <i class="el-icon-search text-primary me-2"></i>
              <strong>高效检索：</strong> 快速查找特定种类的鸟类照片
            </li>
            <li>
              <i class="el-icon-upload text-primary me-2"></i>
              <strong>便捷上传：</strong> 支持拖放功能，快速上传照片
            </li>
            <li>
              <i class="el-icon-share text-primary me-2"></i>
              <strong>社区分享：</strong> 与志同道合的鸟类爱好者交流
            </li>
            <li>
              <i class="el-icon-data-analysis text-primary me-2"></i>
              <strong>数据安全：</strong> 使用阿里云RDS安全存储您的照片
            </li>
          </ul>
        </div>
        <div class="col-md-6 order-md-1">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body d-flex align-items-center justify-content-center">
              <i class="el-icon-medal display-1 text-primary"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="team-section text-center mb-5">
        <h2 class="mb-4">我们的团队</h2>
        <p class="mb-5">
          翎羽集由一群热爱鸟类和摄影的技术专家创建。我们结合了对自然的热爱和技术专长，
          打造了这个专业的鸟类摄影分类平台。
        </p>
        
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="team-member">
              <div class="avatar mb-3">
                <i class="el-icon-user display-4"></i>
              </div>
              <h4>张明</h4>
              <p class="text-muted">创始人 & 摄影师</p>
            </div>
          </div>
          
          <div class="col-md-4 mb-4">
            <div class="team-member">
              <div class="avatar mb-3">
                <i class="el-icon-user display-4"></i>
              </div>
              <h4>李华</h4>
              <p class="text-muted">技术总监</p>
            </div>
          </div>
          
          <div class="col-md-4 mb-4">
            <div class="team-member">
              <div class="avatar mb-3">
                <i class="el-icon-user display-4"></i>
              </div>
              <h4>王芳</h4>
              <p class="text-muted">鸟类专家</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contact-section text-center">
        <h2 class="mb-4">联系我们</h2>
        <p class="mb-4">
          如果您有任何问题、建议或合作意向，请随时与我们联系。
        </p>
        
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <div class="mb-3">
                  <label for="contactName" class="form-label">您的姓名</label>
                  <input type="text" class="form-control" id="contactName">
                </div>
                <div class="mb-3">
                  <label for="contactEmail" class="form-label">电子邮箱</label>
                  <input type="email" class="form-control" id="contactEmail">
                </div>
                <div class="mb-3">
                  <label for="contactMessage" class="form-label">留言内容</label>
                  <textarea class="form-control" id="contactMessage" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary">发送留言</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <p class="text-muted">
            电子邮箱: info@plumefolio.com<br>
            电话: (010) 1234-5678
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.feature-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.team-member {
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
</style> 