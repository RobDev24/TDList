<template>
    <div class="container mt-2">
    <b-form>
      <b-form-group
      label="Titutlo"
      label-for="subject"
      >
      <b-form-input
      id="subject"
      v-model.trim="$v.form.subject.$model"
      type="text"
      placeholder="ex: lavar carro"
      required
      autocomplete="off"
      :state="getValidation"
      aria-describedby="subject-feedback"
      >
    </b-form-input>
       <b-form-invalid-feedback id="subject-feedback">campo obrigatório min 3 caracteres</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      label="Descrição"
      label-for="description"
      >
      <b-form-textarea
      id="description"
      v-model="form.description"
      type="text"
      placeholder="ex: preciso levar o carro para lavar"
      required
      autocomplete="off"
      
      >
      </b-form-textarea>
    </b-form-group>

    <b-form-group
      label="Status"
      label-for="status"
      >
      <b-form-select
      id="status"
      v-model="form.status"
      :options="optinsList"
      >
      </b-form-select>
    </b-form-group>

        <b-button type="submit" 
        variant="outline-primary"
         @click="saveTask"
         :disabled="!getValidation"
         > Salvar </b-button>
    </b-form>
    </div>
  </template>

  <script>
    import toastMixin from '@/Mixins/toastMixin';
    import { required, minLength } from 'vuelidate/lib/validators';
    import TasksModel from '@/Models/TasksModel';
    import Status from '@/valueObjects/status';

    export default{
        name:"Form",

        mixins: [toastMixin],

    data() {
        return {
            form:{
                subject:"",
                description:"",
                status: Status.OPEN
            },

            methodSave: "new",
            optinsList:[
                {value: Status.OPEN,text: "Aberto"},
                {value: Status.FINISHED,text: "Concluído"},
                {value: Status.ARQUIVED,text: "Arquivado"}
    
            ]
        }
    },

    validations:{
        form: {
            subject:{
                required,
                minLength: minLength(3)

            }
         
        }
    },
    async created() {
        if(this.$route.params.taskId) {
            this.methodSave = "update";
            this.form = await TasksModel.find(this.$route.params.taskId);
        }
    }, 

    methods:{
        saveTask(){
            if(this.methodSave === "update" ){
                  this.form.save();
                  this.showToast("Success", "Sucesso", "Tarefa atualizada com sucesso!" )
                  this.$router.push({name: "list"});
                  return;
            }
                    const task = new TasksModel(this.form);
                     task.save();

        this.showToast("Success", "Sucesso", "Tarefa criada com sucesso!" )
        this.$router.push({name: "list"});
        }
    },
    computed: {
        getValidation() {
            if(this.$v.form.subject.$dirty === false ) {
                return null;
            }
            return !this.$v.form.subject.$error;
        }
    }

    }


</script>