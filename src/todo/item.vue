<template>
  <div :class="['todo-item',todo.completed?'completed':'']">
    <input 
    class = "toggle"
    type="checkbox"
    v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destroy" @click="deleteTodo"></button>
  </div>
</template>


<script>
export default {
  props:{
    todo:{
      type:Object,
      required:true
    }
  },
  methods:{
    deleteTodo(){
      this.$emit('del',this.todo.id);
    }
  }
}
</script>

<style scoped>
.todo-item{
  position: relative;
  background-color: #fff;
  font-size: 24px;
  border-bottom: 1px solid rgba(0,0,0,0.6)
}

.todo-item:hover .destroy:after{
  content:"x"
}

.todo-item label {
  white-space: pre-line;
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-item.completed label{
  color: #d9d9d9;
  text-decoration: line-through;
}

.toggle {
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  border: none;
  -webkit-appearance: none;
  background-color: white;
  outline: none;
}

.toggle:after {
  content:' ';
  background-image: url('../assets/images/no.svg');
  background-size: 30px 30px;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
}

.toggle:checked::after {
  background-image: url('../assets/images/complete.svg');
}

.destroy {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
  background-color: transparent;
  -webkit-appearance: none;
  border-width: 0;
  cursor: pointer;
  outline: none;
}
</style>
