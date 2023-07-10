import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {useRouter} from "vue-router";
const router = useRouter() 

export const useInvoicesStore = defineStore("invoices", () => {
  const value = ref([
    {
      billFrom: {
        address: "تهران / میدان ساعت / خیابان انقلاب ",
        country: "ایران",
        city: "تهران",
        postalCode: "152463",
      },
      billTo: {
        clientName: "پارسا",
        email: "parsaddbb@gmail.com",
        address: "ساری / میدان امام / کوچه هفتم",
        city: "ساری",
        postalCode: "15875369",
        country: "ایران",
        invoiceDate: "23/07/2023",
        paymentDue: "23/08/2023",
        itemLists: [
          {
            name: "ماژیک",
            qty: 12,
            price: 180,
            get total() {
              return this.price * this.qty;
            },
          },
        ],
      },
      status: "paid",
      id: "B6c7H5",
    },
  ]);
  function addInvoice(item) {
    value.value.push(item);
  }
  function deleteCurrentInvoice(id){
    value.value.splice(value.value.indexOf(el => el.id === id), 1);
  }
  function editInvoice(id , item)
  {
    value.value.splice(value.value.indexOf(el => el.id === id), 1 , item)
    router.push('/invoice')
  }
  return { value, addInvoice ,deleteCurrentInvoice,editInvoice };
});
