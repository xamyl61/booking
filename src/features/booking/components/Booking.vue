<template>
    <div>
        <BookingHeader/>
        <div class="booking-block container mx-auto">
            <div class="flex gap-6">
                <div class="booking-main grow">
                    <BookingRoomsSelected
                        :adults="adults"
                        :сhildren="сhildren"
                        :dateFrom=" dateFrom"
                        :dateTill=" dateTill"
                        :roomPrice="roomPrice"
                        :bonus="bonus"
                        :roomDetails="roomDetails"
                    />
                    <hr>
                    <BookingRoomsMoreComfort/>
                    <hr>
                    <div>
                        paymentGuest: {{ paymentGuest }}
                    </div>

                    <BookingAddGuestData
                        :adults="adults"
                        :сhildren="сhildren"
                        @update-guest-info="updateGuestInfo"
                    />
                    <hr>
                    <BookingServices
                        :avaliableServices="avaliableServices"
                    />

                    <h3 class="title-line">Введите данные плательщика</h3>
                    <div>Будет открыт бонусный счет</div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="">
                            <Input v-model="first_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Фамилия" />
                        </div>
                        <div class="">
                            <Input v-model="last_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Имя" />
                        </div>
                        <div class="">
                            <Input v-model="middle_name" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Отчество" />
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
                <div class="booking-sidebar">
                    <div class="booking-sidebar-inner">
                        <div class="headline">Ваше бронирование</div>
                        <BookingReservationList :reseravationList="reseravationList"/>
                        <div class="cost">
                            <div class="line">Стоимость</div>
                            <div class="price">
                                <div class="cost">{{roomPrice.toLocaleString('ru-RU')}} р.</div>
                                <div class="bonus"><IconRuble/> {{ bonus }} бонусов</div>
                            </div>
                        </div>
                        <div class="footline">Забронировать</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from "vue";

    import BookingRoomsSelected from "@/features/booking/components/BookingRoomsSelected.vue";
    import BookingRoomsMoreComfort from "@/features/booking/components/BookingRoomsMoreComfort.vue";
    import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";
    import BookingServices from "@/features/booking/components/BookingServices.vue";
    import BookingReservationList from "@/features/booking/components/BookingReservationList.vue";
    import BookingHeader from "@/features/booking/components/BookingHeader.vue";

    import Input from '@/components/Input.vue'

    import IconRuble from '@/components/icons/IconRuble.vue';



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



    const props = defineProps({
        id: {
            type: String,
        },
        adults: {
            type: Number,
            required: true
        },
        сhildren: {
            type: Number,
            required: true
        },
        roomDetails: {
            type: Object,
            required: true
        },
        avaliableServices: {
            type: Object
        },
        dateFrom: {
            type: String,
            required: true
        },
        dateTill: {
            type: String,
            required: true
        },
        roomPrice: {
            type: Number,
            required: true
        },
        bonus: {
            type: Number,
            required: true
        },
    })


    const reseravationList = reactive({
        dateFrom: props.dateFrom,
        dateTill: props.dateTill ,
        roomTitle: props.roomDetails.room_type.title,
    })

    const updateGuestInfo = (event: Event) => {
        console.log(event)
    }

    onMounted(() => {
        window.scrollTo(0,0)
    })
  </script>
    
  <style scoped>
    .header-line {
        background-color: var(--color-primary);
        color: #fff;
        padding: 1rem 0;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }
    .title-line {
        font-size: 1.4rem;
    }
    .booking-block {
        padding-top: 3rem;
    }
    .booking-block hr {
        border-color: rgba(238, 234, 234, 1);
    }
    
    .cost-wr {
        margin-top: 4.5rem;
    }
    .cost {
        font-family: 'Optima Cyr';
    }
    .bonus {
        color: rgba(147, 147, 147, 1);
    }

    /* .booking-sidebar */
    .booking-sidebar {
        flex: 0 0 20em;
    }
    .booking-sidebar-inner {
        border: 1px solid #EEEAEA;
    }
    .booking-sidebar .headline {
        height: 4.2rem;
        display: flex;
        align-items: center;
        background: var(--color-primary);
        color: #fff;
        font-size: 1.3rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
    }
    .booking-sidebar .footline {
        height: 4.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary);
        color: #fff;
        font-size: 1.3rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
    }
    .booking-sidebar .price {
        padding: 1.4rem;
    }
    .booking-sidebar .cost {
        font-size: 1.4rem;
        font-family: 'Optima Cyr';
    }
    .booking-sidebar .bonus {
        display: flex;
        font-size: .8rem;
    }
    .booking-sidebar .bonus i {
        margin-right: .5rem;
    }
    .booking-sidebar .line {
        height: 3.2rem;
        display: flex;
        align-items: center;
        background: #EEEAEA;
        font-size: 1.1rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
        color: #000;
    }

    
  </style>