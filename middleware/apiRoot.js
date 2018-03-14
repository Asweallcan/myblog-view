export default function (context) {
  const production = true;
  const apiRoot = production ?
    "http://server.lvshihaonb.cn" :
    "http://localhost:8088";
  context.apiRoot = apiRoot
}
