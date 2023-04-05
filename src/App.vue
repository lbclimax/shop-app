<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div></div>
  <div id="panel">
    <ul class="nav flex-column  w-100 ">
      <li>
        <div class="dropdown">
          <button class="btn btn-success  rounded-pill dropdown-toggle w-100" type="button" data-bs-toggle="dropdown"
            aria-expanded="false"> +
            Add </button>
          <ul class="dropdown-menu">
            <li><span class="dropdown-item">Add Sell</span></li>
            <li><span class="dropdown-item">Add Stosk</span></li>
            <li><span class="dropdown-item">Add Product</span></li>
          </ul>
        </div>


      </li>
      
    </ul>
  </div>

  <RouterView />
</template>
<script>
export default {
  created() {

  },
  data() {
    return { node: 1 }
  }
}
</script>


