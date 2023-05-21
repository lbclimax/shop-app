<template>
  <div>
    <h2>Products</h2>
    <div class="row align-items-center mb-2">
      <div class="col col-4"></div>
      <form class="col col-4 row align-items-center">
        <div class="col-auto">
          <div class="input-group">
            <div class="input-group-text">Search</div>
            <input
              type="text"
              class="form-control"
              id="productSearch"
              v-model="searchField"
              placeholder="search product"
            />
          </div>
        </div>
      </form>
      <div class="col col-4"></div>
    </div>
    <EasyDataTable :headers="headers" :items="store.products" :searchValue="searchField">
      <template #item-buyingPrice="item">
        {{ item.buyingPrice.toLocaleString() }}
      </template>
      <template #item-sellingPrice="item">
        {{ item.sellingPrice.toLocaleString() }}
      </template>
      <template #item-profit="item">
        {{ item.profit.toLocaleString() }}
      </template>
      <template #item-_id="item">
        <div class>
          <div class="badge bg-danger">delete</div>
          <div class="badge bg-primary">update</div>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script>
import { Store } from "../stores/store";
export default {
  setup() {
    const store = Store();
    return { store };
  },

  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Buying Price", value: "buyingPrice" },
        { text: "Selling Price", value: "sellingPrice" },
        { text: "Profit", value: "profit" },
        { text: "Stock", value: "remainedStock" },
        { text: "ACTION", value: "_id" },
      ],
      searchField: "",
    };
  },
};
</script>
