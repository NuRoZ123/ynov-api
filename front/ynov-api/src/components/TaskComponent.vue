<template>
  <div>
    <p v-if="!isEdit">titre: {{task.title}}</p>
    <p v-if="!isEdit">description: {{task.description}}</p>
    <input placeholder="title" v-model="this.title" v-if="isEdit"/>
    <input placeholder="description" v-model="this.description" v-if="isEdit"/><br v-if="isEdit"/>
    <label v-if="isEdit">est fini: <input placeholder="etat" v-model="this.isDone" type="checkbox"/></label>
    <div class="task-icon">
      <p v-if="!isEdit">etat: {{task.done ? "fini" : "non fini"}}</p>
      <button v-on:click="setEditable(true)" v-if="!isEdit">edit</button>
      <button v-on:click="deleteTask(task._id)" v-if="!isEdit">delete</button>
      <button v-on:click="editTask()" v-if="isEdit">sauvegardé</button>
      <button v-on:click="setEditable(false)" v-if="isEdit">cancel</button>
    </div>
  </div>
</template>

<script>

import {ServiceTask} from "../../public/js/service/ServiceTask";

export default {
  name: "TaskComponent",
  props: ["task", "tasks"],
  data: () => ({
    isEdit: false,
    title: "",
    discription: "",
    isDone: false,
  }),
  methods: {
    editTask() {
      if(this.title.trim() !== "" && this.description.trim() !== "") {
        ServiceTask.modify(this.task._id, this.title, this.description, this.isDone, this.task.list)
        .then(async (response) => {
          if(response.status === 200) {
            this.setEditable(false);
            for(let aTask of this.tasks) {
              if(aTask._id === this.task._id) {
                aTask.title = this.title;
                aTask.description = this.description;
                aTask.done = this.isDone;
              }
            }

            this.$emit("setTasks", this.tasks);
          } else {
            const result = await response.json();
            this.error = result.message;
          }
        });
      }
    },
    setEditable(value) {
      this.isEdit = value;
    },
    deleteTask(id) {
      ServiceTask.delete(id)
      .then(async (response) => {
        if(response.status === 200) {
          this.$emit("setTasks", this.tasks.filter(aTask => aTask._id !== id));
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
  },
  mounted() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.isDone = this.task.done;
  }
}
</script>
