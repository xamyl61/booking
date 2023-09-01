<template>
    <div>
        <BookingHeader/>
        <div class="booking-block container mx-auto">
            <div class="flex gap-6">
                <div class="booking-main grow">
                    <BookingRoomsSelected/>
                    <hr>
                    <BookingRoomsMoreComfort/>
                    <hr>
                    <BookingAddGuestData/>
                    <hr>
                    <BookingServices/>
                </div>
                <div class="booking-sidebar">
                    <div class="booking-sidebar-inner">
                        <div class="headline">Ваше бронирование</div>
                        <BookingReservationList/>
                        <div class="cost">
                            <div class="line">Стоимость</div>
                            <div class="price">
                                <div class="cost">192 420 р.</div>
                                <div class="bonus"><IconRuble/> 3000 бонусов</div>
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
    import BookingRoomsSelected from "@/features/booking/components/BookingRoomsSelected.vue";
    import BookingRoomsMoreComfort from "@/features/booking/components/BookingRoomsMoreComfort.vue";
    import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";
    import BookingServices from "@/features/booking/components/BookingServices.vue";
    import BookingReservationList from "@/features/booking/components/BookingReservationList.vue";
    import BookingHeader from "@/features/booking/components/BookingHeader.vue";

    import IconRuble from '@/components/icons/IconRuble.vue';


    const props = defineProps({
        id: {
            type: String,
        }
        
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