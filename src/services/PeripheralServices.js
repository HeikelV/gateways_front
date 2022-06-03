import {axiosBase} from "./index";

class PeripheralServices {
    createPeripheral(data) {
        return axiosBase.post("/peripherals",data);
    }

}
export default new PeripheralServices();