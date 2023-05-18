<template>
  <main>
  <p>products {{ store.products.length }} sells {{store.sells.length}}</p>
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