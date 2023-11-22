<script setup lang="ts">
	import { onMounted, reactive, ref, type PropType } from 'vue';
	import plural from 'plural-ru';
    import Button from '@/components/Button.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconHome from '@/components/icons/IconHome.vue';
	import IconPerson from '@/components/icons/IconPerson.vue';
	import IconPerson2 from '@/components/icons/IconPerson2.vue';
	import IconPersons from '@/components/icons/IconPersons.vue';
	import RoomCardDetails from '@/features/hotels/components/RoomCardDetails.vue';

	import type {IBookingInfoData} from "@/features/booking/types/IBookingInfoData";
	
	import { useFilterStore } from '@/stores/filter-params-store';
	import { useBookingRoomsStore } from '@/stores/booking-store';
	
	const bookingStore = useBookingRoomsStore()
	
	const date = ref()
	const nights = ref()
	const dateFrom = ref()
	const dateTill = ref()
	const filterStore = useFilterStore()
	const roomMoreComfort = ref()
	const roomDetails = ref()

	const loading = ref(false)
	const dialogVisible = ref(false)

	

	const props = defineProps({
        roomGuid: {
            type: String,
			required: true
        },
		booking: {
            type: Object as PropType<IBookingInfoData>,
            required: true
        },
		index: {
			type: Number,
			required: true
		}
    })

	const pluralPeopletext = (count: number) => {
    	return plural(count, 'человек', 'человека', 'человек');
	}

	const dateFormateding = (date: Date) => {
		let year = date.getFullYear();
		let month = date.toLocaleString("default", { month: "2-digit" });
		let day = date.toLocaleString("default", { day: "2-digit" });
		let formattedDate = year + "-" + month + "-" + day;

		return formattedDate
	}


	async function getAdditionalRoomType() {
		try {
			loading.value = true
			const res = await fetch(`https://backmb.aleancollection.ru/api/v2/rooms-request/additional-room-type/${props.roomGuid}/?number_of_adults=${filterStore.filter?.adults}&number_of_children=${filterStore.filter?.сhildren}&date_from=${dateFrom.value}&date_till=${dateTill.value}&number_of_infants=0`);

			let finalRes = {}
			if (res.status == 200) {
				finalRes = await res.json();
			}
			// roomMoreComfort.value = finalRes.res;
			return finalRes;
		} catch (error) {
			console.log(error)
		} finally {
			loading.value = false
		}
	}

	const parseDate = (date: Date) => {
        let month = date.toLocaleString("default", { month: "long" });
        let day = date.toLocaleString("default", { day: "numeric" });
        let formattedDate = day  + " " + month;

        return formattedDate
    }

	const pluralNightText = (count: number) => {
		return plural(count, 'ночь', 'ночи', 'ночей');
	}

	async function getRoomDeatails(guid: string) {
		try {
			const res = await fetch(`https://backmb.aleancollection.ru/api/v1/room-type-info/${guid}/`);
			const finalRes = await res.json();
			roomDetails.value = finalRes.res;
			return finalRes.res

		} catch (error) {
			console.log(error)
		}
	}

	const changeRoom = async (index: number, guid: string) => {
		roomDetails.value = await getRoomDeatails(guid)
		bookingStore.useBookingList[index - 1].roomDetails = roomDetails.value
		bookingStore.useBookingList[index - 1].roomPrice = roomMoreComfort.value.res.price_info.price
		bookingStore.useBookingList[index - 1].bonus = roomMoreComfort.value.res.price_info.bonus
		bookingStore.useBookingList[index - 1].needUpSail = false
	}

	onMounted(async () => {
		if (filterStore.filter) {
			date.value = filterStore.filter.date

			const startDate = new Date(date.value[0]);
			const endDate = new Date(date.value[1])
			dateFrom.value = dateFormateding(startDate)
			dateTill.value = dateFormateding(endDate)
		}
		roomMoreComfort.value = await getAdditionalRoomType()
		nights.value = ((new Date(props.booking.dateTill)).getTime() - (new Date(props.booking.dateFrom)).getTime())/(1000 * 3600 * 24) 
    })

	const showRoomDetails = async (guid: string) => {
		await getRoomDeatails(guid)
		dialogVisible.value = true
	}
</script>

