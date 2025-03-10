<template>
  <div class="upload">
    <h1 class="mb-4 text-center">上传鸟类照片</h1>
    
    <div class="alert alert-info" role="alert">
      <i class="el-icon-info-circle me-2"></i>
      上传的照片将根据鸟类种类自动分类。请填写准确的信息以便更好地分类您的照片。
    </div>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm" class="upload-form">
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="title" class="form-label">标题 <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  id="title" 
                  v-model="form.title" 
                  class="form-control" 
                  :class="{'is-invalid': validation.title}" 
                  required
                  placeholder="请输入照片标题"
                >
                <div class="invalid-feedback" v-if="validation.title">{{ validation.title }}</div>
              </div>
              
              <div class="mb-3">
                <label for="category" class="form-label">鸟类种类 <span class="text-danger">*</span></label>
                <select 
                  id="category" 
                  v-model="form.categoryId" 
                  class="form-select" 
                  :class="{'is-invalid': validation.categoryId}" 
                  required
                >
                  <option value="" disabled selected>选择鸟类种类</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <div class="invalid-feedback" v-if="validation.categoryId">{{ validation.categoryId }}</div>
                <div class="add-category mt-2">
                  <button type="button" class="btn btn-sm btn-link" @click="showAddCategoryModal = true">
                    没有找到合适的种类？添加新种类
                  </button>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="description" class="form-label">描述</label>
                <textarea 
                  id="description" 
                  v-model="form.description" 
                  class="form-control" 
                  rows="3" 
                  placeholder="描述这张照片..."
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label for="location" class="form-label">拍摄地点</label>
                <input 
                  type="text" 
                  id="location" 
                  v-model="form.location" 
                  class="form-control" 
                  placeholder="照片拍摄地点"
                >
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">照片 <span class="text-danger">*</span></label>
                <div 
                  class="upload-dropzone" 
                  :class="{'is-invalid': validation.image, 'has-preview': previewUrl}"
                  @dragover.prevent="onDragOver"
                  @dragleave.prevent="onDragLeave"
                  @drop.prevent="onDrop"
                  @click="triggerFileInput"
                >
                  <input 
                    type="file" 
                    ref="fileInput" 
                    accept="image/*" 
                    class="d-none" 
                    @change="onFileSelected"
                  >
                  
                  <div v-if="!previewUrl">
                    <i class="el-icon-upload display-4"></i>
                    <p>拖放照片到这里，或点击上传</p>
                    <p class="text-muted small">支持JPG和PNG格式，最大20MB</p>
                  </div>
                  
                  <div v-else class="preview-container">
                    <img :src="previewUrl" alt="预览" class="img-preview">
                    <button type="button" class="btn btn-sm btn-danger remove-btn" @click.stop="removeImage">
                      <i class="el-icon-delete"></i>
                    </button>
                  </div>
                </div>
                <div class="invalid-feedback d-block" v-if="validation.image">{{ validation.image }}</div>
              </div>
              
              <div class="mb-3">
                <label for="tags" class="form-label">标签</label>
                <input 
                  type="text" 
                  id="tags" 
                  v-model="form.tags" 
                  class="form-control" 
                  placeholder="使用逗号分隔多个标签"
                >
                <small class="form-text text-muted">例如：飞行中，栖息，觅食</small>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" @click="resetForm">清空</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting">上传照片</span>
              <span v-else>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                上传中...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- 添加种类的模态框 -->
    <div class="modal fade" id="addCategoryModal" tabindex="-1" v-if="showAddCategoryModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">添加新鸟类种类</h5>
            <button type="button" class="btn-close" @click="showAddCategoryModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="newCategoryName" class="form-label">种类名称</label>
              <input type="text" class="form-control" id="newCategoryName" v-model="newCategory.name">
            </div>
            <div class="mb-3">
              <label for="newCategoryDescription" class="form-label">描述</label>
              <textarea class="form-control" id="newCategoryDescription" rows="3" v-model="newCategory.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showAddCategoryModal = false">取消</button>
            <button type="button" class="btn btn-primary" @click="addNewCategory">添加种类</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      form: {
        title: '',
        categoryId: '',
        description: '',
        location: '',
        tags: '',
        image: null
      },
      categories: [], // 将从API获取
      validation: {
        title: '',
        categoryId: '',
        image: ''
      },
      previewUrl: null,
      isSubmitting: false,
      isDragging: false,
      showAddCategoryModal: false,
      newCategory: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    // 获取所有鸟类种类
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
        console.error("获取鸟类种类失败:", error);
      }
    },
    
    // 触发文件输入
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    // 当选择文件时
    onFileSelected(event) {
      const file = event.target.files[0];
      this.handleFile(file);
    },
    
    // 拖拽相关方法
    onDragOver(event) {
      this.isDragging = true;
    },
    
    onDragLeave(event) {
      this.isDragging = false;
    },
    
    onDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        this.handleFile(file);
      }
    },
    
    // 处理选择的文件
    handleFile(file) {
      // 检查文件类型
      if (!file.type.match('image.*')) {
        this.validation.image = '请选择图片文件';
        return;
      }
      
      // 检查文件大小（最大20MB）
      if (file.size > 20 * 1024 * 1024) {
        this.validation.image = '图片大小不能超过20MB';
        return;
      }
      
      this.form.image = file;
      this.validation.image = '';
      
      // 创建预览
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    
    // 移除选择的图片
    removeImage() {
      this.form.image = null;
      this.previewUrl = null;
      this.$refs.fileInput.value = '';
    },
    
    // 验证表单
    validateForm() {
      let isValid = true;
      
      // 重置验证信息
      this.validation = {
        title: '',
        categoryId: '',
        image: ''
      };
      
      // 验证标题
      if (!this.form.title.trim()) {
        this.validation.title = '请输入照片标题';
        isValid = false;
      }
      
      // 验证鸟类种类
      if (!this.form.categoryId) {
        this.validation.categoryId = '请选择鸟类种类';
        isValid = false;
      }
      
      // 验证是否上传了图片
      if (!this.form.image) {
        this.validation.image = '请上传一张照片';
        isValid = false;
      }
      
      return isValid;
    },
    
    // 提交表单
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      
      try {
        // 创建FormData对象用于上传文件
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('categoryId', this.form.categoryId);
        formData.append('description', this.form.description);
        formData.append('location', this.form.location);
        formData.append('tags', this.form.tags);
        formData.append('image', this.form.image);
        
        // 这里将使用axios向API发送上传请求
        // await axios.post('/api/photos', formData);
        
        // 模拟上传延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 上传成功后重置表单
        this.resetForm();
        
        // 提示用户上传成功并跳转
        alert('照片上传成功！');
        this.$router.push('/gallery');
      } catch (error) {
        console.error('上传照片失败:', error);
        alert('上传失败，请重试。');
      } finally {
        this.isSubmitting = false;
      }
    },
    
    // 重置表单
    resetForm() {
      this.form = {
        title: '',
        categoryId: '',
        description: '',
        location: '',
        tags: '',
        image: null
      };
      this.previewUrl = null;
      this.validation = {
        title: '',
        categoryId: '',
        image: ''
      };
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    
    // 添加新鸟类种类
    async addNewCategory() {
      if (!this.newCategory.name) {
        alert('请输入种类名称');
        return;
      }
      
      try {
        // 这里将使用axios向API发送添加种类的请求
        // const response = await axios.post('/api/categories', this.newCategory);
        
        // 模拟API响应
        const newCategoryResponse = {
          id: this.categories.length + 1,
          name: this.newCategory.name,
          description: this.newCategory.description
        };
        
        // 将新种类添加到列表中
        this.categories.push(newCategoryResponse);
        
        // 选择新添加的种类
        this.form.categoryId = newCategoryResponse.id;
        
        // 关闭模态框并重置表单
        this.showAddCategoryModal = false;
        this.newCategory = {
          name: '',
          description: ''
        };
        
        alert('新种类添加成功！');
      } catch (error) {
        console.error('添加种类失败:', error);
        alert('添加种类失败，请重试。');
      }
    }
  },
  mounted() {
    this.fetchCategories();
  }
}
</script>

<style scoped>
.upload-dropzone {
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-dropzone:hover {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.05);
}

.upload-dropzone.is-invalid {
  border-color: #dc3545;
}

.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.img-preview {
  max-width: 100%;
  max-height: 180px;
  object-fit: contain;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 