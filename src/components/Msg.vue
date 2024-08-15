<template>
    <div class="message-container">
        <p :class="estilo">{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'Msg',
    props: {
        msg: {
            type: String
        },
        estilo: String
    }
}
</script>


<style scope>
.message-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

p {
    text-align: center;
}
</style>