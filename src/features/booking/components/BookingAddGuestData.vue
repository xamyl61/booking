<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { vMaska } from "maska"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import Button from '@/components/Button.vue';
    import Input from '@/components/Input.vue'

    const maskedValue1 = ref('')

    const maskedValue = ref<any>({})

    const bindedObject = reactive<any>({})
    const bindedObject2 = reactive({
        completed: false,
        masked: false,
        unmasked: false
    })

    const firstName = ref('')
    const secondName = ref('')
    const patronymic = ref('')

    const phone = ref('')
    const email = ref('')
    const date = ref('')

    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber);

        return date.toLocaleString('ru', {
            month: 'long',
        });
    }
    
</script>

<template>
    <div>
        <div class="enter-guest-details mt-10">
            <!-- maskedValue: {{ maskedValue }}
            <div v-for="item in [0,1,2,3]">

                <Input
                    v-model="maskedValue['input-' + item]"
                    :dataMaska="'#-#'"
                    placeholder="3-3"/>
            </div> -->

            <h3 class="title-line">Введите данные гостей</h3>
            <div class="my-4"><b class="text-sm">Гость 1. Взрослый</b></div>
            <div class="grid grid-cols-3 gap-4">
                <div class="">
                    <Input v-model="firstName" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Фамилия" />
                </div>
                <div class="">
                    <Input v-model="secondName" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Имя" />
                </div>
                <div class="">
                    <Input v-model="patronymic" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Отчество" />
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
                    >

                    </VueDatePicker>
                </div>
                <div class="">
                    <Input v-model="email" v-maska data-maska="" placeholder="_____@__" />
                </div>
                <div class="">
                    <Input v-model="phone" v-maska data-maska="+7 ### ###-##-##" placeholder="+7 ___ ___ __ __" />
                </div>
            </div>
        </div>
        <div class="mb-10">
            <Button class="btn ml-auto mt-10 btn-with-border">Добавить гостя</Button>
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








