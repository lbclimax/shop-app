<template>
  <div>
    <h2>{{ isMain ? "Add Sell" : "Add Item To Sell" }}</h2>
    <div v-if="isMain">
      <div class="row g-2 me-2 mb-1 align-items-center">
        <span class="col-3"
          >Total Price :<span class="fw-bold">TSH {{ totalSell.toLocaleString() }}</span>
        </span>
        <form class="col-3">
          <div class="input-group">
            <div class="input-group-text">Discount : TSH</div>
            <input
              class="form-control"
              type="text"
              v-model="discount_txt"
              placeholder="discount"
            />
          </div>
        </form>
        <span class="col-3"
          >Total Cost :<span class="fw-bold">TSH {{ totalCost.toLocaleString() }}</span>
        </span>
        <div class="col-3 d-flex justify-content-between">
          <button
            class="btn btn-success rounded-pill"
            @click="CompleteSell"
            :disabled="sellItems.length == 0"
          >
            Complete Sell
          </button>
          <button class="btn btn-danger rounded-pill" @click="returnMain">
            Cancel Sell
          </button>
        </div>
      </div>
      <div class="row me-2">
        <span class="col-3">Items </span>
        <button class="col-1 btn btn-primary rounded-pill" @click="goItems">
          Add Item
        </button>
      </div>
      <EasyDataTable :headers="sellItemsHeaders" :items="sellItems">
        <template #item-sellingPrice="item">
          {{ item.sellingPrice.toLocaleString() }}
        </template>
        <template #item-subtotal="item">
          {{ item.subtotal.toLocaleString() }}
        </template>
        <template #item-productId="item">
          <div class="operation-wrapper">
            <img
              src="../assets/delete.png"
              class="operation-icon"
              @click="deleteItem(item)"
            />
          </div>
        </template>
      </EasyDataTable>
    </div>
    <div v-else>
      <div class="position-relative w-100">
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            v-model="productSearch"
            placeholder="Search"
            aria-label="Search"
            width="40%"
          />
        </form>
        <button
          class="position-absolute top-0 end-0 p-2 btn btn-danger rounded-pill"
          @click="returnMain"
        >
          Cancel
        </button>
      </div>
      <div>Items</div>
      <EasyDataTable
        :headers="productHeaders"
        :items="store.products"
        :searchValue="productSearch"
        @click-row="clickRow"
      >
        <template #item-sellingPrice="item">
          {{ item.sellingPrice.toLocaleString() }}
        </template>
      </EasyDataTable>
    </div>

    <div
      class="modal modal-dialog"
      id="addQuantityModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Input Quantity</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="col-form-label">Quantity:</label>
                <input
                  type="number"
                  v-model="sellItem.quantity"
                  aria-describedby="invalidQuantityfeedback"
                  class="form-control"
                  :class="quantityOk ? 'is-valid' : 'is-invalid'"
                />
                <div id="invalidQuantityfeedback" class="invalid-feedback">
                  {{ msgInvalid }}
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="addSellItem">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Store } from "../stores/store";
import { Modal } from "bootstrap/dist/js/bootstrap.esm";
export default {
  setup() {
    const store = Store();
    return { store };
  },

  data() {
    return {
      productHeaders: [
        { text: "Name", value: "name" },
        { text: "Selling Price", value: "sellingPrice" },
        { text: "Stock", value: "remainedStock" },
      ],

      sellItemsHeaders: [
        { text: "Name", value: "name" },
        { text: "Price", value: "sellingPrice" },
        { text: "Quantity", value: "quantity" },
        { text: "Sub-Total", value: "subtotal" },
        { text: "Action", value: "productId" },
      ],
      sellItems: [],
      productSearch: "",
      isMain: true,
      sellItem: {
        name: "",
        sellingPrice: 0,
        buyingPrice: 0,
        subtotal: 0,
        quantity: 0,
        productId: "",
        stockBefore: "",
      },
      addQuantityModal: null,
      msgInvalid: "",
      quantityOk: false,
      discount: 0,
    };
  },
  watch: {
    "sellItem.quantity"(value) {
      if (value == 0) {
        this.msgInvalid = "Please input quantity";
        this.quantityOk = false;
      } else if (this.sellItem.stockBefore == 0) {
        this.msgInvalid = "Item is out of stock";
        this.quantityOk = false;
      } else if (value > this.sellItem.stockBefore) {
        this.msgInvalid = "Quantity is large than Stock";
        this.quantityOk = false;
      } else this.quantityOk = true;
    },
  },
  mounted() {
    this.addQuantityModal = new Modal("#addQuantityModal", {
      backdrop: false,
      keyboard: false,
    });
  },
  computed: {
    totalSell() {
      let total = 0;
      this.sellItems.forEach((item) => {
        total += item.subtotal;
      });
      return total;
    },
    discount_txt: {
      get() {
        return this.discount.toLocaleString("en");
      },
      set(val) {
        let num = val.replace(/,/g, "").replace(/[A-Za-z]+/g, "");
        this.discount = num ? parseInt(num) : 0;
      },
      itemsToAdd() {},
    },
    totalCost() {
      return this.totalSell - this.discount;
    },
  },
  methods: {
    returnMain() {
      this.isMain = true;
      this.productSearch = "";
    },
    goItems() {
      this.isMain = false;
      this.productSearch = "";
    },
    clickRow(item) {
      console.log(item);
      this.sellItem.name = item.name;
      this.sellItem.buyingPrice = item.buyingPrice;
      this.sellItem.sellingPrice = item.sellingPrice;
      this.sellItem.productId = item._id;
      this.sellItem.stockBefore = item.remainedStock;
      this.sellItem.quantity = 0;
      this.addQuantityModal.toggle();
    },
    addSellItem() {
      if (this.quantityOk) {
        this.sellItem.subtotal = this.sellItem.quantity * this.sellItem.sellingPrice;
        this.addQuantityModal.toggle();
        this.sellItems.push(JSON.parse(JSON.stringify(this.sellItem)));
        this.returnMain();
      }
    },
    CompleteSell() {
      let time = Date.now();
      let sell = {
        time,
        sellItems: this.sellItems,
        totalCost: this.totalCost,
        totalSell: this.totalSell,
      };
      this.store.addSell(JSON.parse(JSON.stringify(sell)));
      this.$router.push("/");
    },
    deleteItem(item) {
      this.sellItems.filter((value, index, arr) => {
        if (value.productId == item.productId && item.quantity == value.quantity) {
          console.log(value, index, item);
          arr.splice(index, 1);
          return true;
        }
        return false;
        l;
      });
    },
  },
};
</script>
