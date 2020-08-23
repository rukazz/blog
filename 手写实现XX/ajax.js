function ajax(options) {
  const { method, success, async, params, headers, data } = options;
  const url =
    method + params
      ? Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&")
      : "";
  let request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  request.onReadyChange = function () {
    /*
    0  未开始
    1 服务器连接已建立
    2 请求已接收
    3 请求已处理
    4 已结束
     */
    if ((request.readyState === 4 && request.status === 200)) {
      success && success(request.responseText);
    }
  };

  request.open(method, url, async);
  if (headers) {
    Object.keys(headers).map((key) =>
      request.setRequestHeader(key, headers[key])
    );
  }
  method === "GET" ? request.send() : request.send(data);
}

ajax({
  method: "GET",
  url: "...",
  success: function (res) {
    console.log("success", res);
  },
  async: true,
  params: {
    name: "xj",
    age: 19,
  },
  headers: {
    "Content-Type": "application/json",
  },
});
