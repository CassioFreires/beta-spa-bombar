<template>
    <div class="main-container">
        <Msg v-show="msg" :msg="msg" :estilo="estilo" />
        <div>
            <form class="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome" class="form-label">Nome do cliente:</label>
                    <input type="text" class="form-control w-100" id="nome" v-model="nome" placeholder="Digite seu nome"
                        required>
                </div>
                <div class="input-container">
                    <label for="pao" class="form-label">Escolha o pão:</label>
                    <select name="pao" id="pao" class="form-select w-100" v-model="pao" required>
                        <option disabled selected>Selecione seu pão</option>
                        <option v-for="items in paes" v-bind:key="items.id" :value="items.tipo">
                            {{ items.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne" class="form-label">Escolha a carne do seu burger:</label>
                    <select name="carne" id="carne" class="form-select w-100" v-model="carne" required>
                        <option disabled selected>Selecione o tipo de carne</option>
                        <option v-for="items in carnes" v-bind:key="items.id" :value="items.tipo">
                            {{ items.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container opcionais-container">
                    <label class="form-check opcionais-title">Selecione os opcionais:</label>
                    <div class="checkbox-container form-check" v-for="items in opcionaisData" v-bind:key="items.id">
                        <input type="checkbox" name="opcionais" :value="items.tipo" class="form-check-input"
                            v-model="opcionais">
                        <span>{{ items.tipo }}</span>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" value="Criar meu Burger" class="btn btn-warning text-dark">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Msg from './Msg.vue';

export default {
    name: 'BurgerForm',
    components: {
        Msg
    },

    data() {
        return {
            paes: [],
            carnes: [],
            opcionaisData: [],
            nome: '',
            pao: '',
            carne: '',
            opcionais: [],
            status: 'Solicitado',
            msg: null,
            estilo: null,
        }
    },


    methods: {
        async getIngredientes() {
            try {
                const req = await fetch('http://localhost:3000/ingredientes');
                const data = await req.json();
                this.paes = data.paes;
                this.carnes = data.carnes;
                this.opcionaisData = data.opcionais;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        async createBurger(e) {
            try {
                e.preventDefault(e)
                const data = {
                    nome: this.nome,
                    pao: this.pao,
                    carne: this.carne,
                    opcionas: this.opcionais,
                    status: 'Solicitado'
                }

                const dataJson = JSON.stringify(data)

                const req = await fetch('http://localhost:3000/burgers', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dataJson
                })

                const res = await req.json()
                // colocar uma msg de sistema
                this.msg = `Pedido N° ${res.id} realizado com sucesso!`
                this.estilo = 'alert alert-success w-50'
                // limpar msg
                setTimeout(() => {
                    this.msg = '';
                    this.estilo = '';
                }, 3000)

                // limpar os campos
                this.nome = ''
                this.pao = ''
                this.carne = ''
                this.opcionais = [];
                this.status = ''
            } catch (error) {
                throw new Error(error.message)
            }
        }


    },

    mounted() {
        try {
            this.getIngredientes()
        }catch(error) {
            throw new Error(error.message)
        }
    }
}
</script>

<style scoped>
.burger-form {
    max-width: 400px;
    margin: 0 auto;

}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 15px;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
}

.opcionais-title {
    width: 100%;
}

.opcionais-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

.checkbox-container {
    width: 50%;
}

.checkbox-container span {
    font-weight: normal;
    margin-left: 6px;
}

.checkbox-container input {
    cursor: pointer;
}
</style>