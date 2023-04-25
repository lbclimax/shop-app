<template>
  <main>
  <p>products 2 {{ store.products.length }}</p>
  </main>
</template>
<script>
import {Store} from '../stores/store.js'
export default {
  setup(){
    const store= Store();
    return {store}
  }
}

</script>