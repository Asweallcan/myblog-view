import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/zh-CN'

export default() => {
    Vue.use(Element, {locale});
    Vue.prototype.showConfirm = function (message) {
        return this.$confirm(message, "", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });
    };
    Vue.prototype.showMessage = function (type, message) {
        this.$message({type: type, message: message})
    };
}