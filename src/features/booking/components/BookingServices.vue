<script setup lang="ts">
    import Button from '@/components/Button.vue';
    import IconHome from '@/components/icons/IconHome.vue';

    
</script>

<template>
<div class="select-services">
    <div class="title-line">Выберите услуги</div>
        <div class="demo-collapse">
        <el-collapse >
            <el-collapse-item name="1">
                <template #title>
                    <div>
                        <div class="title flex items-center"><IconHome/> <b class="pl-4 text-lg">Экскурсии</b></div>
                        <div class="dscr ">Выберите экскурсии себе по душе</div>
                    </div>
                </template>
                <div class="services">
                    <div class="service">
                        <div class="service-offer flex items-center">
                            <div class="name">Единство души и тела</div>
                            <div class="days">
                                <select name="" id="">
                                <option value="1">1 день</option>
                                <option value="2">2 дня</option>
                                <option value="3">1 дня</option>
                            </select>
                            </div>
                            <div class="cost">20 000 р.</div>
                            <button class="btn">Выбрать</button>
                        </div>
                        <div class="adding-to-order">
                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                        </div>
                    </div>

                    <div class="service">
                        <div class="service-offer flex items-center">
                            <div class="name">Единство души и тела</div>
                            <div class="days">
                                <select name="" id="">
                                    <option value="1">1 день</option>
                                    <option value="2">2 дня</option>
                                    <option value="3">1 дня</option>
                                </select>
                            </div>
                            <div class="cost">20 000 р.</div>
                            <button class="btn">Выбрать</button>
                        </div>
                        <div class="adding-to-order">
                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                            <div class="guests">
                                <div class="guest flex items-center py-4">
                                    <div class="mr-4">
                                        <input class="mr-4" type="checkbox" id="g1">
                                        <label for="g1">Гость 1. Иванов Иван Иванович.</label>
                                    </div>
                                    <select name="" id="">
                                        <option value="1">1 день</option>
                                        <option value="2">2 дня</option>
                                        <option value="3">3 дня</option>
                                    </select>
                                </div>
                                <div class="guest flex items-center">
                                    <div class="mr-4">
                                        <input class="mr-4" type="checkbox" id="g2">
                                        <label for="g2">Гость 1. Иванов Иван Иванович.</label>
                                    </div>
                                    <select name="" id="">
                                        <option value="1">1 день</option>
                                        <option value="2">2 дня</option>
                                        <option value="3">3 дня</option>
                                    </select>
                                </div>
                            </div>
                            <div class="finaly flex items-center">
                                <div class="cost mr-10 ml-auto">20 000 р.</div>
                                <button class="btn">Добавить в заказ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template #title>
                    <div>
                        <div class="title flex items-center"><IconHome/> <b class="pl-4 text-lg">Для детей</b></div>
                        <div class="dscr ">Выберите экскурсии себе по душе</div>
                    </div>
                </template>
                <div class="services">
                    <div class="service">
                        <div class="service-offer flex items-center">
                            <div class="name">Единство души и тела</div>
                            <div class="days">
                                <select name="" id="">
                                <option value="1">1 день</option>
                                <option value="2">2 дня</option>
                                <option value="3">1 дня</option>
                            </select>
                            </div>
                            <div class="cost">20 000 р.</div>
                            <button class="btn">Выбрать</button>
                        </div>
                        <div class="adding-to-order">
                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                        </div>
                    </div>

                    <div class="service">
                        <div class="service-offer flex items-center">
                            <div class="name">Единство души и тела</div>
                            <div class="days">
                                <select name="" id="">
                                    <option value="1">1 день</option>
                                    <option value="2">2 дня</option>
                                    <option value="3">1 дня</option>
                                </select>
                            </div>
                            <div class="cost">20 000 р.</div>
                            <button class="btn">Выбрать</button>
                        </div>
                        <div class="adding-to-order">
                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                            <div class="guests">
                                <div class="guest flex items-center">
                                    <div class="mr-4">
                                        <input class="mr-4" type="checkbox" id="g1">
                                        <label for="g1">Гость 1. Иванов Иван Иванович.</label>
                                    </div>
                                    <select name="" id="">
                                        <option value="1">1 день</option>
                                        <option value="2">2 дня</option>
                                        <option value="3">3 дня</option>
                                    </select>
                                </div>
                                <div class="guest flex items-center">
                                    <div class="mr-4">
                                        <input class="mr-4" type="checkbox" id="g2">
                                        <label for="g2">Гость 1. Иванов Иван Иванович.</label>
                                    </div>
                                    <select name="" id="">
                                        <option value="1">1 день</option>
                                        <option value="2">2 дня</option>
                                        <option value="3">3 дня</option>
                                    </select>
                                </div>
                            </div>
                            <div class="finaly flex items-center">
                                <div class="cost mr-10 ml-auto">20 000 р.</div>
                                <button class="btn">Добавить в заказ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
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








