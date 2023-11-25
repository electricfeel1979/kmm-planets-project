"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const habitablePlanets = [];
const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
};
fs_1.default.createReadStream('kepler_data.csv')
    .pipe((0, csv_parse_1.parse)({
    comment: '#',
    columns: true
}))
    .on('data', (data) => {
    if (isHabitablePlanet(data))
        habitablePlanets.push(data);
})
    .on('error', (err) => {
    console.log(err);
})
    .on('end', () => {
    console.log(habitablePlanets);
    console.log(habitablePlanets.map(planet => {
        return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
});
