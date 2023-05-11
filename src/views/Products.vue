<template>
  <div>
    <h2>Products</h2>
    <EasyDataTable :headers="headers" :items="store.products">
      <template #item-buyingPrice="item">
        {{ item.buyingPrice.toLocaleString() }}
      </template>
      <template #item-sellingPrice="item">
        {{ item.sellingPrice.toLocaleString() }}
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
        { text: "Stock", value: "remainedStock" },
        { text: "ACTION", value: "_id" },
      ],
    };
  },
};
</script>
