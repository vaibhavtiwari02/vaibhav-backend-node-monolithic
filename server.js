const cluster = require("cluster");
const os = require("os");
const app = require("./app");
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Worker ${process.pid} running on port ${PORT}`);
});
