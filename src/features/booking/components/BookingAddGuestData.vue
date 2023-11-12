<script setup lang="ts">
    import { ref, onMounted, reactive, type PropType, computed, watch } from 'vue';
    import { vMaska } from "maska"
    import type { FormInstance, FormRules } from 'element-plus'
    import { useBookingRoomsStore } from '@/stores/booking-store';
    import type { IBookingInfoData } from '@/features/booking/types/IBookingInfoData';
    import { useBookingFormStore } from '@/stores/booking-form-store';

    import IconCheckSuccess from '@/components/icons/IconCheckSuccess.vue'
    
    const bookingStore = useBookingRoomsStore()

    // const birthday = ref<any>()
    const adults = ref<number>(0)
    const сhildren = ref<number>(0)
    const guests = ref<number>(0)

    
    const props = defineProps({
        booking: {
            type: Object as PropType<IBookingInfoData>,
            required: true
        },
        bookingIndex: {
            type: Number,
            required: true
        }
    })
        
        
    const bookingFormStore = useBookingFormStore()
    const formRefs = ref<FormInstance[]>([])

    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                bookingFormStore.formsValidateResults.push(true)
            } else {
                bookingFormStore.formsValidateResults.push(false)
                return false
            }
        })
    }

    watch(() => bookingFormStore.needValidate, function() {
        formRefs.value.forEach(element => {
            submitForm(element)
        });
    });

    onMounted(() => {
        adults.value = props.booking.adults
        сhildren.value = props.booking.сhildren
        guests.value = adults.value + сhildren.value
    })

</script>

<template>
    <div>
        <div class="enter-guest-details mt-10">
            <h3 class="title-line">Введите данные гостей</h3>
            <div v-for="(guest, index) in guests" :key="guest">
                <div class="my-4">
                    <b class="text-sm">
                        Гость {{ index + 1 }}.
                        <span v-if="сhildren && index + 1 == guests">Ребенок</span>
                        <span v-else>Взрослый</span>
                    </b>
                </div>
                <el-form
                    class="custom-form"
                    ref="formRefs"
                    :model="bookingFormStore.bookingForm[bookingIndex -1].guests[index]"
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
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].last_name"
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
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].first_name"
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
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].middle_name"
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
                            popper-class="el-datepicker-styles"
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].birthday"
                            type="date"
                            label="Pick a date"
                            placeholder="Дата рождения"
                            style="width: 100%"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        >
                        </el-date-picker>

                        <!-- <VueDatePicker
                            text-input
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].birthday"
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
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].email"
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
                            v-model="bookingFormStore.bookingForm[bookingIndex-1].guests[index].phone"
                            v-maska
                            data-maska="+7 ### ###-##-##"
                            placeholder="+7 ___ ___ __ __"
                        />
                        <IconCheckSuccess/>
                    </el-form-item>
         
                </el-form>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">


</style>








