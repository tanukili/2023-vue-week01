export default {
  props: ['temp', 'editProduct'],
  template: `<div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h3 class="modal-title fs-5 text-white" id="productModal">
          {{ temp.id ? '編輯產品' : '新增產品' }}
          </h3>
        </div>
        <div class="modal-body">
          <!-- modal 中使用網格 -->
          <div class="container-fluid">
            <form class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="mainImg" class="form-label">主要圖片</label>
                  <input
                    type="text"
                    id="mainImg"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model.lazy="temp.imageUrl"
                  />
                  <img
                    v-show="temp.imageUrl"
                    :src="temp.imageUrl"
                    alt="主要圖片"
                    class="img-fluid mt-2"
                  />
                </div>
                <h4 class="fs-3 mb-3">多圖新增</h4>
                <template v-if="temp.imagesUrl">
                  <div
                    class="mb-3"
                    v-for="(img, index) in temp.imagesUrl"
                    :key="index"
                  >
                    <label for="otherImg01" class="form-label">圖片網址</label>
                    <!-- 迴圈中依索引值賦予 v-model 更動數值 -->
                    <input
                      type="text"
                      id="otherImg01"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="temp.imagesUrl[index]"
                    />
                    <img
                      v-show="img"
                      :src="img"
                      :alt="'新增圖片'+ (index + 1)"
                      class="img-fluid mt-2"
                    />
                  </div>
                </template>
                <button
                  v-show="!temp.imagesUrl.length || temp.imagesUrl.at(-1)"
                  type="button"
                  class="btn btn-outline-primary btn-sm w-100"
                  @click="addImage"
                >
                  新增圖片
                </button>
                <button
                  v-show="temp.imagesUrl.length && !temp.imagesUrl.at(-1)"
                  type="button"
                  class="btn btn-outline-danger btn-sm w-100"
                  @click="delImage"
                >
                  刪除圖片
                </button>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    type="text"
                    id="title"
                    class="form-control"
                    placeholder="請輸入標題"
                    v-model="temp.title"
                  />
                </div>
                <div class="row">
                  <div class="col-md mb-3">
                    <label for="category" class="form-label">分類</label>
                    <input
                      type="text"
                      id="category"
                      class="form-control"
                      placeholder="請輸入分類"
                      v-model="temp.category"
                    />
                  </div>
                  <div class="col-md mb-3">
                    <label for="unit" class="form-label">單位</label>
                    <input
                      type="text"
                      id="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                      v-model="temp.unit"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md mb-3">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      type="number"
                      id="origin_price"
                      class="form-control"
                      placeholder="請輸入原價"
                      v-model.number="temp.origin_price"
                      min="0"
                    />
                  </div>
                  <div class="col-md mb-3">
                    <label for="price" class="form-label">售價</label>
                    <input
                      type="number"
                      id="price"
                      class="form-control"
                      placeholder="請輸入售價"
                      v-model.number="temp.price"
                      min="0"
                    />
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    id="description"
                    class="form-control"
                    placeholder="請輸入產品描述"
                    v-model="temp.description"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    id="content"
                    class="form-control"
                    placeholder="請輸入說明內容"
                    v-model="temp.content"
                  ></textarea>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="is_enabled"
                    class="form-check-input"
                    v-model="temp.is_enabled"
                    true-value="1"
                    false-value="0"
                  />
                  <label for="is_enabled" class="form-check-label">是否啟用</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="editProduct(temp.id)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    addImage() {
      this.temp.imagesUrl.push('');
    },
    delImage() {
      this.temp.imagesUrl.pop();
    },
  },
};

