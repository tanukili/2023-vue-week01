// 載入方式：ESM
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
// 產品 modal 元件
import productModal from './components/ProductModal.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = '2023-vue';

// 分頁元件
const pagination = {
  props: ['pagination', 'getProducts'],
  template: `<nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: !pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{active : pagination.current_page === page}">
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{disabled: !pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
};
// 刪除 modal 元件
const delModal = {
  props: ['title', 'id', 'delProduct'],
  template: '#delModalComponent',
};

const app = {
  components: {
    pagination,
    delModal,
    productModal,
  },
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
        id: '',
      },
      productModal: '',
      delModal: '',
      products: [],
      pagination: {},
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
    getProducts(page = 1) {
      axios
        .get(`${url}/api/${path}/admin/products?page=${page}`)
        .then(res => {
          this.pagination = res.data.pagination;
          this.products = Object.values(res.data.products);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    // 新增 / 編輯
    editProduct(id = '') {
      let method = 'post';
      let apiPath = `${url}/api/${path}/admin/product`;
      if (id) {
        method = 'put';
        apiPath = `${apiPath}/${id}`;
      }
      const obj = { data: { ...this.temp } };

      axios[method](`${apiPath}`, obj)
        .then(res => {
          alert(res.data.message);
          this.resetModal('productModal');
          this.getProducts();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    getSpecificProduct(id) {
      const product = this.products.find(ele => ele.id === id);
      Object.keys(product).forEach(ele => {
        this.temp[ele] = product[ele];
      });
    },
    delProduct(id) {
      axios
        .delete(`${url}/api/${path}/admin/product/${id}`)
        .then(res => {
          alert(res.data.message);
          this.resetModal('delModal');
          this.getProducts();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    resetModal(name) {
      this[name].hide();
      // 將資料初始化：參考文章 - Vue.js 重設或還原 data 初始值的小技巧
      this.temp = this.$options.data().temp;
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
    this.productModal = new bootstrap.Modal(document.getElementById('productModal'));
    this.delModal = new bootstrap.Modal(document.getElementById('delModal'));
  },
};

createApp(app).mount('#app');
