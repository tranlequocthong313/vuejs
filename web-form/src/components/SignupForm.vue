<template>
  <form @submit.prevent="submitForm">
    <label for="email">Email:</label>
    <input id="email" type="email" required v-model="email" />

    <label for="password">Password:</label>
    <input id="password" type="password" required v-model="password" />
    <div class="error" v-if="passwordError">{{ passwordError }}</div>

    <label for="role">Role:</label>
    <select id="role" v-model="role">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <label for="skills">Skills:</label>
    <input id="skills" v-model="skill" />
    <div
      class="pill"
      v-for="skill in skills"
      :key="skill"
      @click="removeSkill(skill)"
    >
      {{ skill }}
    </div>

    <div class="terms">
      <input type="checkbox" required v-model="acceptTerms" />
      <label>Accept terms and conditions</label>
    </div>

    <div class="submit">
      <button class="button">Create an account</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      role: 'developer',
      acceptTerms: false,
      skill: '',
      skills: [],
      passwordError: '',
    };
  },
  methods: {
    removeSkill(skill) {
      this.skills = this.skills.filter((_skill) => skill !== _skill);
    },
    submitForm() {
      if (this.password.trim().length < 8) {
        console.log(this.password, this.passwordError);
        this.passwordError = 'Password must be at least 8 characters long.';
      } else {
        this.passwordError = '';
      }
    },
  },
  watch: {
    skill(val, oldval) {
      const comma = ',';
      if (val[val.length - 1] === comma) {
        if (!this.skills.includes(oldval)) {
          this.skills.push(oldval);
        }
        this.skill = '';
      }
    },
  },
};
</script>

<style>
form {
  max-width: 420px;
  padding: 40px;
  margin: 30px auto;
  border-radius: 12px;
  background-color: white;
  text-align: left;
}

label {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #aaa;
  margin: 25px 0px 10px;
}

input,
select {
  display: block;
  font-size: 1.6rem;
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
  padding: 10px 6px;
  color: #555;
}

input[type='checkbox'] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

.submit {
  text-align: center;
}

.button {
  background-color: #0b6dff;
  border: 0;
  padding: 12px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  font-size: 1.6rem;
  font-weight: bold;
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
