<template>
  <button  :class="{'rounded-full': rounded}">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
    href : String,
    rounded : Boolean, 
})
</script>

<style>

</style>