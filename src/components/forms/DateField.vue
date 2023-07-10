<template>
  <div>
    <p class="text-xs text-white mr-1">{{ title }}</p>
    <input
      class="border-0 outline-0 bg-white rounded px-2 py-1 w-full text-xs"
      type="date"
      v-model="inputValue"
    />
  </div>
</template>

<script setup>
import {ref , toRefs , watch} from "vue"
const props = defineProps({
  title: String,
  disabled: Boolean,
  items : Array,
  modelValue : {
    type  : String,
    required :  false
  }
});
const emits = defineEmits(['update:modelValue' ])
const updateValue = ()=>{
  emits('update:modelValue', inputValue.value);
}
const { modelValue } = toRefs(props);
const inputValue = ref(modelValue.value) ;
 watch(inputValue, ( newValue, oldValue ) => {
     emits('update:modelValue', newValue);
  })
</script>

<style></style>
