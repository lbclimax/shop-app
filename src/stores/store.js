import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const Store = defineStore('store', () => {
  const products=ref([])
  const  productsCount = computed(() => products.value.length)
  async function addProduct(product) {
    product= JSON.parse(product);
    console.log('product',product);
   window.db.addProduct(product)
  }
  // handle recive of one added product
  window.db.handleAddProduct((event,product)=>{
    products.value.push(product)
    console.log('products',products.value);
  })

  //handle recive of all product in database
  
  window.db.handleProducts((event,docs)=>{
    products.value=docs;
  })
  window.db.getProducts();
  return { products,productsCount,addProduct}
})
