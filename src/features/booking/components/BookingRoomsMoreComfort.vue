<script setup lang="ts">
    import Button from '@/components/Button.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import IconPeopleGroup from '@/components/icons/IconPeopleGroup.vue';


</script>

<template>
    <div class="more-comfort-block">
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
                    <img src="@/assets/room1.jpg" alt="">
                </div>
                <div class="booking-rooms-item-dscr flex grow">
                    <div class="flex justify-between items-center grow">
                        <div>
                            <div class="title">Superior 2-местный</div>
                            <div class="params flex">
                                <div class="flex items-center"><IconPeopleGroup/> 3 человека</div>
                                <div class="flex items-center"><IconHome/> 21 м2</div>
                                <div class="flex items-center"><IconSquare/> 2 комнаты</div>
                            </div>
                            <div
                                class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                Подробнее о номере
                                <IconArrowLeftInCircle/>
                            </div>
                            <div class="plus-cost">всего + 20 000 р.</div>
                            <div class="nights">за 6 ночей</div>
                        </div>

                        <div class="cost-wr text-center">
                            <div class="bonus flex justify-center align-center h-5">
                                <IconRuble/>
                                <div class="text-xs pl-1 bonus-counts">2138 бонусов</div>
                            </div>
                            <Button class="btn">Да, поменять номер</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
		.title {
			font-size: 1.5rem;
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








