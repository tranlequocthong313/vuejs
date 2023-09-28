<script setup>
import { ref } from 'vue';
import { DateTime } from 'luxon';
import moment from 'moment';

import {
  luxonDeserialize,
  luxonSerialize,
  momentDeserialize,
  momentSerialize,
} from './services/datetime';
import DateTimeComponent from './DateTime.vue';

const date = {
  year: '2003',
  month: '03',
  day: '31',
};

const luxonDate = ref(DateTime.now());

const momentDate = ref(moment());
</script>

<template>
  <DateTimeComponent
    v-model="luxonDate"
    :deserialize="luxonDeserialize"
    :serialize="luxonSerialize"
  />
  {{ luxonDate.toISODate() }}

  <DateTimeComponent
    v-model="momentDate"
    :deserialize="momentDeserialize"
    :serialize="momentSerialize"
  />
  {{ momentDate.toString() }}
</template>
