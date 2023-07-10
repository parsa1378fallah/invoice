<template>
  <div class="container h-screen flex justify-center">
    <div class="w-[45rem] flex flex-col p-10">
      <div class="flex flex-row justify-between items-center mb-8">
        <div class="flex flex-col">
          <h1 class="text-2xl text-white">صورت حساب ها</h1>
          <p class="text-xs text-white">
            تعداد {{ invoices.value.length }} تا صورت حساب وجود دارد
          </p>
        </div>
        <div class="flex flex-row gap-2">
          <select-field :items="filterInvoices"></select-field>
          <Button
            @click="drawer.open()"
            rounded
            class="bg-indigo-600 text-white text-xs px-3"
            >صورت حساب جدید</Button
          >
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div
          class="w-full bg-slate-700 h-16 grid grid-cols-4 items-center justify-center rounded-3xl px-5 text-center"
          v-for="item in invoices.value"
          :key="item"
        >
          <p class="text-white text-xs">آیدی : {{ item.id }}</p>
          <p class="text-white text-xs">
            زمان پرداخت : {{ item.billTo.paymentDue }}
          </p>
          <router-link :to="{ name: 'invoice', params: { id: item.id } }"
            ><p class="text-white text-xs">
              {{ item.billTo.clientName }}
            </p></router-link
          >
          <div
            class="flex justify-center items-center px-3 py-2 rounded-lg text-xs"
            :class="{
              'bg-green-200': item.status === 'paid',
              'bg-red-200': item.status === 'pending',
              'bg-slate-200': item.status === 'draft',
            }"
          >
            <p class="text-green-700" v-if="item.status === 'paid'">
              پرداخت شده
            </p>
            <p class="text-green-700" v-else-if="item.status === 'pending'">
              در حال انتظار
            </p>
            <p class="text-slate-500" v-else-if="item.status === 'draft'">
              پیش نویس
            </p>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <cover v-if="drawer.value" @click="drawer.close()"></cover>
    </transition>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import SelectField from "../components/forms/SelectField.vue";
import Button from "../components/button/Button.vue";
import { useDrawerStore } from "../stores/drawer.js";
import { useInvoicesStore } from "../stores/invoices.js";
import Cover from "../components/cover/Cover.vue";
const drawer = useDrawerStore();
const invoices = useInvoicesStore();
const filterInvoices = [
  { key: "پیشنویس", value: 1 },
  { key: "در حال انتظار", value: 2 },
  { key: "تایید شده", value: 3 },
];
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 1;
}
</style>
