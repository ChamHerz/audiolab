const server = require("./server");
const { API_VERSION, PORT } = require("./config");
const port = process.env.PORT || 43977;

server.listen(port, () => {
  console.log("#########################");
  console.log("####### API REST ########");
  console.log("#########################");
  console.log(`http://127.0.0.1:/${port}/${API_VERSION}/`);
});
