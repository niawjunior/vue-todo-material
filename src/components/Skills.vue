<template>
  <div>
    <div class="md-layout">
    <div class="md-layout-item"></div>
    <div class="md-layout-item skill-layout">
    <md-card>
    <md-card-content>
     <div class="skill-box">
      <h1>{{ name }}</h1>
     <md-field>
      <md-input class="input"  v-validate="'min:5'" name="skill" v-model="skillInput" v-on:keyup.enter="addSkill" type="text" placeholder="Enter a skill you have.."></md-input>
    </md-field>
    <p class="error" v-if="errors.has('skill')">ต้องไม่ต่ำกว่า 5 ตัวอักษร</p>
      <md-card class="skill-card" v-for="(skill, index) in skills" :key="skill.id">
      <md-card-content>
        <div class="text-skill">{{ index +1 }}. {{ skill.skill}}
          <span @click="removeSkill(skillKey = skill.id)" class="remove">
          <md-button class="md-fab md-mini">
            <md-icon>delete</md-icon>
          </md-button>
          </span>
           <span @click="editSkill(skillKey = skill.id)" class="edit">
            <md-button class="md-fab md-mini md-primary">
              <md-icon>edit</md-icon>
            </md-button>  
          </span>
        </div>
      </md-card-content>
      </md-card>
      <div v-if="loading" style="text-align:center; margin-top: 20px;">
     <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
    </div>
      </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item"></div>
  </div>

  <md-dialog-confirm
      :md-active.sync="remove"
      md-title="คุณต้องการจะลบข้อมูลนี้หรือไม่?"
      md-confirm-text="ยืนยันการลบ"
      md-cancel-text="ยกเลิก"
      @md-cancel="onCancelRemove"
      @md-confirm="onConfirmRemove(skillKey)" 
      />

  <md-dialog-prompt
      :md-active.sync="edit"
      v-model="editValue"
      md-title="แก้ไข Skill"
      md-input-maxlength="20"
      md-input-placeholder="Enter a skill you have.."
      md-cancel-text="ยกเลิก"
      md-confirm-text="ยืนยันการแก้ไข"
      @md-cancel="onCancelEdit"
      @md-confirm="onConfirmEdit(skillKey)" 
      />
  </div>
</template>

<script>
export default {
  name: 'Skill',
  data() {
    return {
      button : false,
      name: 'Skills',
      skillInput: '',
      skillKey: '',
      editValue: '',
      btnState: true,
      remove: false,
      edit: false
    }
  },
  beforeCreate(){
    this.$store.dispatch('setTodos');
  },
  computed: {
    skills() {
      return this.$store.getters.getTodos
    },
    loading() {
      return this.$store.state.load
    }
  },
  methods: {
    addSkill() {
      this.$store.dispatch('addTodo', this.skillInput)
      this.skillInput = ''
    },
    removeSkill() {
      this.remove = true
    },
    editSkill() {
      this.$store.getters.getTodoByIndex(this.skillKey).then(result => {
        this.editValue = result[0].skill;
        this.edit = true
      })
    },
    onConfirmRemove (key) {
      this.$store.dispatch('removeTodo', key)
      },
    onCancelRemove () {
    },
    onConfirmEdit (key) {
      if (this.editValue) {
        this.$store.dispatch('editTodo', {
          key,
          newTodo: this.editValue
        })
      }
    },
    onCancelEdit () {
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error {
  background-color: rgb(243, 176, 176);
  padding: 10px;
}
.skill-card {
  margin-top: 1rem;
  border-left: 5px solid #59c1f1;
}
.skill-box {
  min-width: 270px;
}

.text-skill {
  padding: .1rem;
  margin:.1rem;
  color: rgb(73, 72, 72);
  word-break: break-word;
}

.remove {
  right:5px;
  position: absolute;
  cursor:pointer;
}

.edit {
  right:45px;
  position: absolute;
  cursor:pointer;
}

 .skill-layout {
  margin-top: 1rem;
}

.md-icon {
  width: 15px;
  min-width: 15px;
  height: 15px;
  font-size: 15px!important;
}

.md-fab.md-mini {
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin: auto;
}
.md-dialog {
  top: 20%;
}
</style>

<style lang="scss" scoped>
@import "../../node_modules/vue-material/src/theme/engine";
</style>
