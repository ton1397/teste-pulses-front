<template>
  <div class="adicionar-perguntas">
    <h3 class="text-left text-muted">Adicionar Pergunta</h3>
    <div class="content">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.stop.prevent="enviaForm()">
                    <div class="form-group">
                        <label for="txtPergunta">Texto da Pergunta: </label>
                        <input type="text" class="form-control" id="txtPergunta" required v-model="pergunta">
                    </div>
                    <div class="form-group">
                        <label for="cmbDimensao">Dimensão</label>
                        <select class="form-control" id="cmbDimensao" required v-model="dimensao">
                            <option value="">Selecione</option>
                            <option v-for="dimensao in listaDimensao" :key="dimensao.id_dimensao" :value="dimensao.id_dimensao">{{dimensao.descricao}}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success mr-2">Salvar</button>
                    <button  @click="$router.go(-1)" class="btn btn-danger">Cancelar</button>
                </form>
            </div>
        </div>
        <div class="alert my-5" :class="message.class" role="alert">
            {{message.text}}
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'adicionarPerguntas',
  data(){
    return{
      listaDimensao: [],
      pergunta:'',
      dimensao:'',
      message:{
        class:'',
        text:''
      }
    }
  },
  mounted(){
    this.getDimensao()
  },
  methods:{
    enviaForm(){
        var self = this
        var bodyFormData = new FormData();
        bodyFormData.append('txtPergunta', this.pergunta)
        bodyFormData.append('IdDimensao', this.dimensao)
        
        axios.post('http://localhost:8888/api/perguntas/',bodyFormData).then(response => {
            self.$router.push('/')
        }).catch(erro=>{
            self.message.class = "alert-danger"
            self.message.text = "Não foi possivel criar a dimensão. Tente novamente"
        })
    },
    getDimensao(){
        var self = this
        axios.get('http://localhost:8888/api/dimensao/',{
        }).then(response => {
            self.listaDimensao = response.data
        }).catch(erro => {
            console.log(erro);
        })
    }
  }
}
</script>

<style scoped>

</style>
