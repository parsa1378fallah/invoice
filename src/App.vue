<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/sidebar/Sidebar.vue"
</script>
<template>
<div>
  <sidebar></sidebar>
  <RouterView />
</div> 
</template>
<style>
* {
  direction: rtl;
  margin: 0;
  padding: 0;
  font-family: vazir;
 
}
body{
   background: #2a2727;
}
i.v-icon.v-icon {
  background: transparent;
} 
</style>
