<template>
  <div>
    <div class="horizontale">
      <h2 v-if="!isEdit">{{liste.title}}</h2>
      <input v-if="isEdit" v-model="title" placeholder="titre de la liste">
      <div class="horizontale">
        <button v-if="!isEdit" v-on:click="setEditing(true)">modifier</button>
        <button v-if="!isEdit" v-on:click="deleteList(liste._id)">supprimer</button>
        <button v-if="isEdit" v-on:click="updateList(liste._id)">Modifier</button>
        <button v-if="isEdit" v-on:click="setEditing(false)">cancel</button>
      </div>
    </div>
    <p>Créée le: {{liste.createdAt}}</p>
    <p>Modifiée le: {{liste.updatedAt}}</p>
  </div>

  <div class="tasks-container">
    <div v-for="task in tasks.filter(aTask => aTask.list === liste._id)" :key="task._id" class="task-child">
      <TaskComponent :task="task" :tasks="tasks" @setTasks="setTasks"></TaskComponent>
    </div>

    <div class="task-child">
      <input placeholder="titre" v-model="this.newTaskTitle" />
      <input placeholder="description" v-model="this.newTaskDescription"/>
      <button v-on:click="createTask(liste._id)">Ajouté</button>
    </div>
  </div>
</template>

<script>

import TaskComponent from '../components/TaskComponent.vue'
import {ServiceTask} from "../../public/js/service/ServiceTask";
import {ServiceListe} from "../../public/js/service/ServiceListe";

export default {
  name: "ListeComponent",
  components: {TaskComponent},
  props: ["liste", "tasks", "listes"],
  emits: ["setTasks", "setTasksWithApi", "setListes"],
  data: () => ({
    isEdit: false,
    title: "",
    newTaskTitle: "",
    newTaskDescription: ""
  }),
  methods: {
    updateList(listeId) {
      ServiceListe.modify(this.title, listeId)
      .then(async (response) => {
        if(response.status === 200) {
          this.setEditing(false);
          for(let aList of this.listes) {
            if(aList._id === this.liste._id) {
              aList.title = this.title;
            }
          }

          this.$emit("setTasks", this.tasks);
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
    setEditing(value) {
      this.isEdit = value;
    },
    deleteList(listId) {
      ServiceListe.delete(listId)
      .then(async (response) => {
        if(response.status === 200) {
          this.$emit("setListes", this.listes.filter(aList => aList._id !== listId));
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
    setTasks(tasks) {
      this.$emit("setTasks", tasks);
    },
    createTask(listeId) {
      ServiceTask.create(this.newTaskTitle, this.newTaskDescription, listeId)
      .then(async (response) => {
          if(response.status === 201) {
            this.$emit("setTasksWithApi");
            this.newTaskTitle = "";
            this.newTaskDescription = "";
          } else {
            const result = await response.json();
            this.error = result.message;
          }
        });
    }
  },
  mounted() {
    this.title = this.liste.title;
  }
}
</script>

<style>
.horizontale {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.horizontale button {
  height: 20px;
}

.tasks-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: gray;
  padding-top: 20px;
  padding-bottom: 20px;
  width: auto;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 10px;
}

.task-child {
  max-width: 20%;
  background-color: yellow;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin: 10px 0;
}
</style>