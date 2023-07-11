<template>
  <div
    class="w-20 h-screen fixed top-0 right-0 bg-slate-800 rounded-l-2xl z-10"
  >
    <div class="w-full h-full bg-slate-900 z-30">
      <div
        class="invoice-toggler w-full h-20 rounded-l-2xl bg-indigo-500 flex justify-center items-center cursor-pointer z-20"
        @click="drawer.toggle()"
      >
        <v-icon size="large" color="grey-lighten-5" icon="mdi-domain"></v-icon>
      </div>
    </div>

    <transition>
      <div
        class="absolute w-96 h-full overflow-x-hidden top-0 right-full bg-slate-800 flex flex-col p-4 rounded-l-2xl no-scrollbar border-l border-lime-50"
        v-if="drawer.value"
      >
        <h1 class="text-xl text-white">صورت حساب جدید</h1>
        <p class="text-xs text-indigo-600 my-3">صورت حساب مبدا</p>
        <text-field
          title="آدرس"
          class="mb-3"
          v-model="invoiceData.billFrom.address"
        ></text-field>
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-1">
          <text-field
            title="کشور"
            v-model="invoiceData.billFrom.country"
          ></text-field>
          <text-field
            title="شهر"
            v-model="invoiceData.billFrom.city"
          ></text-field>
          <text-field
            title="کد پستی"
            v-model="invoiceData.billFrom.postalCode"
          ></text-field>
        </div>
        <p class="text-xs text-indigo-600 my-3">صورت حساب مقصد</p>
        <text-field
          title="نام مشتری"
          class="mb-3"
          v-model="invoiceData.billTo.clientName"
        ></text-field>
        <text-field
          title="ایمیل مشتری"
          class="mb-3"
          v-model="invoiceData.billTo.email"
        ></text-field>
        <text-field
          title="آدرس مشتری"
          class="mb-3"
          v-model="invoiceData.billTo.address"
        ></text-field>
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-1 mb-3">
          <text-field
            title="کشور"
            v-model="invoiceData.billTo.country"
          ></text-field>
          <text-field
            title="شهر"
            v-model="invoiceData.billTo.city"
          ></text-field>
          <text-field
            title="کد پستی"
            v-model="invoiceData.billTo.postalCode"
          ></text-field>
        </div>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-1 mb-3">
          <date-field
            v-model="invoiceData.billTo.invoiceDate"
            title="زمان سفارش"
          ></date-field>
          <date-field
            v-model="invoiceData.billTo.paymentDue"
            disabled
            title="سررسید پرداخت"
          ></date-field>
        </div>
        <select-field
          title="شرایط پرداخت"
          :items="paymentTermsItems"
          class="mb-3"
          v-model="invoiceData.billTo.paymentTerms"
        ></select-field>
        <text-field
          v-model="invoiceData.billTo.describeProduct"
          title="توضیحات محصول"
          class="mb-3"
        ></text-field>
        <p class="text-base text-slate-400 mb-3">لیست اقلام</p>
        <div
          class="item grid sm:grid-cols-5 grid-cols-1 gap-1 mb-3 items-center"
        >
          <text-field title="نام آیتم" v-model="nameItemList"></text-field>
          <text-field title="تعداد" v-model="qtyItemList"></text-field>
          <text-field title="قیمت" v-model="priceItemList"></text-field>
        </div>
        <div
          class="item grid sm:grid-cols-5 grid-cols-1 gap-1 mb-3 items-center"
          v-for="(item, index) in invoiceData.billTo.itemLists"
          :key="item.name"
        >
          <text-field
            disabled
            title="نام آیتم"
            v-model="item.name"
          ></text-field>
          <text-field disabled title="تعداد" v-model="item.qty"></text-field>
          <text-field disabled title="قیمت" v-model="item.price"></text-field>
          <text-field disabled title="مجموع" v-model="item.total"></text-field>
          <v-icon @click="invoiceData.billTo.itemLists.splice(index, 1)"
            >mdi-delete</v-icon
          >
        </div>
        <Button @click="addItem" class="bg-sky-950 py-3 text-white mb-3" rounded
          >اضافه کردن مورد جدید</Button
        >
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            @click="addNewInvoice()"
            v-if="!invoiceRoute"
            rounded
            class="bg-green-600 py-3 px-2 text-white text-xs"
            >ساخت صورت حساب</Button
          >
          <Button
            @click="editCurrentInvoice()"
            v-if="invoiceRoute"
            rounded
            class="bg-sky-950 py-3 text-white text-xs"
            >ویرایش</Button
          >
          <Button
            @click="addNewDraft()"
            v-if="!invoiceRoute"
            rounded
            class="bg-sky-950 py-3 text-white text-xs"
            >ذخیره پیش نویس</Button
          >
          <Button
            @click="drawer.toggle()"
            
            rounded
            class="bg-red-700 py-3 text-white text-xs"
            >انصراف</Button
          >
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import TextField from "../forms/TextField.vue";
import DateField from "../forms/DateField.vue";
import SelectField from "../forms/SelectField.vue";
import Button from "../button/Button.vue";
import { useDrawerStore } from "../../stores/drawer.js";
import { useInvoicesStore } from "../../stores/invoices.js";
import { v4 as uuidv4 } from "uuid";
const drawer = useDrawerStore();
const invoices = useInvoicesStore();
const router = useRouter();
const route = useRoute();
const invoiceRoute = ref(false);
router.afterEach((to) => {
  if (to.name === "invoice") {
    invoiceRoute.value = true;
    invoices.value.forEach((el) => {
      if (el.id === route.params.id) {
        invoiceData.value = JSON.parse(JSON.stringify(el));
        return;
      }
    });
  } else {
    invoiceRoute.value = false;
    setInvoiceDataAsDefult();
  }
});
const addNewInvoice = () => {
  invoiceData.value.status = "paid";
  invoiceData.value.id = `${uuidv4().substring(0, 6)}`;
  invoices.addInvoice(JSON.parse(JSON.stringify(invoiceData.value)));
};
const editCurrentInvoice = ()=>{
  invoices.editInvoice(route.params.id , JSON.parse(JSON.stringify(invoiceData.value)) )
}
const addNewDraft = () => {
  invoiceData.value.status = "draft";
  invoiceData.value.id = `${uuidv4().substring(0, 6)}`;
  invoices.addInvoice(JSON.parse(JSON.stringify(invoiceData.value)));
};

