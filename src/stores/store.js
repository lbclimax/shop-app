import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const Store = defineStore('store', () => {
  const products=ref([])
  const sells=ref([])
  const  productsCount = computed(() => products.value.length)
  async function addProduct(product) {
    product= JSON.parse(product);
    console.log('product',product);
   window.db.addProduct(product)
  }

  function addSell(sell){
    window.db.addSell(sell)
  }
  // handle recive of one added product
  window.db.handleAddProduct((event,product)=>{
    products.value.push(product)
    console.log('products added');
  })

  //handle recive of all product in database
  
  window.db.handleProducts((event,docs)=>{
    products.value=docs;
  })
  window.db.getProducts();


  // handle recive of one added sell
  window.db.handleAddSell((event,sell)=>{
    sells.value.push(sell)
    console.log('sell added');
  })

   //handle recive of all product in database
   window.db.handleSells((event,docs)=>{
    sells.value=docs;
  })
  window.db.getProducts();
  window.db.getSells();

  return {sells, products,productsCount,addProduct,addSell}
})
