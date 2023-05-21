<template>
  <div>
    <h2>Sells</h2>
    <EasyDataTable
      :headers="headers"
      :items="store.sells"
      sort-type="desc"
      sort-by="time"
    >
      <template #item-time="item">
        {{ formatDate(item.time) }}
      </template>
      <template #item-sellItems="item">
        {{ item.sellItems.length }}
      </template>

      <template #item-totalCost="item">
        {{ item.totalCost.toLocaleString() }}
      </template>

      <template #item-totalProfit="item">
        {{ item.totalProfit.toLocaleString() }}
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
        { text: "Date", value: "time" },
        { text: "No of Items", value: "sellItems" },
        { text: "Total Sell ", value: "totalCost" },
        { text: "Profit", value: "totalProfit" },
        { text: "ACTION", value: "_id" },
      ],
    };
  },
  methods: {
    formatDate(time) {
      let dateObj = new Date(time);
      let month = dateObj.getMonth() + 1;
      return (
        "" +
        dateObj.getDate() +
        "/" +
        month +
        "/" +
        dateObj.getFullYear() +
        " " +
        dateObj
          .getHours()
          .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) +
        ":" +
        dateObj
          .getMinutes()
          .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
      );
    },
  },
};
</script>
