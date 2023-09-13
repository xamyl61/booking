<script setup lang="ts">
	import { ref, type PropType } from 'vue';

    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconTrash from '@/components/icons/IconTrash.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';

	import RoomCardDetails from '@/features/hotels/components/RoomCardDetails.vue';

	import type {IRoomDetails} from "@/features/hotels/types/IRoomDetails";


	const dialogVisible = ref(false)



	const props = defineProps({
		adults: {
			type: Number,
            required: true
		},
		сhildren: {
			type: Number,
            required: true
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
        roomDetails: {
            type: Object as PropType<IRoomDetails>,
            required: true,
        },
        
    })

	const parseDate = (date: Date) => {
		let month = date.toLocaleString("default", { month: "long" });
		let day = date.toLocaleString("default", { day: "numeric" });
		let weekday = date.toLocaleString("default", { weekday: "short" });
		let formattedDate = day  + " " + month + ", " + weekday;

		return formattedDate
	}

	const showRoomDetails = () => {
		dialogVisible.value = true
	}

</script>

<template>
    <div class="booking-rooms">
        <div class="booking-rooms-item">
            <div class="booking-rooms-item-header flex justify-between items-center">
                <div class="title">Номер 1</div>
                <div class="remove flex items-center">Удалить номер <IconTrash/></div>
            </div>
            <div class="booking-rooms-item-content flex">
                <div class="booking-rooms-item-image">
                    <div class="hearts flex">
                        <IconHeart/>
                        <IconHeart/>
                        <IconHeart/>
                        <IconHeart/>
                    </div>
                    <!-- <img src="@/assets/room1.jpg" alt=""> -->
					<img
						class="list-block-icons"
						:src="props.roomDetails.cover_image.full_url"
						alt=""
					>
                </div>
                <div class="booking-rooms-item-dscr flex grow">
                    <div class="flex justify-between items-center grow">
                        <div>
                            <div class="title">{{ props.roomDetails.title }}</div>
                            <div class="date">{{ parseDate(new Date(props.dateFrom)) }} - {{ parseDate(new Date(props.dateTill)) }}</div>
                            <div class="time"><span>с 12:00</span> <span class="ml-16">до 15:00</span></div>
                            <div
								@click="showRoomDetails"
                                class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                Подробнее о номере
                                <IconArrowLeftInCircle/>
                            </div>
                        </div>

                        <div class="cost-wr text-center">
                            <div class="cost cost text-3xl h-9">{{ props.roomPrice.toLocaleString('ru-RU') }} р.</div>
                            <div class="bonus flex justify-center align-center h-5">
                                <IconRuble/>
                                <div class="text-xs pl-1 bonus-counts">{{ props.bonus }} бонусов</div>
                            </div>
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
				:roomDetails="props.roomDetails"
				:roomPrice="roomPrice"
				:countOfDays="3"
				:countOfPersons="3"
				:bonus="bonus"
				:сhildren="сhildren"
				:dateFrom="props.dateFrom"
				:dateTill="props.dateTill"
				:adults="adults"
				:showButton="false"
            />
        </el-dialog>
</template>


<style scoped lang="scss">
.booking-rooms {
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
}
.booking-rooms-item-image {
	position: relative;
	width: 39%;
	img {
		max-width: 100%;
		object-fit: cover;
		width: 100%;
		height: 100%;
		max-height: 14rem;
	}
}
.booking-rooms-item-header {
	background: rgba(238, 234, 234, 1);
	display: flex;
	align-items: center;
	height: 3rem;
	padding: 0 2rem;
	font-family: 'Optima Cyr';
	.title {
		font-size: 1.2rem;
		top: 0.2rem;
		position: relative;
	}
	.remove {
		text-decoration: underline;
		font-size: .9rem;
		cursor: pointer;
		color: rgba(147, 147, 147, 1);
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
		padding-bottom: .6rem;
	}
}

</style>








