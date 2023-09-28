<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
  },
  deserialize: {
    type: Function,
  },
  serialize: {
    type: Function,
  },
});

const emits = defineEmits(['update:modelValue']);

const date = computed(() => {
  return props.deserialize(props.modelValue);
});

const updateModelValue = (value, field) => {
  const newDate = date.value;
  newDate[field] = Number(value);
  const serialized = props.serialize(newDate);
  if (serialized) {
    emits('update:modelValue', serialized);
  }
};
</script>

<template>
  <input
    :value="date.year"
    @input="updateModelValue($event.target.value, 'year')"
  />
  <input
    :value="date.month"
    @input="updateModelValue($event.target.value, 'month')"
  />
  <input
    :value="date.day"
    @input="updateModelValue($event.target.value, 'day')"
  />

  <pre>
        Internal date is:
        {{ date }}
    </pre
  >
</template>
