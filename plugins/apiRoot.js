import Vue from 'vue'
export default() => {
    const production = true;
    Vue.prototype.apiRoot = production
        ? "http://server.lvshihaonb.cn"
        : "http://localhost:8088";
}