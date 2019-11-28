# HackTheFuture
Code for the HackTheFuture hackathon 2019

## JavaScript (ES6) code snippets in VSCode:
- in VSCode press ctrl + P:
 -> `ext install xabikos.JavaScriptSnippets`
 
 ## JavaScript code snippet examples:
 [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code#readme)

```
// HTTPPost example
## Usefull stacks:
[Monitoring stack](https://github.com/savvydatainsights/monitoring)
* Prometheus
* Grafana 
* NGINX
* Exporters

[Monitor docker](https://github.com/EricLondon/prometheus-postgresql-grafana-docker)
* Prometheus
* Grafana
* PostgreSql
* Dockerimage

## Code examples:
### HTTPPost
```
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};
const newPost = {
  userId: 1,
  id: 1337,
  title: "Foo",
  body: "bar bar bar"
};
const data = JSON.stringify(newPost);
httpPost("https://jsonplaceholder.typicode.com/posts", data, console.log);

// HTTPGet example
```

### HTTPGet
```
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
httpGet("https://jsonplaceholder.typicode.com/posts/1", console.log);

// POST with HTTPS
```

### POST with HTTPS
```
const https = require("https");

const data = JSON.stringify({
  brand: brand,
  appliance: appliance,
  serie: serie
});

const options = {
  hostname: "",
  port: "",
  path: "/orders",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  req.write(data);
  req.end();
});

// GET with node-fetch
=======
```

### GET with node-fetch
```
const fetch = require("node-fetch");

const base_url = "https://it-project-test-ahukuq.firebaseio.com/";

const getBrandsById = async id => {
  const response = await fetch(base_url + "Brands/" + id.toString());
  const myJson = await response.json();
  console.log(JSON.stringify(myJson));
  return JSON.stringify(myJson);
};
```
```

### Websocket
https://javascript.info/websocket#a-simple-example
```
let socket = new WebSocket("ws://javascript.info");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
```
