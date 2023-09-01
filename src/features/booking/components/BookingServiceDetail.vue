<script setup lang="ts">

    
</script>

<template>
    <div class="sercice-dscr">
        <div class="sercice-dscr__img">
            <img src="@/assets/Photo33.jpg" alt="">
        </div>
        <div class="sercice-dscr__cont">
            <div class="title">Единство души и тела</div>
            <p>
                Программа направлена на восстановление сил и снятие психо-эмоционального напряжения.       Ожидаемый результат: снятие психо-эмоционального напряжения, расслабление и прилив сил.В случае наличия противопоказаний процедуры могут быть заменены на альтернативные в рамках стоимости программы.
            </p>
        </div>
    </div>
</template>


<style scoped lang="scss">
.sercice-dscr {
    max-width: 1500px;
    height: 100%;
    display: flex;
    &__img {
        width: 45%;
        img {
            height: 100%;
            object-fit: cover;
        }
    }
    &__cont {
        width: 55%;
        padding: 3rem 2rem;
        overflow-y: auto;
        .title {
            font-size: 1.6rem;
            padding-bottom: 1rem;
        }
    }
}




</style>








