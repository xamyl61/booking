<script setup lang="ts">
    import { ref } from 'vue';
    import Button from '@/components/Button.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import BookingServiceDetail from '@/features/booking/components/BookingServiceDetail.vue';


    const dialogVisible = ref(false)
    const serviceDetails = ref<object>()

    const props = defineProps({
        avaliableServices: {
            type: Object
        }
        
    })

    const showServiceDetail = (details: object) => {
        dialogVisible.value = true
        serviceDetails.value = details
    }

    
</script>

<template>
<div class="select-services">
    <div class="title-line">Выберите услуги</div>
        <div class="demo-collapse">
        <el-collapse v-for="(services, index) in props.avaliableServices">
            <el-collapse-item name="{{ index }}">
                <template #title>
                    <div>
                        <div class="title flex items-center"><IconHome/> <b class="pl-4 text-lg">{{ services.category_title }}</b></div>
                        <div class="dscr ">{{ services.category_title }}</div>
                    </div>
                </template>
                <div class="services" v-for="service in services.res">
                    <div class="service">
                        <div class="service-offer flex items-center">
                            <div class="name" @click="showServiceDetail(service)">{{ service.title }}</div>
                            <div class="days">
                                <select name="" id="">
                                    <option value="1">1 день</option>
                                    <option value="2">2 дня</option>
                                    <option value="3">1 дня</option>
                                </select>
                            </div>
                            <div class="cost">{{ service.price[0]?.price }} р.</div>
                            <button class="btn">Выбрать</button>
                        </div>
                        <div class="adding-to-order">
                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>

    

    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="90%"
        class="m-dialog__service-dscr"
    >
        
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header"></div>
        </template>
        <BookingServiceDetail :serviceDetails="serviceDetails"/>
    </el-dialog>

</div>
</template>


<style scoped lang="scss">
$font-family_1: 'Optima Cyr';

.service-offer {
	padding: 2rem 0;
	.name {
		width: 25%;
		font-size: 1.2rem;
		font-family: $font-family_1;
		text-decoration: underline;
	}
	.days {
		width: 20%;
	}
	.cost {
		width: 20%;
		font-size: 1.2rem;
		font-family: $font-family_1;
	}
	.btn {
		width: 12rem;
		margin-left: auto;
	}
}
.service {
	select {
		width: 6.5rem;
		height: 2rem;
		line-height: 2rem;
		padding: 0 1.5rem 0 1rem;
		border: 1px solid var(--color-primary);
		border-radius: 1rem;
	}
}
.adding-to-order {
	width: 80%;
	margin-left: auto;
	font-size: 1.1rem;
	.btn {
		width: 12rem;
	}
	.cost {
		font-size: 1.2rem;
		font-family: $font-family_1;
	}
}


</style>








