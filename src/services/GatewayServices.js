import {axiosBase} from "./index";

class GatewayServices {
    getGateways() {
        return axiosBase.get("/gateways");
    }
    createGateways(data) {
        return axiosBase.post("/gateways",data);
    }
    deleteGateway(id) {
        return axiosBase.delete(`/gateways/${id}`);
    }
    deletePeripheral(id) {
        return axiosBase.delete(`/peripherals/${id}`);
    }

}
export default new GatewayServices();