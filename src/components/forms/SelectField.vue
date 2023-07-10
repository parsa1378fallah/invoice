<template>
  <div>
    <p class="text-xs text-white mr-1">{{ title }}</p>
    <select
      class="border-0 outline-0 bg-white rounded px-2 py-1 w-full text-base"
      v-model="inputValue"
    >
      <option class="text-xs" disabled selected value="">انتخاب کنید</option>
      <option v-for="item in items" :key="item.value" :value="item.value">{{ item.key }}</option>
    </select>
  </div>
</template>

<script setup>
import {ref , toRefs , watch} from "vue"
const props = defineProps({
  title: String,
  disabled: Boolean,
  items : Array,
  modelValue : {
    type  : Number,
    required :  false
  }
});
const emits = defineEmits(['update:modelValue' ])
const updateValue = ()=>{
  emits('update:modelValue', inputValue.value);
}
const { modelValue } = toRefs(props);
// console.log(modelValue.value)
const inputValue = ref(modelValue.value) ;
 watch(inputValue, ( newValue, oldValue ) => {
     emits('update:modelValue', inputValue.value);
  })
</script>

<style></style>
