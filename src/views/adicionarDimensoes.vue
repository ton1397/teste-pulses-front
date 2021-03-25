<template>
  <div class="adicionar-dimensoes">
    <h3 class="text-left text-muted">Adicionar Dimensão</h3>
    <div class="content">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.stop.prevent="enviaForm()">
                    <div class="form-group">
                        <label for="txtPergunta">Nome da Dimensão: </label>
                        <input type="text" class="form-control" name="txtPergunta" id="txtPergunta" required v-model="dimensao">
                    </div>
                    <button type="submit" class="btn btn-success mr-2">Salvar</button>
                    <button @click="$router.go(-1)" class="btn btn-danger">Cancelar</button>
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
  name: 'adicionarDimensoes',
  data(){
    return{
      dimensao:'',
      message:{
          class:'',
          text:''
      }
    }
  },
  mounted(){
  },
  methods:{
    enviaForm(){
        var self = this
        var bodyFormData = new FormData();
        bodyFormData.append('txtDimensao', this.dimensao)
        
        axios.post('http://localhost:8888/api/dimensao/',bodyFormData).then(response => {
            self.$router.push('/dimensoes')
        }).catch(erro=>{
            self.message.class = "alert-danger"
            self.message.text = "Não foi possivel criar a dimensão. Tente novamente"
        })
    }
  }
}
</script>

<style scoped>

</style>
