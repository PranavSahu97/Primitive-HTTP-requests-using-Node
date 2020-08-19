const projects = require('./data-store');
const http = require('http');
const url = require('url');

let server = http.createServer((req,resp) => {
  if (req.url.split("/")[1] !== "projects") {
    resp.writeHead(404, { 'Content-Type': 'application/json' });
    resp.end(`{"Error": "${resp.statusCode}","message": "RESOURCE NOT FOUND"}`);
  }
  else {
    const id = req.url.split("/")[2];
    if (id === undefined || id === null || id === ""){
      resp.writeHead(400,{'Content-Type': 'application/json'});
      resp.end(`{"Error": "${resp.statusCode}","message": "BAD REQUEST"}`);
    }
    else {
      let flag = "false";
      for(let project of projects){
        if(project.id === Number(id)){
          resp.writeHead(200,{'Content-Type': 'application/json'});
          resp.end(`{"id": ${(project.id)},"name":"${project.name}"}`);
          flag = "true";
          break;
        }
      }
      if(flag === "false"){
        resp.writeHead(404,{'Content-Type': 'application/json'});
        resp.end(`{"Error": "${resp.statusCode}","message": "RESOURCE NOT FOUND"}`); 	
      }
    }
  }
}).listen(8000);

module.exports = server;