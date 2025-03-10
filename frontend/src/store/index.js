import { createStore } from 'vuex'

export default createStore({
  state: {
    photos: [],
    categories: [],
    isLoading: false,
    error: null,
    user: null
  },
  getters: {
    getPhotoById: (state) => (id) => {
      return state.photos.find(photo => photo.id === id)
    },
    getPhotosByCategory: (state) => (categoryId) => {
      return state.photos.filter(photo => photo.categoryId === categoryId)
    },
    isAuthenticated: (state) => {
      return !!state.user
    }
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_PHOTOS(state, photos) {
      state.photos = photos
    },
    ADD_PHOTO(state, photo) {
      state.photos.unshift(photo)
    },
    UPDATE_PHOTO(state, updatedPhoto) {
      const index = state.photos.findIndex(p => p.id === updatedPhoto.id)
      if (index !== -1) {
        state.photos.splice(index, 1, updatedPhoto)
      }
    },
    DELETE_PHOTO(state, photoId) {
      state.photos = state.photos.filter(p => p.id !== photoId)
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    ADD_CATEGORY(state, category) {
      state.categories.push(category)
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchPhotos({ commit }) {
      try {
        commit('SET_LOADING', true)
        // 这里将使用axios从API获取照片数据
        // const response = await axios.get('/api/photos')
        // const photos = response.data
        
        // 模拟API响应
        const photos = [
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
        ]
        
        commit('SET_PHOTOS', photos)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', '获取照片失败')
        console.error('获取照片失败:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchCategories({ commit }) {
      try {
        commit('SET_LOADING', true)
        // 这里将使用axios从API获取类别数据
        // const response = await axios.get('/api/categories')
        // const categories = response.data
        
        // 模拟API响应
        const categories = [
          { id: 1, name: "海鸥科" },
          { id: 2, name: "隼科" },
          { id: 3, name: "鸭科" },
          { id: 4, name: "鸮形目" }
        ]
        
        commit('SET_CATEGORIES', categories)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', '获取类别失败')
        console.error('获取类别失败:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async uploadPhoto({ commit }, photoData) {
      try {
        commit('SET_LOADING', true)
        // 这里将使用axios向API发送上传请求
        // const response = await axios.post('/api/photos', photoData)
        // const newPhoto = response.data
        
        // 模拟API响应
        const newPhoto = {
          id: Date.now(),
          title: photoData.get('title'),
          categoryId: parseInt(photoData.get('categoryId')),
          categoryName: "模拟类别",
          imageUrl: "https://example.com/new-image.jpg",
          uploadDate: new Date()
        }
        
        commit('ADD_PHOTO', newPhoto)
        commit('SET_ERROR', null)
        return newPhoto
      } catch (error) {
        commit('SET_ERROR', '上传照片失败')
        console.error('上传照片失败:', error)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async addCategory({ commit }, categoryData) {
      try {
        commit('SET_LOADING', true)
        // 这里将使用axios向API发送添加类别的请求
        // const response = await axios.post('/api/categories', categoryData)
        // const newCategory = response.data
        
        // 模拟API响应
        const newCategory = {
          id: Date.now(),
          name: categoryData.name,
          description: categoryData.description
        }
        
        commit('ADD_CATEGORY', newCategory)
        commit('SET_ERROR', null)
        return newCategory
      } catch (error) {
        commit('SET_ERROR', '添加类别失败')
        console.error('添加类别失败:', error)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}) 