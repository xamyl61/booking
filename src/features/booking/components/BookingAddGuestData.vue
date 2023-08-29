<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { vMaska } from "maska"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import Button from '@/components/Button.vue';
    import Input from '@/components/Input.vue'

    const firstName = ref('')
    const secondName = ref('')
    const patronymic = ref('')

    const phone = ref('')
    const email = ref('')
    const date = ref('')
    
</script>

<template>
    <div>
        <div class="enter-guest-details mt-10">
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
                        ignore-time-validation
                        placeholder="Дата рождения" />
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
            <Button class="btn ml-auto mt-10 btn-with-border">Добавить номер</Button>
        </div>
    </div>
</template>


<style scoped lang="scss">

.title-line {
    font-size: 1.4rem;
}

</style>








