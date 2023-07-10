<template>
  <div>
    <div class="container h-screen flex justify-center">
      <div class="w-[45rem] flex flex-col p-10">
        <div class="flex flex-row-reverse mb-4 text-white">
          <router-link to="/">بازگشت به صفحه اصلی</router-link>
        </div>
        <div
          class="flex flex-row justify-between bg-slate-900 rounded-2xl py-4 px-8 mb-4"
        >
          <div>
            <div
              class="flex justify-center items-center px-3 py-2 rounded-lg text-xs"
              :class="{
                'bg-green-200': currentClient[0].status === 'paid',
                'bg-red-200': currentClient[0].status === 'pending',
                'bg-slate-200': currentClient[0].status === 'draft',
              }"
            >
              <p
                class="text-green-700"
                v-if="currentClient[0].status === 'paid'"
              >
                پرداخت شده
              </p>
              <p
                class="text-green-700"
                v-else-if="currentClient[0].status === 'pending'"
              >
                در حال انتظار
              </p>
              <p
                class="text-slate-500"
                v-else-if="currentClient[0].status === 'draft'"
              >
                پیش نویس
              </p>
            </div>
          </div>
          <div class="flex flex-row gap-3 text-xs">
            <Button
              class="px-4 py-2 bg-green-600 text-white"
              @click="drawer.open()"
              rounded
              >ویرایش</Button
            >
            <Button
              class="px-4 py-2 bg-red-600 text-white"
              @click="deleteCurrentInvoice()"
              rounded
              >حذف</Button
            >
            <Button class="px-4 py-2 bg-slate-600 text-white" rounded
              >پرداخت شد</Button
            >
          </div>
        </div>
        <div class="flex flex-col bg-slate-900 rounded-2xl py-4 px-8 gap-4">
          <div class="flex flex-row justify-between text-white">
            <p>{{ currentClient[0].billTo.clientName }}</p>
            <p>{{ currentClient[0].id }}</p>
          </div>
          <div class="flex flex-row justify-between text-white">
            <p>تاریخ سفارش : {{ currentClient[0].billTo.invoiceDate }}</p>
            <p>تاریخ پرداخت : {{ currentClient[0].billTo.paymentDue }}</p>
          </div>
          <div class="flex flex-row justify-between text-white">
            <p>آدرس فرستنده : {{ currentClient[0].billFrom.address }}</p>
          </div>
          <div class="flex flex-row justify-between text-white">
            <p>آدرس گیرنده : {{ currentClient[0].billTo.address }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-white mb-4">سفارشات</p>
            <div
              class="item grid sm:grid-cols-5 grid-cols-1 gap-1 mb-3 items-center"
              v-for="item in currentClient[0].billTo.itemLists"
              :key="item.name"
            >
              <text-field
                disabled
                title="نام آیتم"
                v-model="item.name"
                class="ml-10"
              ></text-field>
              <text-field
                disabled
                title="تعداد"
                v-model="item.qty"
              ></text-field>
              <text-field
                disabled
                title="قیمت"
                v-model="item.price"
              ></text-field>
              <text-field
                disabled
                title="مجموع"
                v-model="item.total"
              ></text-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <cover v-if="drawer.value" @click="drawer.close()"></cover>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import Cover from "../components/cover/Cover.vue";
import Button from "../components/button/Button.vue";
import TextField from "../components/forms/TextField.vue";
const route = useRoute();
const router = useRouter();
import { useInvoicesStore } from "../stores/invoices.js";
const invoices = useInvoicesStore();

import { useDrawerStore } from "../stores/drawer.js";
const drawer = useDrawerStore();
let currentClient = ref(
  invoices.value.filter((el) => el.id == route.params.id)
);
const deleteCurrentInvoice = () => {
  invoices.deleteCurrentInvoice(route.params.id);
  router.push("/");
};
watch(invoices, (newValue, oldValue) => {
  console.log(newValue.value);
  currentClient = invoices.value.filter((el) => el.id == route.params.id);
});
</script>

<style></style>
