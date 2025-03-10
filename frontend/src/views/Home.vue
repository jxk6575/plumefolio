<template>
  <div class="home">
    <div class="hero text-center py-5">
      <h1 class="display-4">翎羽集 (Plumefolio)</h1>
      <p class="lead">专业的鸟类摄影分类平台</p>
      <div class="mt-4">
        <router-link to="/gallery" class="btn btn-primary me-2">浏览图库</router-link>
        <router-link to="/upload" class="btn btn-success">上传照片</router-link>
      </div>
    </div>

    <div class="features py-5">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <i class="el-icon-picture-outline-round fs-1 mb-3 text-primary"></i>
              <h3 class="card-title">智能分类</h3>
              <p class="card-text">根据鸟类种类自动分类您的照片，便于管理和查找。</p>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <i class="el-icon-share fs-1 mb-3 text-primary"></i>
              <h3 class="card-title">便捷分享</h3>
              <p class="card-text">轻松分享您的鸟类摄影作品，与志同道合的鸟类爱好者交流。</p>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <i class="el-icon-data-line fs-1 mb-3 text-primary"></i>
              <h3 class="card-title">数据安全</h3>
              <p class="card-text">使用阿里云RDS安全存储您的照片，保障数据安全和访问速度。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-photos py-5 bg-light">
      <h2 class="text-center mb-4">最新上传</h2>
      <div class="row">
        <!-- 这里将来会显示最新上传的照片 -->
        <div class="col-12 text-center">
          <router-link to="/gallery" class="btn btn-outline-primary">查看更多</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 将来可以添加数据
    };
  }
}
</script>

<style scoped>
.hero {
  background-color: #f8f9fa;
  padding: 3rem 0;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
}

.features {
  margin-bottom: 2rem;
}

.card {
  transition: transform 0.3s;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
}
</style> 