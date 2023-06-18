<template>
    <div>
        <h1>Выберите период проживания и количество гостей</h1>
        <div class="filter container mx-auto">
            <div class="flex flex-row space-x-1">
                <div class="col-1">
                    <div class="filter-title">Отель</div>
                    <div class="filter-controls">
                        <el-tree-select
                            v-model="choosedHotel"
                            :data="hotelsList"
                            placeholder="Выберите отель"
                        >
                        </el-tree-select>
                    </div>
                </div>
                <div class="col-2">
                    <div class="filter-title">Дата заезда</div>
                    <div class="filter-controls">

                            <VueDatePicker
                                range
                                multi-calendars
                                v-model="date"
                                :enable-time-picker="false"
                                auto-apply
                                locale="ru"
                                position="left"
                                :six-weeks="true"
                                :offset="1"
                                @update:model-value="handleDate"
                            >
                                <template #trigger>
                                    <div class="daterange">
                                        <div class="daterange-item start-date">
                                            {{ rangeStartDate }}
                                            <IconCalendar/>
                                        </div>
                                        <div class="daterange-item">
                                            {{ rangeEndDate }}
                                        </div>
                                    </div>
                                </template>

                                <template 
                                    #month-year="{
                                        month,
                                        year,
                                        handleMonthYearChange
                                }">
                                    <div class="custom-month-year-component">
                                        {{ getMonthName(month) }} {{ year }}
                                    </div>
                                    <div class="icons">
                                    <span 
                                        class="datepicker-arrow arrow-left" 
                                        @click="handleMonthYearChange(false)">
                                        <IconArrowLeftSircle/>
                                    </span>
                                    <span 
                                        class="datepicker-arrow arrow-right" 
                                        @click="handleMonthYearChange(true)">
                                        <IconArrowRightSircle/>
                                    </span>
                                    </div>
                                </template>
                          
                                <template #action-buttons>
                                    <!-- Empty block to hide select button -->
                                    <div></div>
                                </template>
                            </VueDatePicker>

                    </div>
                </div>
                <div class="basis-1/2">
                    <div class="filter-title">Размещение</div>
                    <div class="filter-controls accommodation">
                        <el-dropdown
                            trigger="click"
                            placement="bottom-start"
                        >
                            <span class="el-dropdown-link">
                                <span>2 гостей</span>
                                <IconPerson/>
                            </span>

                            <template #dropdown>
                                <div class="accommodation-dropdown">
                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Взрослые</div>
                                        <div class="dscr">старше 18 лет<br> на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number v-model="adults" :min="1" :max="5" />
                                    </div>
                                   </div>

                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Подростки</div>
                                        <div class="dscr">от 12 до 18 лет<br> на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number v-model="teenagers" :min="0" :max="5" />
                                    </div>
                                   </div>

                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Дети</div>
                                        <div class="dscr">от 2 до 12 лет<br>  на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number v-model="сhildren" :min="0" :max="5" />
                                    </div>
                                   </div>

                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Младенцы</div>
                                        <div class="dscr">до 2 лет<br> на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number v-model="infants" :min="0" :max="5" />
                                    </div>
                                   </div>

                                </div>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="basis-1/4">
                    <div class="filter-title"></div>
                    <div class="filter-">
                        <button class="btn btn-dark">Найти номер</button>
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto">
        
        </div>

        
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    import IconCalendar from '@/components/icons/iconCalendar.vue'
    import IconArrowLeftSircle from '@/components/icons/IconArrowLeftSircle.vue'
    import IconArrowRightSircle from '@/components/icons/IconArrowRightSircle.vue'
    import IconPerson from '@/components/icons/IconPerson.vue'

    const choosedHotel = ref()
    const hotelsList = [
    {
        value: '1',
        label: 'г.Анапа',
        children: [
        {
            value: '1-1',
            label: 'ALEAN FAMILY DOVILLE',
        },
        {
            value: '1-2',
            label: 'ALEAN FAMILY RIVIERA',
        },
        {
            value: '1-3',
            label: 'MAJESTIC BY ALEAN',
        },
        ],
    },
    {
        value: '2',
        label: 'г. Геленджик',
        children: [
        {
            value: '2-1',
            label: 'ALEAN FAMILY BIARRITZ',
        },
        ],
    },
    {
        value: '3',
        label: 'г. Сочи',
        children: [
        {
            value: '3-1',
            label: 'ALEAN FAMILY SPUTNIK',
        },
        ],
    },
    ]

    let date = ref()
    let rangeStartDate = ref()
    let rangeEndDate = ref()

    const adults = ref(2)
    const teenagers = ref(0)
    const сhildren = ref(0)
    const infants = ref(0)
    

    const parseDate = (date: any) => {
        const options = {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            
        };

        return date.toLocaleString('ru', options)
    }

    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('ru', {
            month: 'long',
        });
    }

    const handleDate = (modelData:any) => {
        date.value = modelData;
        // do something else with the data
        rangeStartDate.value = parseDate(date.value[0]);
        rangeEndDate.value =  parseDate(date.value[1]);
    }


    onMounted(() => {
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 1));
        date.value = [startDate, endDate];
        rangeStartDate.value = parseDate(startDate)
        rangeEndDate.value = parseDate(endDate)
    })

  </script>
    
  <style scoped>
    h1 {
        font-size: 44px;
        font-family: 'Optima Cyr';
        text-align: center;
        padding: 4.2rem 0 3.2rem;
    }
    .filter {
        padding: 2rem 5rem 1.9rem;
        background-color: var(--color-primary);
    }
    .col-1 {
        width: 33%;
    }
    .col-2 {
        width: 71%;
    }
    .filter-title {
        color: #fff;
        padding-bottom: .5rem;
        font-size: 1.2rem;
        font-family: 'Optima Cyr';
    }
    .btn {
        height: 3.1rem;
        width: 12.5rem;
    }
    .dropdown-head {
        width: 100%;
        height: 3rem;
        background: #fff;
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: #939393;
        padding: 0 1.3rem;
        cursor: pointer;
    }
    .dropdown-list {
        padding: 0 1.3rem;
        border: 1px solid #fff;
        background: var(--color-primary);
        color: #fff;
    }
    .dropdown-list-item:not(:first-child) {
        border-top: 1px solid #BFC1C1;
    }
    .dropdown-list-item {
        padding: .7rem 0;
        cursor: pointer;
        line-height: 1.2;
    }


    /* datepicker */
    .dp__main {
        height: 100%;
        background: #fff;
        border: 1px solid #BFC1C1;
        cursor: pointer;
    }
    .dp__main > div {
        height: 100%;
    }
    .daterange {
        display: flex;
        justify-content: space-between;
    }
        .daterange-item {
            height: 100%;
            width: 50%;
            display: flex;
            align-items: center;
            padding: 0.7rem 1rem;
        }
        .daterange-item.start-date {
            border-right: 1px solid #BFC1C1;
        }
        .daterange-item.start-date i {
            margin-left: auto;
        }

        
        .accommodation .el-dropdown {
            height: 3rem;
            width: 100%;
        }
        .accommodation .el-dropdown .el-dropdown-link {
            background: #fff;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.2rem;
            font-size: 1rem;
            color: #000;
        }

        .accommodation-dropdown {
            padding: 1.4rem 1.9rem;
        }
        .accommodation-dropdown-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .accommodation-dropdown-item:not(:first-child) {
            margin-top: 1rem;
        }
        .accommodation-dropdown .title {
            color: #fff;
            font-size: 1rem;
        }
        .accommodation-dropdown .dscr {
            color: #BFC1C1;
            font-size: .8rem;
            line-height: 1;
            padding-top: .5rem;
        }
        
  </style>