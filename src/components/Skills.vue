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
      <md-dialog-confirm
      :md-active.sync="active"
      md-title="คุณต้องการจะลบข้อมูลนี้หรือไม่?"
      md-confirm-text="ยืนยันการลบ"
      md-cancel-text="ยกเลิก"
      @md-cancel="onCancel"
      @md-confirm="onConfirm(skillKey)" />
    <p class="error" v-if="errors.has('skill')">ต้องไม่ต่ำกว่า 5 ตัวอักษร</p>
      <md-card class="skill-card" v-for="(skill, index) in skills" :key="index">
      <md-card-content>
        <span class="text-skill">{{ index +1 }}. {{ skill.skill}}
          <span @click="removeSkill(skillKey = index)" class="remove">
          <md-button class="md-fab md-mini">
            <md-icon>delete</md-icon>
          </md-button>
          </span>
        </span>
      </md-card-content>
      </md-card>
    </div>
      </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item"></div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Skill',
  data() {
    return {
      name: 'Skills',
      skillInput: '',
      skillKey: '',
      btnState: true,
      active: false
    }
  },
  computed: {
    skills () {
      return this.$store.getters.getTodos
    }
  },
  methods: {
    addSkill() {
      this.$store.dispatch('addTodo', this.skillInput)
      this.skillInput = ''
    },
    removeSkill() {
      this.active = true;
    },
    onConfirm (key) {
      this.$store.dispatch('removeTodo', key)
      },
    onCancel () {
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
  padding: 1rem;
  padding: 1rem;
  min-width: 250px;
}

ul {
list-style-type: none;
    margin: auto;
    padding: 0;
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
 .skill-layout {
  margin-top: 1rem;
  background: #c7d7ff;
}

.md-icon {
  width: 13px;
  min-width: 13px;
  height: 13px;
  font-size: 13px!important;
}

.md-fab.md-mini {
  width: 25px;
  min-width: 25px;
  height: 25px;
  margin: auto;
}
.md-dialog {
  top: 20%;
}
</style>

<style lang="scss" scoped>
@import "../../node_modules/vue-material/src/theme/engine";

</style>
