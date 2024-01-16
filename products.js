// 載入方式：ESM
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = '2023-vue';

const app = {
  data() {
    return {
      temp: {
        category: '',
        content: '',
        description: '',
        imageUrl: '',
        imagesUrl: [],
        is_enabled: 0,
        origin_price: 0,
        price: 0,
        title: '',
        unit: '',
      },
      modal: '',
      products: [],
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${url}/api/user/check`)
        .then(() => {
          this.getProducts();
        })
        .catch(err => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    getProducts() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then(res => {
          this.products = Object.values(res.data.products);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    // showDetail(id) {
    //   this.products.forEach(ele => {
    //     if (ele.id === id) {
    //       this.temp = ele;
    //     }
    //   });
    // },
    // 新增 / 編輯
    editProduct(id = '') {
      const method = 'post';
      if (id) {
        method = 'put';
      }
      console.log(method);
      const obj = { data: { ...this.temp } };
      console.log(obj);

      axios[method](`${url}/api/${path}/admin/product`, obj)
        .then(res => {
          alert(res.data.message);
          this.modal.hide();
          // 將資料初始化：參考文章 - Vue.js 重設或還原 data 初始值的小技巧
          this.temp = this.$options.data().temp;
          this.getProducts();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    addImage() {
      this.temp.imagesUrl.push('');
    },
    delImage() {
      this.temp.imagesUrl.pop();
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)adminToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    // 預設帶入驗證資訊
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin(token);

    // 取得 modal 物件（為了手動操作）
    this.modal = new bootstrap.Modal(document.getElementById('productModal'));
  },
};

createApp(app).mount('#app');
