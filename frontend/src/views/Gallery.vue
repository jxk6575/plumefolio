<template>
  <div class="gallery">
    <h1 class="mb-4 text-center">鸟类图片库</h1>
    
    <div class="filters mb-4">
      <div class="row align-items-center">
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text">搜索</span>
            <input type="text" class="form-control" v-model="searchTerm" placeholder="输入鸟类名称...">
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text">类别</span>
            <select class="form-select" v-model="selectedCategory">
              <option value="">所有类别</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="text-md-end">
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-outline-primary" :class="{'active': viewMode === 'grid'}" @click="viewMode = 'grid'">
                <i class="el-icon-s-grid"></i> 网格
              </button>
              <button type="button" class="btn btn-outline-primary" :class="{'active': viewMode === 'list'}" @click="viewMode = 'list'">
                <i class="el-icon-menu"></i> 列表
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 网格视图 -->
    <div v-if="viewMode === 'grid'" class="photo-grid">
      <div class="row" v-if="filteredPhotos.length > 0">
        <div v-for="photo in filteredPhotos" :key="photo.id" class="col-md-4 col-sm-6 mb-4">
          <div class="card h-100 photo-card">
            <img :src="photo.imageUrl" class="card-img-top" :alt="photo.title">
            <div class="card-body">
              <h5 class="card-title">{{ photo.title }}</h5>
              <p class="card-text text-muted">{{ photo.categoryName }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <small class="text-muted">上传于 {{ formatDate(photo.uploadDate) }}</small>
              <button class="btn btn-sm btn-outline-primary" @click="viewPhotoDetails(photo)">
                <i class="el-icon-view"></i> 查看
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-5">
        <p class="text-muted">未找到匹配的图片</p>
      </div>
    </div>

    <!-- 列表视图 -->
    <div v-else class="photo-list">
      <table class="table table-hover" v-if="filteredPhotos.length > 0">
        <thead>
          <tr>
            <th>缩略图</th>
            <th>标题</th>
            <th>类别</th>
            <th>上传日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="photo in filteredPhotos" :key="photo.id">
            <td><img :src="photo.imageUrl" alt="缩略图" class="thumbnail"></td>
            <td>{{ photo.title }}</td>
            <td>{{ photo.categoryName }}</td>
            <td>{{ formatDate(photo.uploadDate) }}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary" @click="viewPhotoDetails(photo)">
                <i class="el-icon-view"></i> 查看
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center py-5">
        <p class="text-muted">未找到匹配的图片</p>
      </div>
    </div>

    <div class="pagination d-flex justify-content-center mt-4">
      <!-- 分页组件将在这里添加 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      photos: [], // 将从API获取
      categories: [], // 将从API获取
      searchTerm: '',
      selectedCategory: '',
      viewMode: 'grid',
      currentPage: 1,
      itemsPerPage: 9
    };
  },
  computed: {
    filteredPhotos() {
      let result = this.photos;
      
      // 按类别筛选
      if (this.selectedCategory) {
        result = result.filter(photo => photo.categoryId === this.selectedCategory);
      }
      
      // 按搜索词筛选
      if (this.searchTerm.trim()) {
        const searchLower = this.searchTerm.toLowerCase();
        result = result.filter(photo => 
          photo.title.toLowerCase().includes(searchLower) || 
          photo.categoryName.toLowerCase().includes(searchLower)
        );
      }
      
      return result;
    }
  },
  methods: {
    async fetchPhotos() {
      try {
        // 这里将使用axios从API获取照片数据
        // 暂时使用示例数据
        this.photos = [
          {
            id: 1,
            title: "黑尾鸥",
            imageUrl: "https://example.com/image1.jpg",
            categoryId: 1,
            categoryName: "海鸥科",
            uploadDate: new Date(2023, 5, 15)
          },
          {
            id: 2,
            title: "红隼",
            imageUrl: "https://example.com/image2.jpg",
            categoryId: 2,
            categoryName: "隼科",
            uploadDate: new Date(2023, 6, 22)
          }
        ];
      } catch (error) {
        console.error("获取照片失败:", error);
      }
    },
    async fetchCategories() {
      try {
        // 这里将使用axios从API获取类别数据
        // 暂时使用示例数据
        this.categories = [
          { id: 1, name: "海鸥科" },
          { id: 2, name: "隼科" },
          { id: 3, name: "鸭科" },
          { id: 4, name: "鸮形目" }
        ];
      } catch (error) {
        console.error("获取类别失败:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    viewPhotoDetails(photo) {
      // 跳转到照片详情页或打开模态框
      console.log("查看照片:", photo);
    }
  },
  mounted() {
    this.fetchPhotos();
    this.fetchCategories();
  }
}
</script>

<style scoped>
.photo-card {
  transition: transform 0.3s;
  cursor: pointer;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style> 