<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { vMaska } from "maska"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import Input from '@/components/Input.vue'


    const first_name = ref('')
    const last_name = ref('')
    const middle_name = ref('')
    const email = ref('')
    const date = ref('')
    const phone = ref('')

    const paymentGuest = reactive({
        first_name: first_name,
        last_name: last_name,
        middle_name: middle_name,
        email: email,
        date: date,
        phone: phone
    })


    onMounted(() => {
    
    })
    
</script>

<template>
    <div>
        <h3 class="title-line">Введите данные плательщика</h3>
        <div>Будет открыт бонусный счет</div>
        <div class="grid grid-cols-3 gap-4">
            <div class="">
                <Input @input="$emit('updatePaymentData', $event, paymentGuest)" v-model="first_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Фамилия" />
            </div>
            <div class="">
                <Input @input="$emit('updatePaymentData', $event, paymentGuest)" v-model="last_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Имя" />
            </div>
            <div class="">
                <Input @input="$emit('updatePaymentData', $event, paymentGuest)" v-model="middle_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Отчество" />
            </div>
            <div class="">
                <VueDatePicker
                        v-model="date"
                        :enable-time-picker="false"
                        auto-apply
                        locale="ru"
                        position="left"
                        :six-weeks="true"
                        :offset="1"
                        menu-class-name="m-datepicker"
                        @update:model-value="$emit('updatePaymentData', $event, paymentGuest)"
                >

                </VueDatePicker>
            </div>
            <div class="">
                <Input @input="$emit('updatePaymentData', $event, paymentGuest)" v-model="email" v-maska data-maska="" placeholder="_____@__" />
            </div>
            <div class="">
                <Input @input="$emit('updatePaymentData', $event, paymentGuest)" v-model="phone" v-maska data-maska="+7 ### ###-##-##" placeholder="+7 ___ ___ __ __" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">

.title-line {
    font-size: 1.4rem;
}
.mask-complited {
    box-shadow: 0px 0px 0px 1px green!important;
}





</style>








