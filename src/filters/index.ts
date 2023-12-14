import Vue from "vue";
import moment from "moment";

type formattedDateValue = string|number|Date

export default function setCustomFilters() {
  Vue.filter("formattedDate", function (value: formattedDateValue): string {
    if (!value) {
      return "";
    }

    let date: formattedDateValue = value;

    if (typeof date === "number") {
      date = new Date(value as number * 1000);
    }

    return moment(date).format("ddd, MMM D");
  });
}
