<template>
  <div class="table-responsive">
    <table class="table table-striped caption-top">
      <caption>List of Gateways</caption>
      <thead class="thead-dark">
      <tr>
        <th>Serial Number</th>
        <th>Name</th>
        <th>Ip Address</th>
        <th>Peripherals</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="gateway in gateways" :key="gateway._id">
        <td style="vertical-align : middle;text-align:center;">{{ gateway.serial_number }}</td>
        <td style="vertical-align : middle;text-align:center;">{{ gateway.name }}</td>
        <td style="vertical-align : middle;text-align:center;">{{ gateway.ipv4_address }}</td>
        <td style="text-align: left">
          <table class="table" v-if="gateway.peripherals.length > 0">
            <thead>
            <tr>
              <th scope="col">UID</th>
              <th scope="col">Vendor</th>
              <th scope="col">Status</th>
              <th scope="col">Created at</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="peripheral in gateway.peripherals">
              <td>{{ peripheral.uid }}</td>
              <td>{{ peripheral.vendor }}</td>
              <td :style="{ 'color': peripheral.status === 'online' ? 'green' : 'red'}">{{ peripheral.status }}</td>
              <td>{{ formatDate(peripheral.createdAt) }}</td>
              <td>
                <button type="button" class="btn btn-danger" @click="deletePeripheral(peripheral._id)"><i class="bi bi-trash"></i></button>
              </td>
            </tr>

            </tbody>
          </table>
          <p v-else> - </p>
        </td>
        <td style="vertical-align : middle;text-align:center;">
          <button type="button" class="btn btn-danger" @click="deleteGateway(gateway._id)"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import GatewayServices from "../services/GatewayServices";

export default {
  name: "GatewayList",
  data() {
    return {
      gateways: null
    }
  },
  created() {
    this.emitter.on('gateway-created', (evt) => {
      this.gateways.push(evt.gatewayData.data);
    });
    this.emitter.on('peripheral-created', (evt) => {
      const index = this.gateways.findIndex(a => a._id === evt.peripheralData.data.gateway)
      this.gateways[index].peripherals.push(evt.peripheralData.data);
     })
  },
  mounted() {
    this.getAllGateways()
  },
  methods: {
    getAllGateways() {
      GatewayServices.getGateways()
          .then(response => {
            this.gateways = response.data.data;
            this.emitter.emit('all', {'allGateways': response.data.data});
          }).catch(e => {
        throw e;
      })
    },

    async deleteGateway(id) {
      this.$root.open(()=>{
        GatewayServices.deleteGateway(id)
            .then(response => {
              this.gateways.splice(this.gateways.findIndex(a => a._id === response.data.data), 1)
            }).catch(e => {
          throw e;
        })
      })
    },
    async deletePeripheral(id) {
      this.$root.open(()=>{
        GatewayServices.deletePeripheral(id)
            .then(response => {
              this.getAllGateways()
              //this.gateways.splice(this.gateways.findIndex(a => a._id === response.data.data), 1)
            }).catch(e => {
          throw e;
        })
      })
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      let options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }

  }
}
</script>
<style scoped>
</style>