const paymentTermsItems = [
  { key: "30 روزه", value: 0 },
  { key: "60 روزه", value: 1 },
];

const addItem = () => {
  invoiceData.value.billTo.itemLists.push({
    name: nameItemList.value,
    qty: qtyItemList.value,
    price: priceItemList.value,
    get total() {
      return this.price * this.qty;
    },
  });
  nameItemList = ref("");
  qtyItemList = ref("");
  priceItemList = ref("");
  totalItemList = ref("");
};
const nameItemList = ref("");
const qtyItemList = ref("");
const priceItemList = ref("");
const totalItemList = ref("");

const invoiceData = ref({
  billFrom: {
    address: "",
    country: "",
    city: "",
    postalCode: "",
  },
  billTo: {
    clientName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    invoiceDate: "",
    paymentTerms: "",
    get paymentDue() {
      const paymentDueDate = new Date(this.invoiceDate);
      const paymentTerms = this.paymentTerms;
      if (paymentTerms === 0) {
        paymentDueDate.setMonth(paymentDueDate.getMonth() + 1);
        return paymentDueDate.toISOString().split("T")[0];
      } else if (paymentTerms === 1) {
        paymentDueDate.setMonth(paymentDueDate.getMonth() + 2);
        return paymentDueDate.toISOString().split("T")[0];
      }
    },
    itemLists: [],
    describeProduct: "",
  },
  status: "",
});

const setInvoiceDataAsDefult = ()=>{
  invoiceData.value = {
  billFrom: {
    address: "",
    country: "",
    city: "",
    postalCode: "",
  },
  billTo: {
    clientName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    invoiceDate: "",
    paymentTerms: "",
    get paymentDue() {
      const paymentDueDate = new Date(this.invoiceDate);
      const paymentTerms = this.paymentTerms;
      if (paymentTerms === 0) {
        paymentDueDate.setMonth(paymentDueDate.getMonth() + 1);
        return paymentDueDate.toISOString().split("T")[0];
      } else if (paymentTerms === 1) {
        paymentDueDate.setMonth(paymentDueDate.getMonth() + 2);
        return paymentDueDate.toISOString().split("T")[0];
      }
    },
    itemLists: [],
    describeProduct: "",
  },
  status: "",
};
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  z-index: -1;
  transform: translateX(0%);
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  z-index: -1;
  transform: translateX(100%);
}
</style>
