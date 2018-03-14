import Vue from 'vue'
import crypto from 'crypto'

export default() => {
    Vue.prototype._md5 = function (text) {
        return crypto
            .createHash("md5")
            .update(text)
            .digest("base64");
    }
}