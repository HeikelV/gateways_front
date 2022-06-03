<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { DialogWrapper } from 'vue3-promise-dialog';
import { defineComponent } from 'vue';
import { confirm } from './helpers/dialog';

 export default defineComponent({
  components: {
    DialogWrapper,
  },
  setup() {
    async function open(callback) {
      if (await confirm('Are you sure ?')) {
        callback()
      }
    }
    return {
      open,
    };
  },
});

</script>

<template>
  <router-view></router-view>
  <DialogWrapper />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
