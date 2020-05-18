/** @format */

const https = require("https");
const stream = require("stream");
const http = require("http");
const fs = require("fs");

module.exports = {
  testingStream: () => {
    let bufferData = "";
    https.get(
      "https://s1.ticketm.net/dam/a/668/6a33a097-93a4-4294-a1ea-befab7ce9668_1156201_RETINA_PORTRAIT_16_9.jpg",
      (res) => {
        res.on("data", (data) => {
          bufferData += data;
        });
        res.on("end", () => {
          console.log("hhhhh", bufferData.toString());
        });
      }
    );
  },
  anotherTesting: () => {
    console.log("in second function")
  
    const server = http.createServer();
    server.on("request", (req, res) => {
           let a = http.get(
        "https://s1.ticketm.net/dam/a/668/6a33a097-93a4-4294-a1ea-befab7ce9668_1156201_RETINA_PORTRAIT_16_9.jpg"
      );
      a.pipe(res);
    });
  },
};
