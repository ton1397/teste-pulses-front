<template>
  <div class="dimensoes">
    <h3 class="text-left text-muted">Dimensões</h3>
    <div class="content">
      <div class="float-right">
        <a href="/" class="btn btn-outline-primary mr-2">Perguntas</a>
        <a href="/adicionar-dimensoes" class="btn btn-outline-success"><i class="fas fa-plus"></i>  Criar Dimensão</a>
      </div>
      <br>
      <br>
      <table class="table table-bordered" v-if="listaDimensoes.length > 0">
        <thead>
          <tr>
            <th style="width:70%">Dimensão</th>
            <th style="width:30%">Ação</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="dimensao in listaDimensoes" :key="dimensao.id_dimensao" :id="dimensao.id_dimensao">
            <td align="left">{{dimensao.descricao}}</td>
            <td align="right">
               <a :href="'/editar-dimensoes/'+dimensao.id_dimensao" class="btn btn-primary">Editar</a>&nbsp;
              <a href="#" class="btn btn-danger" @click.stop.prevent="ShowConfirm">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="semperguntas" v-if="listaDimensoes.length === 0">
        <h3>
          Nenhum Resultado Encontrado
        </h3>
      </div>
      <div class="alert my-5" :class="message.class" role="alert">
            {{message.text}}
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalExcluirDimensao" tabindex="-1" aria-labelledby="modalExcluirDimensao" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalExcluirDimensao">Confirmação</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Deseja Apagar a dimensao {{modal.dimensao}}?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="ExcluirDimensao">Sim</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Dimensoes',
  data(){
    return{
      listaDimensoes: [],
      modal:{
        id_dimensao:'',
        dimensao:''
      },
      message:{
        class:'',
        text:''
      }
    }
  },
  mounted(){
   this.getPerguntas()
  },
  methods:{
    getPerguntas(){
      var self = this;
      axios.get('http://localhost:8888/api/dimensao/',{
      }).then(response => {
        self.listaDimensoes = response.data
      }).catch(erro => {
        console.log(erro);
      })
    },
    ShowConfirm(e){
      var id_dimensao = $(e.target).closest('tr').attr('id')
      var dimensao = $(e.target).closest('tr').find("td:first-child").text()
      this.modal.id_dimensao = id_dimensao
      this.modal.dimensao = dimensao
      $('#modalExcluirDimensao').modal('toggle')
    },
    ExcluirDimensao(){
      var self = this;  
      axios.delete('http://localhost:8888/api/dimensao/'+this.modal.id_dimensao, {validateStatus: () => true}).then(response => {
        $('#modalExcluirDimensao').modal('toggle')
        if (response.status === 400) {
          this.message.class = "alert-danger"
          this.message.text = "Não foi possível excluir esta dimensa pois já está vinculada a uma pergunta"
        }else{
          this.message.class = "alert-success"
          this.message.text = "Dimensao excluída com sucesso"
          self.getPerguntas()
        }
        
      }).catch(erro => {
        console.log(erro);
        $('#modalExcluirDimensao').modal('toggle')
        if (erro.status === 400) {
          this.message.class = "alert-danger"
          this.message.text = "Não foi possível excluir esta dimensa pois já está vinculada a uma pergunta"
        }
        
      })
    }
  }
}
</script>

<style scoped>

#semperguntas{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.lista{
  list-style: none;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  min-height: 80vh;
}
.lista .lista-item{
  border: 1px solid #eee;
  padding: 10px 0;
  margin: 10px 0;
  text-align: left;
}
span.dimensao-pergunta{
    border-right: 4px solid #eee;
    padding: 13px;
}
</style>
