<template>
  <div class="container mt-2">
    <template v-if="isTasksEmpty">
      <div class="empty-data mt-2">
      <img src="../assets/undraw_No_data_re_kwbl.png" class="empty-img">
      <b-button 
      variant="outline-primary" 
      class="mt-2"
      size="lg"
      to="/form"
      >Criar Tarefa</b-button>
    </div> 
      
    </template>

    <template v-else>
      
     <div v-for="( task ) in tasks" :key='task.id' >
    <b-card :title="task.subject" class="mb-2">
      <b-card-text>{{ task.description }}</b-card-text>

      <b-button 
      variant="outline-secundary"
       class="mr-2"
        @click="edit( task.id )"
        >Editar</b-button>
      <b-button 
      variant="outline-danger"
       class="mr-2-"
        @click="remove( task.id )"
        >Excluir</b-button>
    </b-card>
  </div>
</template>
  <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
        <div class="d-block text-center">
          Deseja realmente excluir esta tarefa? {{ taskSelected.subject }}
        </div>
        <div class=" mt-3 d-flex justify-content-end">
          <b-button variant="outline-secondary" class="mr-2" @click="hideModal">Cancelar</b-button>
          <b-button variant="outline-danger" class="mr-2" @click="confirmRemoveTask">Excluir</b-button>

        </div>
      </b-modal>
    
  </div>
</template>

<script>
//import ToastMixin from '@/Mixins/toastMixin';
import TasksModel from "@/Models/TasksModel";

export default{
    name:"List",

  

data() {
    return {
       tasks: [],
       taskSelected:[]
    }
},

  async created() {
    this.tasks = await TasksModel.get();
      
  },

  methods:{

    edit(taskId){
      this.$router.push({name: "form", params : { taskId} });
    },
 async remove( taskId ) {
      this.taskSelected = await TasksModel.find(taskId);
      this.$refs.modalRemove.show();
    },

    hideModal() {
      this.$refs.modalRemove.hide();
    },

    async confirmRemoveTask() {
      this.taskSelected.delete();
      this.tasks = await TasksModel.get();
     this.hideModal();
    }

  },

  computed:{
    isTasksEmpty() {
      return this.tasks.length === 0;
    }
  }
}
</script>

<style>

.empty-data{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.empty-img{
  width: 400px;
  height: 400px;
  
}

</style>

