<template>
  <div
    class="modal"
    id="addProductDialog"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="product.name"
                  placeholder="place product name"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="BuyingPrice" class="col-sm-2 col-form-label"
                >Buying Price</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="BuyingPrice"
                  required
                  v-model="buying_price_txt"
                />
              </div>
            </div>

            <div class="mb-3 row">
              <label for="SellingPrice" class="col-sm-2 col-form-label"
                >Selling Price</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="SellingPrice"
                  required
                  v-model="selling_price_txt"
                />
              </div>
            </div>

            <div class="mb-3 row">
              <label for="currentStock" class="col-sm-2 col-form-label"
                >Current Stock</label
              >
              <div class="col-sm-10">
                <input
                  type="number"
                  class="form-control"
                  id="currentStock"
                  required
                  v-model="product.remainedStock"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addProduct">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Store } from "../stores/store.js";
import { Modal } from "bootstrap/dist/js/bootstrap.esm";
export default {
  setup() {
    const store = Store();
    return { store };
  },
  data() {
    return {
      product: { name: "", buyingPrice: 0, sellingPrice: 0, remainedStock: 0 },
    };
  },
  methods: {
    addProduct() {
      this.product.profit=this.product.sellingPrice-this.product.buyingPrice;
      this.store.addProduct(JSON.stringify(this.product));
      const myModal = Modal.getInstance("#addProductDialog");
      if (myModal) myModal.toggle();
      this.product = {
        name: "",
        buyingPrice: 0,
        sellingPrice: 0,
        remainedStock: 0,
      };
    },
  },
  computed: {
    buying_price_txt: {
      get() {
        return this.product.buyingPrice.toLocaleString("en");
      },
      set(val) {
        let num = val.replace(/,/g, "").replace(/[A-Za-z]+/g, "");
        this.product.buyingPrice = parseInt(num);
      },
    },
    selling_price_txt: {
      get() {
        return this.product.sellingPrice.toLocaleString("en");
      },
      set(val) {
        let num = val.replace(/,/g, "").replace(/[A-Za-z]+/g, "");
        this.product.sellingPrice = parseInt(num);
      },
    }
  },
};
</script>
