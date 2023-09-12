<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { vMaska } from "maska"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import Button from '@/components/Button.vue';
    import Input from '@/components/Input.vue'


    const guests = ref<any>([])
    const props = defineProps({
        adults: {
            type: Number,
            required: true
        },
        сhildren: {
            type: Number,
            required: true
        }
    })






    onMounted(() => {
        for(var i = 0; i < props.adults + props.сhildren; i++) {
            guests.value.push({
                first_name: '',
                last_name: '',
                middle_name: '',
                date: '',
                email: '',
                phone: ''
            })
        }
    })
    
</script>

<template>
    <div>
        <div class="enter-guest-details mt-10">
            <h3 class="title-line">Введите данные гостей</h3>
            <div v-for="(guest, index) in guests">
                <div class="my-4">
                    <b class="text-sm">
                        Гость {{ index + 1 }}.
                        <span v-if="сhildren && index + 1 == guests.length">Ребенок</span>
                        <span v-else>Взрослый</span>
                    </b>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div class="">
                        <Input @input="$emit('updateGuestInfo', guests)" v-model="guest.first_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Фамилия" />
                    </div>
                    <div class="">
                        <Input @input="$emit('updateGuestInfo', guests)" v-model="guest.last_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Имя" />
                    </div>
                    <div class="">
                        <Input @input="$emit('updateGuestInfo', guests)" v-model="guest.middle_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Отчество" />
                    </div>
                    <div class="">
                        <VueDatePicker
                                v-model="guest.date"
                                :enable-time-picker="false"
                                auto-apply
                                locale="ru"
                                position="left"
                                :six-weeks="true"
                                :offset="1"
                                menu-class-name="m-datepicker"
                                :placeholder="'Дата рождения'"
                                @update:model-value="$emit('updateGuestInfo', guests)"
                        >

                        </VueDatePicker>
                    </div>
                    <div class="">
                        <Input @input="$emit('updateGuestInfo', guests)" v-model="guest.email" v-maska data-maska="" placeholder="_____@__" />
                    </div>
                    <div class="">
                        <Input @input="$emit('updateGuestInfo', guests)" v-model="guest.phone" v-maska data-maska="+7 ### ###-##-##" placeholder="+7 ___ ___ __ __" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-10">
            <!-- <Button class="btn ml-auto mt-10 btn-with-border">Добавить гостя</Button> -->
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








