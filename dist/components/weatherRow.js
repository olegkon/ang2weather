/**
 * Created by okonovalov on 5/24/2016.
 */
"use strict";
var weatherRow = (function () {
    function weatherRow(day, temperature, humidity, pressure, temp_min, temp_max, wind, precip, clouds) {
        this.day = day;
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.temp_min = temp_min;
        this.temp_max = temp_max;
        this.wind = wind;
        this.precip = precip;
        this.clouds = clouds;
    }
    return weatherRow;
}());
exports.weatherRow = weatherRow;
//# sourceMappingURL=weatherRow.js.map