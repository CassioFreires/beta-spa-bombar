<template>
    <header>
        <nav class="nav">
            <router-link to="/" class="logo">
                <img  :src="srcImgLogo" :alt="titleImgLogo" id="logo">
            </router-link>
            <router-link to="/">Home</router-link>
            <router-link to="/pedidos">Pedidos</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        srcImgLogo: {
            type: String
        },

        titleImgLogo: {
            type: String,
        }
    }
}
</script>

<style scoped>
.nav {
    background: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
}
.nav .logo {
    margin: auto;
    margin-left: 0;
    width: 40px;
    height: 40px;
}

.nav .logo img {
    width: 40px;
    height: 40px;
}

.nav a {
    color: #fcba03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
}

.nav a:hover {
    color: #fff;
}

</style>