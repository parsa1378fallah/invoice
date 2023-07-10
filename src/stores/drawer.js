import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", () => {
  const value = ref(false);
  function toggle() {
    value.value = !value.value;
  }
  function open() {
    value.value = true;
  }
  function close() {
    value.value = false;
  }
  return { value, toggle , open , close };
});
