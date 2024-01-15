// 載入方式：ESM
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = '2023-vue';
const token = document.cookie.replace(/(?:(?:^|.*;\s*)adminToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
// 預設帶入驗證資訊
axios.defaults.headers.common['Authorization'] = token;

const app = {
  data() {
    return {
      temp: {
        category: '甜甜圈',
        content: '尺寸：14x14cm',
        description: '濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！',
        id: '-Nnrgq4Ww5y9wdiUTMS5',
        imageUrl:
          'https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        imagesUrl: [
          'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80',
          'https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        ],
        is_enabled: 1,
        origin_price: 150,
        price: 99,
        title: '草莓莓果夾心圈',
        unit: '個',
      },
      products: [],
    };
  },
  methods: {
    getProducts() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then(res => {
          this.products = Object.values(res.data.products);
          console.log(this.products);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    showDetail(id) {
      this.products.forEach(ele => {
        if (ele.id === id) {
          this.temp = ele;
        }
      });
    },
  },
  mounted() {
    this.getProducts();
  },
  created() {
    if (!token) {
      alert('請先登入');
      window.location = 'login.html';
    }
  },
};

createApp(app).mount('#app');
