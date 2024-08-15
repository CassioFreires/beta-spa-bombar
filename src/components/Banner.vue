<template>
    <div class="main-banner">
        <h1>Make your burger</h1>
    </div>
</template>

<script>
    export default {
        name: 'Banner'
    }
</script>

<style scope>
    .main-banner {
        background-image: url('/img/burger.jpg');
        background-size: cover;
        height: 550px;
        background-position: 0 -300px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .main-banner h1 {
        color: #fff;
        text-align: center;
        font-size: 60px;
        background-color: #222;
        padding: 20px 40px;
    }
</style>