import Vue from 'vue'
export default() => {
    Vue.filter("parseTime", (time) => {
        let date = new Date();
        date.setTime(time);
        let dateArr = date
            .toLocaleDateString()
            .split("/");
        dateArr.forEach((item, index, input) => {
            if (index >= 1) {
                if (item.length < 2) {
                    input[index] = "0" + item;
                }
            }
        })
        return dateArr.join("-");
    })
}
