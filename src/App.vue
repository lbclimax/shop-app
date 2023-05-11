<script setup>
import { RouterLink, RouterView } from "vue-router";
import { Store } from "./stores/store.js";
import AddProductDialog from "./components/AddProductDialog.vue";
const store = Store();
</script>

<template>
  <div class="d-flex">
    <div id="panel">
      <ul class="nav nav-pills flex-column w-100">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" activeClass="active"
            ><v-icon name="ri-home-6-line" inverse="true" label="lukelo" />
            Dashboard</RouterLink
          >
        </li>
        <li class="nav-item">
          <v-icon name="gi-take-my-money" inverse="true" label="lukelo" /> Sells
        </li>
        <li class="nav-item">
          <RouterLink to="/"
            ><v-icon name="si-bem" inverse="true" label="lukelo" /> Stocks</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/products" class="nav-link" activeClass="active"
            ><v-icon name="fa-ring" inverse="true" label="lukelo" /> Products</RouterLink
          >
        </li>

        <hr />
        <li class="nav-item">
          <v-icon name="ri-home-6-line" inverse="true" label="lukelo" /> Add product
        </li>
        <li>
          <button
            type="button"
            class="btn btn-primary w-100 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#addProductDialog"
          >
            Add product
          </button>
        </li>

        <li>
          <RouterLink to="addSell" activeClass="succes"
            ><button type="button" class="btn btn-primary mb-2 w-100">
              Add Sell
            </button></RouterLink
          >
        </li>
      </ul>
    </div>
    <RouterView id="content" />
    <AddProductDialog />
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return { node: 1 };
  },
};
</script>
