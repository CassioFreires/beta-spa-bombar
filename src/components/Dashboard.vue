<template>
    <div class="dashboard-container">
        <Msg v-show="msg" :msg="msg" :estilo="estilo" />
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Pão</th>
                    <th scope="col">Carne</th>
                    <th scope="col">Opcionais</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="burger in data" v-bind:key="burger.id">
                    <th scope="row">{{ burger.id }}</th>
                    <td>{{ burger.nome }}</td>
                    <td>{{ burger.pao }}</td>
                    <td>{{ burger.carne }}</td>
                    <td>
                        <ul>
                            <li v-for="burger in burger.opcionas" v-bind:key="burger.id">
                                {{ burger }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <div class="td-select">
                            <select class="form-select" @change="updateBurger($event, burger.id)">
                                <option :value="burger.status">{{ burger.status }}</option>
                                <option :value="status_1">{{ status_1 }}</option>
                                <option :value="status_2">{{ status_2 }}</option>
                            </select>
                            <button class="btn btn-danger" @click="deletePedido(burger.id)">cancelar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import Msg from './Msg.vue';

export default {
    name: 'Dashboard',
    components: {
        Msg
    },

    data() {
        return {
            data: null,
            status_1: null,
            status_2: null,
            msg: null,
            estilo: null,
        }
    },
    methods: {
        async getBurgers() {
            try {
                const data = await fetch('http://localhost:3000/burgers');
                const dataJson = await data.json();
                this.data = dataJson
            } catch (error) {
                throw new Error(error.message)
            }


        },

        async getStatus() {
            try {
                const data = await fetch('http://localhost:3000/status');
                const dataJson = await data.json();
                this.status_1 = dataJson[1].tipo;
                this.status_2 = dataJson[2].tipo;
            } catch (error) {
                throw new Error(error.message)
            }

        },

        async updateBurger(event, id) {
            try {
                const option = event.target.value;
                if (id) {

                    const req = fetch(`http://localhost:3000/burgers/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: option }),
                    })
                        .then((response) => {
                            const data = response.json();
                            return data;
                        })
                        .then((response) => {
                            this.msg = `O pedido N° ${response.id} está ${response.status}`;
                            this.estilo = 'alert alert-primary w-50'
                            // limpar a mensagem
                            setTimeout(() => {
                                this.msg = null;
                                this.estilo = null
                            }, 3000)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            } catch (error) {
                throw new Error(error.message)
            }

        },

        async deletePedido(id) {
            try {
                if (id) {
                    const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                        method: 'delete'
                    });

                    const res = await req.json();
                    // mensagem
                    this.estilo = 'alert alert-danger w-50'
                    this.msg = 'Pedido cancelado com sucesso';
                    this.getBurgers()

                    // limpar a mensagem
                    setTimeout(() => {
                        this.msg = null;
                        this.estilo = null
                    }, 3000)
                }
            } catch (error) {
                throw new Error(error.message)
            }


        }

    },

    mounted() {
        try {
            this.getBurgers()
            this.getStatus()
            this.deletePedido()
        } catch (error) {
            throw new Error(error.message)
        }

    }

}
</script>

<style scoped>
td {
    width: 20%;
}

thead {
    border-bottom: 4px solid #fcba03;
}

.td-select {
    display: flex;
    justify-content: center;
    align-items: center;
}

.td-select select {
    width: 150px;
    padding: 10px;
    margin-top: 5px;

}

.td-select button {
    padding: 10px;
    width: 100px;
    border: none;
    margin-left: 10px;

}
</style>