<template>
  <form ref="gtw" @submit="onSubmit">
    <h3>New Gateway</h3>
    <div class="mb-2">
      <input id="serial_number" v-model="serial_number" class="form-control" type="text" placeholder="Serial Number">
    </div>

    <div class="mb-2">
      <input id="name" v-model="name" class="form-control" type="text" placeholder="Name">
    </div>
    <div class="mb-2">
      <input id="ipv4_address" v-model="ipv4_address" class="form-control" type="text" placeholder="IP Adress">
      <div id="ipblock" class="form-text">
        Must be a valid ip address.
      </div>
    </div>
    <div class="d-grid gap-2">
      <button class="btn btn-primary" type="submit">Save</button>
    </div>
  </form>
  <vue-basic-alert :duration="300" :close-in="3000" ref="alert"/>
</template>

<script>
import GatewayServices from "../services/GatewayServices";

export default {
  name: 'GatewayCreate',
  data() {
    return {
      serial_number: '',
      name: '',
      ipv4_address: '',
      message: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      if (!this.name) {
        alert('Please Add a Name')
        return
      }
      const data = {
        serial_number: this.serial_number,
        name: this.name,
        ipv4_address: this.ipv4_address
      }
      GatewayServices.createGateways(data)
          .then(response => {
            this.emitter.emit('gateway-created', {'gatewayData': response.data});
            this.$refs.gtw.reset();
          }).catch(e => {
        this.showError(e.response.data.details)
        throw e.response.data.details;
      })
    },
    showError(message) {
      this.$refs.alert.showAlert(
          'error', // There are 4 types of alert: success, info, warning, error
          message, // Message of the alert
          'Error', // Header of the alert
          {
            iconSize: 35, // Size of the icon (px)
            iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
            position: 'bottom right'
          } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
      )
    }
  }
}
</script>