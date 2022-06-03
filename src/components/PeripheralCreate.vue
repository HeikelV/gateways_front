<template>
  <form ref="prp" @submit="onSubmit">
    <h3>New Peripheral</h3>

    <div class="mb-2">

      <select v-model="selected_gateway" class="form-select mb-3">
        <option disabled value="">Please select the Gateway</option>
        <option v-for="gateway in gateways_list" :value="gateway._id">{{ gateway.serial_number }}</option>
      </select>
    </div>

    <div class="mb-2">
      <input id="uid" v-model="uid" class="form-control" type="text" placeholder="UID Number">
    </div>

    <div class="mb-2">
      <input id="vendor" v-model="vendor" class="form-control" type="text" placeholder="Vendor">
    </div>

    Status:
    <div class="form-check form-switch">
      <label class="form-check-label" for="status">{{ status }}</label>
      <input class="form-check-input" v-model="status" true-value="online" false-value="offline" type="checkbox"
             id="status" checked />
    </div>

    <div class="d-grid gap-2">
      <button class="btn btn-primary" type="submit">Save</button>
    </div>
  </form>
  <vue-basic-alert :duration="300" :close-in="3000" ref="alert"/>
</template>

<script>
import PeripheralServices from "../services/PeripheralServices";

export default {
  name: 'PeripheralCreate',
  data() {
    return {
      gateways_list: [],
      selected_gateway: '',
      uid: '',
      vendor: '',
      status: 'online',
      error_message: ''
    }
  },
  created() {
    this.emitter.on('all', (evt) => {
      this.gateways_list = evt.allGateways;
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      if (!this.vendor) {
        alert('Please Add a Vendor Name')
        return
      }
      const data = {
        uid: this.uid,
        vendor: this.vendor,
        gateway: this.selected_gateway,
        status: this.status
      }
      PeripheralServices.createPeripheral(data)
          .then(response => {
            this.emitter.emit('peripheral-created', {'peripheralData': response.data});
            this.$refs.prp.reset();
          })
          .catch(e => {
            this.showError(e.response.data.details)
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

<style>
.form-check {
  display: inline-block !important;
}
</style>