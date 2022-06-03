<script setup>

</script>

<template>


  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="../assets/pngegg.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="1080" height="1326" loading="lazy">
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 lh-1 mb-3">Gateways (Musala Test)</h1>
        <p class="lead">This sample project is managing gateways - master devices that control multiple peripheral devices. </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <router-link type="button" class="btn btn-outline-secondary btn-lg px-4" to="/gateways">Management</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.lead {
  font-size: 1.25rem;
  font-weight: 300;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>