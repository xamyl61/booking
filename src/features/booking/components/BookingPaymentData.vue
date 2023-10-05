<script setup lang="ts">
    import { ref, onMounted, reactive, watch } from 'vue';
    import { vMaska } from "maska"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import Input from '@/components/Input.vue'
    import IconCheckSuccess from '@/components/icons/IconCheckSuccess.vue'
    import type { FormInstance } from 'element-plus';
    
    import { useBookingFormStore } from '@/stores/booking-form-store';
    import { useBookingPaymentStore } from '@/stores/booking-payment-store';
    

    
    const bookingFormStore = useBookingFormStore()
    const bookingPaymentStore = useBookingPaymentStore()

    // const payment = reactive({
    //     surname: '',
    //     name: '',
    //     patronymic: '',
    //     email: '',
    //     date: '',
    //     phone: ''
    // })

    const ruleFormRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                console.log('form payment data valid!')
                bookingFormStore.formsValidateResults.push(true)
            } else {
                console.log('form payment data error!')
                bookingFormStore.formsValidateResults.push(false)
                return false
            }
        })
    }

    watch(() => bookingFormStore.needValidate, function() {
        submitForm(ruleFormRef.value)
    });

    
</script>

<template>
    <div class="my-10">
        <h3 class="title-line">Введите данные плательщика</h3>
        <div>Будет открыт бонусный счет</div>
        <el-form
            class="custom-form"
            ref="ruleFormRef"
            :model="bookingPaymentStore.bookingPayment"
        >
            <el-form-item
                prop="last_name"
                :rules="[
                    {
                        required: true,
                        message: 'Введите, пожалуйста, свою фамилию',
                        trigger: ['blur', 'change'],
                    }
                ]"    
            >
                
                <el-input 
                    v-model="bookingPaymentStore.bookingPayment.last_name"
                    placeholder="Фамилия"
                    v-maska
                    data-maska="A"
                    data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple"
                />
                <IconCheckSuccess/>
            </el-form-item>
            <el-form-item
                prop="first_name"
                :rules="[
                    {
                        required: true,
                        message: 'Введите, пожалуйста, свое имя',
                        trigger: ['blur', 'change'],
                    }
                ]"    
            >
                <el-input
                    v-model="bookingPaymentStore.bookingPayment.first_name"
                    placeholder="Имя"
                    v-maska
                    data-maska="A"
                    data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple"
                />
                <IconCheckSuccess/>
            </el-form-item>
            <el-form-item
                prop="middle_name"
                :rules="[
                    {
                        required: true,
                        message: 'Введите, пожалуйста, свою отчество',
                        trigger: ['blur', 'change'],
                    }
                ]"    
            >
                
                <el-input 
                    v-model="bookingPaymentStore.bookingPayment.middle_name"
                    placeholder="Отчество"
                    v-maska
                    data-maska="A"
                    data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple"
                />
                <IconCheckSuccess/>
            </el-form-item>
            

            <el-form-item
                prop="birthday"
                :rules="[
                    {
                        required: true,
                        message: 'Введите дату рождения',
                        trigger: ['blur', 'change'],
                    },
                ]"
            >
                <el-date-picker
                    v-model="bookingPaymentStore.bookingPayment.birthday"
                    type="date"
                    label="Pick a date"
                    placeholder="Дата рождения"
                    style="width: 100%"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                />
                <!-- <VueDatePicker
                    text-input
                    v-model="bookingPaymentStore.bookingPayment.birthday"
                    :enable-time-picker="false"
                    auto-apply
                    locale="ru"
                    position="left"
                    :six-weeks="true"
                    :offset="1"
                    menu-class-name="m-datepicker"
                    :placeholder="'Дата рождения'"
                    @update:model-value="bookingFormStore.needValidate = !bookingFormStore.needValidate"
                ></VueDatePicker> -->
                <IconCheckSuccess/>
            </el-form-item>

            <el-form-item
                prop="email"
                :rules="[
                    {
                        required: true,
                        type: 'email',
                        message: 'E-mail должен быть в формате xxx@domain.zz Пожалуйста, введите корректный e-mail',
                        trigger: ['blur', 'change'],
                    },
                ]"    
            >
                <el-input
                    v-model="bookingPaymentStore.bookingPayment.email"
                    placeholder="_____@__"
            
                />
                <IconCheckSuccess/>
            </el-form-item>

            <el-form-item
                prop="phone"
                :rules="[
                    {
                        required: true,
                        min: 16,
                        max: 16,
                        message: 'Номер телефона с кодом города состоит из 11 цифр. Пожалуйста, введите корректный номер',
                        trigger: ['blur', 'change'],
                    },
                ]"    
            >
                <el-input
                    v-model="bookingPaymentStore.bookingPayment.phone"
                    v-maska
                    data-maska="+7 ### ###-##-##"
                    placeholder="+7 ___ ___ __ __"
                />
                <IconCheckSuccess/>
            </el-form-item>
    
        </el-form>
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








