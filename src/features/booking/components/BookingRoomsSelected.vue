<script setup lang="ts">
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconTrash from '@/components/icons/IconTrash.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';

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
                    <img src="@/assets/room1.jpg" alt="">
                </div>
                <div class="booking-rooms-item-dscr flex grow">
                    <div class="flex justify-between items-center grow">
                        <div>
                            <div class="title">Standart (2-местный 1-комнатный)</div>
                            <div class="date">12 июля, ср - 13 июля, чт</div>
                            <div class="time"><span>с 12:00</span> <span class="ml-16">до 15:00</span></div>
                            <div
                                class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                Подробнее о номере
                                <IconArrowLeftInCircle/>
                            </div>
                        </div>

                        <div class="cost-wr text-center">
                            <div class="cost cost text-3xl h-9">192 420 р.</div>
                            <div class="bonus flex justify-center align-center h-5">
                                <IconRuble/>
                                <div class="text-xs pl-1 bonus-counts">2138 бонусов</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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








