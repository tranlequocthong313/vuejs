<script setup lang="ts">
import { ref, computed } from 'vue';

import { patientForm, isFormValid, Patient, PatientFormValidity } from './form';

const emits = defineEmits<{
  submit: [formValidity: PatientFormValidity];
}>();

const form = ref<Patient>({
  name: '',
  weight: {
    value: 0,
    units: 'kg',
  },
});

const validatedForm = computed(() => patientForm(form.value));
const valid = computed(() => isFormValid(validatedForm.value));

const submit = () => {
  console.log('submit');

  emits('submit', validatedForm.value);
};
</script>

<template>
  <h3>Patient Data</h3>

  <form @submit.prevent="submit">
    <div class="field">
      <div class="error" v-if="!validatedForm.name.valid">
        {{ validatedForm.name.message }}
      </div>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" v-model.trim="form.name" />
    </div>

    <div class="field">
      <div class="error" v-if="!validatedForm.weight.valid">
        {{ validatedForm.weight.message }}
      </div>
      <label for="weight">Weight</label>
      <input
        type="text"
        id="weight"
        weight="weight"
        v-model.number="form.weight.value"
      />
      <select name="weight-units" v-model="form.weight.units">
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>

      <div class="field">
        <button :disabled="!valid" type="submit">Submit</button>
      </div>
    </div>
  </form>

  <pre>
    Patient Data
    {{ form }}
  </pre>

  <pre>
    Form State
    {{ validatedForm }}
  </pre>
</template>

<style scoped></style>
