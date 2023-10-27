<script setup lang="ts">
	import { ref, type PropType, type Prop } from 'vue';
	import type {IBookingRoomSelected} from "@/features/booking/types/IBookingRoomSelected";

	const props = defineProps({
		room: {
			type: Object as PropType<IBookingRoomSelected>,
			required: true
		}
		
        
    })

</script>

<template>
	<div>
		props.room.id: {{ props.room.id }}
	</div>
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
		max-height: 15rem;
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
		font-size: 1.25rem;
		padding-bottom: 1rem;
		font-family: 'Optima Cyr';
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