<template>
    <div
		v-if="bookingStore.useBookingList[index - 1].needUpSail && roomMoreComfort?.res"
		v-loading="loading"
		class="more-comfort-block"
	>
        <div class="title-line">Повысьте комфорт!</div>
        <div class="booking-rooms-item">
            <div class="booking-rooms-item-content flex">
                <div class="booking-rooms-item-image">
                    <div class="hearts flex">
                        <IconHeart/>
                        <IconHeart/>
                        <IconHeart/>
                        <IconHeart/>
                    </div>
					<img :src="roomMoreComfort?.res?.cover_image?.full_url" alt="">
                </div>
                <div class="booking-rooms-item-dscr flex grow">
                    <div class="flex justify-between items-center grow">
                        <div>
                            <div class="title">{{ roomMoreComfort?.res?.room_type?.title }}</div>
                            <div class="params flex">
								
                                <div class="flex items-center">
									<IconPerson v-if="roomMoreComfort?.res.room_type?.number_of_persons_per_room == 1"/>
									<IconPerson2 v-if="roomMoreComfort?.res.room_type?.number_of_persons_per_room == 2"/>
									<IconPersons v-if="roomMoreComfort?.res.room_type?.number_of_persons_per_room > 2"/>
									{{ roomMoreComfort?.res.room_type?.number_of_persons_per_room }} 
									{{pluralPeopletext(roomMoreComfort?.res.room_type?.number_of_persons_per_room)}}
								</div>
                                <div class="flex items-center"><IconHome/> {{ roomMoreComfort?.res.room_type?.room_square }} м2</div>
                                <div class="flex items-center"><IconSquare/> 2 комнаты</div>
                            </div>
                            <div
								@click="showRoomDetails(roomMoreComfort.res.room_type.guid)"
                                class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                Подробнее о номере
                                <IconArrowLeftInCircle/>
                            </div>
                            <div class="plus-cost">всего + {{ roomMoreComfort?.difference }} р.</div>
                            <div class="nights">за {{ nights }} {{ pluralNightText(nights) }}</div>
							
                        </div>

                        <div class="cost-wr text-center">
                            <div class="bonus flex justify-center align-center h-5">
                                <IconRuble/>
                                <div class="text-xs pl-1 bonus-counts">{{ roomMoreComfort?.res.price_info?.bonus }} бонусов</div>
                            </div>
                            <Button @click="changeRoom(index, roomMoreComfort.res.room_type.guid)" class="btn whitespace-pre">Поменять номер</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

	<el-dialog
		v-model="dialogVisible"
		width="70%"
		class="room-detail"
		align-center
		destroy-on-close
	>
		<RoomCardDetails
			:roomDetails="roomDetails"
			:roomPrice="props.booking.roomPrice + roomMoreComfort?.difference"
			:countOfDays="nights"
			:countOfPersons="props.booking.adults + props.booking.сhildren"
			:bonus="props.booking.bonus"
			:сhildren="props.booking.сhildren"
			:dateFrom="props.booking.dateFrom"
			:dateTill="props.booking.dateTill"
			:adults="props.booking.adults"
			:showButton="false"
		/>
	</el-dialog>
</template>


<style scoped lang="scss">
$color_1: #939393;
$color_2: rgba(147, 147, 147, 1);
$font-family_1: 'Optima Cyr';
$border-color_1: var(--color-primary);

.more-comfort-block {
	.title-line {
		font-size: 1.4rem;
		padding: 1.4rem 0 1rem;
	}
	.booking-rooms-item-dscr {
		padding: 1rem 1rem;
		.title {
			font-size: 1.25rem;
			padding-bottom: 1rem;
			font-family: 'Optima Cyr';
		}
	}
	.booking-rooms-item {
		margin-bottom: 3rem;
	}
	.booking-rooms-item-content {
		border-color: $border-color_1;
	}
	.plus-cost {
		padding-top: 0.5rem;
		font-size: 1.5rem;
		font-family: $font-family_1;
	}
	.nights {
		padding-top: 0.5rem;
		font-size: 0.8rem;
		color: $color_1;
	}
	padding-bottom: 1rem;
	.hearts {
		position: absolute;
		background: rgba(255, 255, 255, .6);
		padding: 1rem 0.2rem;
		.icon {
			margin: 0 0.4rem;
		}
	}
}
.booking-rooms-item {
	margin-bottom: 1.5rem;
}
.booking-rooms-item-content {
	border: 1px solid rgba(238, 234, 234, 1);
	@media (max-width: 767px) {
		flex-direction: column;
	}
}
.booking-rooms-item-image {
	position: relative;
	width: 39%;
	@media (max-width: 767px) {
		width: auto;
	}
	img {
		max-width: 100%;
		object-fit: cover;
		width: 100%;
		height: 100%;
		max-height: 15rem;
	}
}
.booking-rooms-item-header {
	background: rgba(238, 234, 234, 1);
	display: flex;
	align-items: center;
	height: 3rem;
	padding: 0 2rem;
	font-family: $font-family_1;
	.title {
		font-size: 1.2rem;
		top: 0.2rem;
		position: relative;
	}
	.remove {
		text-decoration: underline;
		font-size: 0.9rem;
		cursor: pointer;
		color: $color_2;
		&:hover {
			text-decoration: none;
		}
		.icon {
			margin-left: 1rem;
		}
	}
}
.booking-rooms-item-dscr {
	padding: 0 1.6rem 0 2rem;
	& > .flex {
		@media (max-width: 767px) {
			flex-direction: column;
			align-items: start;
		}
	}
	.cost-wr {
		@media (max-width: 768px) {
            margin-top: auto;
        }
		@media (max-width: 767px) {
			padding-top: 2rem;
			width: 100%;
		}
		.btn {
			width: 100%;
		}
	}
	.title {
		font-size: 1.3rem;
		padding-bottom: 1rem;
	}
	.date {
		font-size: 1rem;
		font-weight: 700;
	}
	.params {
		font-size: 12px;
		padding-bottom: 1rem;
		>div {
			margin-right: 1rem;
		}
		.icon {
			margin-right: 0.5rem;
		}
	}
	.time {
		font-size: 0.8rem;
		padding-bottom: 0.6rem;
	}
}


</style>








