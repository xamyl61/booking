<template>
    <div class="booking-room">
        <div>
            <!-- @click="bookingStore.removeRoomFromBooking(props.bookingRoom.roomDetails.room_type.guid)" -->
            <span
                @click="removeRoom(index)"
                class="remove"
            >
                <span>Удалить</span> <IconTrash/>
            </span>
        </div>
        <div class="booking-room__block">
            <div class="left">
                <div class="booking-room__title">{{ props.bookingRoom.roomDetails.title }}</div>
                <div class="booking-room__date-guests">{{ props.bookingRoom.dateFrom }} - {{ props.bookingRoom.dateTill }} <span>взрослых {{ props.bookingRoom.adults }}</span></div>
                <div class="booking-room__timework">{{ props.bookingRoom.roomDetails.checkout_hours }}</div>
            </div>
            <div class="right">
                <div>
                    <div class="booking-room__price">{{ props.bookingRoom.roomPrice }} р.</div>
                    <!-- <div class="booking-room__bonus">{{ props.bookingRoom.bonus }} бонусов</div> -->
                    <div class="booking-room__bonus flex justify-center align-center h-5">
                        <IconRuble/>
                        <div class="text-xs pl-1 bonus-counts">{{ props.bookingRoom.bonus }} бонусов</div>
                    </div>
                </div>
                <Button @click="goBooking">Забронировать</Button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted, computed, type PropType } from 'vue';
    import { useRouter } from 'vue-router';
    import type { IBookingInfoData } from '@/features/booking/types/IBookingInfoData';
    import IconRuble from '@/components/icons/IconRuble.vue'
    import IconTrash from '@/components/icons/IconTrash.vue';
    import Button from '@/components/Button.vue'

    import { useBookingRoomsStore } from '@/stores/booking-store';
    import { useBookingFormStore } from '@/stores/booking-form-store';

    const router = useRouter()
    const bookingStore = useBookingRoomsStore()
    const bookingFormStore = useBookingFormStore()
    const props = defineProps({
        bookingRoom: {
            type: Object as PropType<IBookingInfoData>,
            required: true,
        },
        index: {
            type: Number,
            required: true
        }
    })

    const goBooking = () => {
        router.push("booking")
    }

    const removeRoom = (index: number) => {
		bookingStore.removeRoomFromBooking(index)
		bookingFormStore.removeGuestsFromRoom(index)
	}
    

    onMounted(() => {
   
    })
</script>
  
<style scoped lang="scss">
.booking-room {
    &__block {
        padding: 1.2rem 1.4rem;
        border: 1px solid #EEEAEA;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.3rem;
    }
    &__title {
        font-size: 1.2rem;
        font-family: 'Optima Cyr';
        padding-bottom: .2rem;
    }
    &__date-guests {
        font-weight: 700;
        font-size: 1rem;
        padding-bottom: .2rem;
    }
    &__timework {
        font-size: .9rem;
    }
    &__price {
        font-family: 'Optima Cyr';
        font-size: 1.6rem;
        text-align: center;
        padding-bottom: .4rem;
    }
    &__bonus {
      
    }
    .right {
        display: flex;
        align-items: center;
    }
    .btn {
        margin-left: 1rem;
    }
    .remove {
        color: #939393;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        svg {
            width: 80%;
        }
    }
}
</style>