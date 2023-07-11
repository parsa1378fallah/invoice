<template>
  <div>
    <p class="text-xs text-white mr-1">{{ title }}</p>
    <input
      class="border-0 outline-0 bg-white rounded px-2 py-1 w-full"
      type="text"
      :disabled="disabled"
      v-model="inputValue"
      @input="updateValue()"
      
    />
  </div>
</template>

<script setup>
import {ref , toRefs} from "vue"

const props = defineProps({
  title: String,
  disabled: Boolean,
  modelValue : {
    type  : [String , Number],
    required :  false
  }
});
const emits = defineEmits(['update:modelValue' ])
const updateValue = ()=>{
  emits('update:modelValue', inputValue.value);
}
const { modelValue } = toRefs(props);
const inputValue = ref(modelValue.value) ;


</script>

<style></style>
