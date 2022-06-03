<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <a class="navbar-brand"><router-link to="/">Home</router-link></a>
    </div>
  </nav>

   <h1>Manage gateways here</h1>

  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-9">
        <gateway-list/>
      </div>

      <div class="col-lg-3">
        <gateway-create/>
        <hr/>
        <peripheral-create/>

      </div>
    </div>

  </div>


</template>

<script setup>
import GatewayList from "../components/GatewayList.vue";
import GatewayCreate from "../components/GatewayCreate.vue";
import PeripheralCreate from "../components/PeripheralCreate.vue";
import { DialogWrapper } from 'vue3-promise-dialog';

</script>


<style scoped>
</style>