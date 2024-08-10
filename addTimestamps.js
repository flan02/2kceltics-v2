const fs = require("fs");

// Carga el archivo JSON
const data = require("./schedule.json");

// Itera sobre cada documento y agrega createdAt y updatedAt
const updatedData = data.map((doc) => ({
  ...doc,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Guarda el archivo JSON con las fechas actualizadas
fs.writeFileSync(
  "schedule_with_timestamps.json",
  JSON.stringify(updatedData, null, 2)
);

console.log("Timestamps added successfully!");
