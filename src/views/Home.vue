<template>
  <div class="dimensoes">
    <h3 class="text-left text-muted">Perguntas</h3>
    <div class="content">
      <div class="float-left">
        <label for="cmbFiltro">Filtro: </label>
        &nbsp;&nbsp;&nbsp;
        <select name="cmbFiltro" id="cmbFiltro" v-model="filtro">
          <option value="0">Selecione</option>
          <option v-for="filtro in listaFiltro" :value="filtro.id_dimensao" :key="filtro.id">{{filtro.descricao}}</option>
        </select>
      </div>
      <div class="float-right">
        <a href="/dimensoes" class="btn btn-outline-primary mr-2">Dimensões</a>
        <a href="/adicionar-perguntas" class="btn btn-outline-success"><i class="fas fa-plus"></i> Criar Pergunta</a>
      </div>
      <br>
      <br>
      <div class="alert my-5" :class="message.class" role="alert" v-if="message.text !== ''">
        {{message.text}}
      </div>
      <table class="table table-bordered" v-if="listaPerguntas.length > 0">
        <thead>
          <tr>
            <th style="width:1%">Ativo</th>
            <th style="width:20%">Dimensão</th>
            <th style="width:49%">Pergunta</th>
            <th style="width:30%">Ação</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="pergunta in listaPerguntas" :key="pergunta.id_pergunta" :id="pergunta.id_pergunta">
            <td>
              <label class="checkAtivo" @click="setFlgAtivo">
                <input type="checkbox" :checked="pergunta.flg_ativo == 1">
                <span class="checkmark"></span>
              </label>
            </td>
            <td align="left">{{pergunta.descricao_dimensao}}</td>
            <td align="left">{{pergunta.descricao_pergunta}}</td>
            <td align="right">
              <a :href="'/editar-perguntas/'+pergunta.id_pergunta" class="btn btn-primary">Editar</a>&nbsp;
              <a href="#" class="btn btn-danger" @click.stop.prevent="ShowConfirm">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="semperguntas" v-if="listaPerguntas.length === 0">
        <h3>
          Nenhum Resultado Encontrado
        </h3>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalExcluirPergunta" tabindex="-1" aria-labelledby="modalExcluirPergunta" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalExcluirPergunta">Confirmação</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Deseja Apagar esta pergunta?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="ExcluirPergunta">Sim</button>
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
      listaPerguntas: [],
      listaFiltro:[],
      filtro:0,
      modal:{
        id_pergunta:'',
      },
      message:{
        class:'',
        text:''
      }
    }
  },
  watch:{
    filtro: function(){
      this.getPerguntas()
    }
  },
  mounted(){
   this.getPerguntas()
   this.getDimensao()
  },
  methods:{
    getPerguntas(){
      var self = this
      axios.get('http://localhost:8888/api/perguntas/filtro/'+this.filtro,{
      }).then(response => {
        self.listaPerguntas = response.data
      }).catch(erro => {
        console.log(erro);
      })
    },
    getDimensao(){
      var self = this
      axios.get('http://localhost:8888/api/dimensao/',{
      }).then(response => {
        self.listaFiltro = response.data
      }).catch(erro => {
        console.log(erro);
      })
    },
    ShowConfirm(e){
      this.modal.id_pergunta = $(e.target).closest('tr').attr('id')
      $('#modalExcluirPergunta').modal('toggle')
    },
    ExcluirPergunta(){
      var self = this;  
      axios.delete('http://localhost:8888/api/perguntas/'+this.modal.id_pergunta+'/').then(response => {
        console.log(response);
        $('#modalExcluirPergunta').modal('toggle')
        self.showStatusMessage("alert-success", "pergunta excluida com sucesso");
      }).catch(erro => {
        console.log(erro);
        self.showStatusMessage("alert-danger", "Não foi possivel excluir a pergunta. Tente Novamente");
      })
    },
    showStatusMessage(classe, texto){
      var self = this;
      this.modal.class = classe
      this.modal.text = texto
      setTimeout(() => {
        self.modal.class = ''
        self.modal.text = ''
      }, 10000);
    },
    setFlgAtivo(e){
      var self = this
      var id_pergunta = $(e.target).closest('tr').attr('id')
      var ativo = (e.target.checked===true) ? '1' : '0';
      axios.patch('http://localhost:8888/api/perguntas/ativo/'+id_pergunta, {flg_ativo: ativo},{headers:{"Content-Type": "application/json"}}).then(response => {
        console.log(response);
        self.getPerguntas()
      }).catch(erro => {
        console.log(erro);
        self.showStatusMessage("alert-danger", "Não foi possivel excluir a pergunta. Tente Novamente");
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

/* The container */
.checkAtivo {
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkAtivo input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border:1px solid #333;
  border-radius:5px;
}

/* When the checkbox is checked, add a blue background */


/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "\2713";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkAtivo input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkAtivo .checkmark:after {
  left: 4px;
  top: -4px;
  width: 5px;
  height: 10px;
  color:#333;
}
</style>
