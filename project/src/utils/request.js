// import { Modal, notification } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
// notification.config({
//   maxCount: 1,
//   duration: 2,
// });
// Axios.interceptors.response.use(
//   (response) => {
//     // do something with the response data

//     if (response && response.data.statusCode === 500) {
//       notification.error({
//         message: "Thông báo!",
//         description: response.data.message,
//       });
//     }
//     if (response && response.data.statusCode === 200 && response.data.message) {
//       notification.success({
//         message: "Thông báo!",
//         description: response.data.message,
//       });
//     }
//     return response;
//   },
//   (error) => {
//     notification.config({
//       maxCount: 1,
//       duration: 4,
//     });
//     let mess = "";
//     if (error?.response?.status === 401) {
//       window.location.href = "/login";
//       localStorage.clear();
//       return;
//     }
//     if (error && error.response) {
//       mess = error.response.data.message;
//       if (mess) {
//         notification.error({
//           message: "Thông báo!",
//           description: (
//             <p
//               dangerouslySetInnerHTML={{
//                 __html: mess,
//               }}
//             />
//           ),
//         });
//       }
//     } else {
//       notification.error({
//         message: "Thông báo!",
//         description: "Lỗi hệ thống",
//         maxCount: 1,
//       });
//     }
//     return error.response;
//   }
// );

//gọi api ko có auth method get
async function defaultGet(endpoint) {
  return await Axios({
    method: "get",
    url: endpoint,
  });
}

export async function getData({ url, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await defaultGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}
//end gọi api ko có auth method get

//gọi api ko có auth method post
async function defaultPost(endpoint, method, payload) {
  const body = {};
  Object.keys(payload).forEach((key) => {
    body[key] = payload[key];

    if (
      payload[key] ||
      typeof payload[key] === "boolean" ||
      typeof payload[key] === "number"
    ) {
      body[key] = payload[key];
    }
    return null;
  });
  return await Axios({
    headers: {},
    method: method,
    url: endpoint,
    data: body,
  });
}

export async function postData({
  url,
  payload,
  method = "post",
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    const res = await defaultPost(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}
//end gọi api ko có auth method post

//gọi api với auth method get
export async function authGet(endpoint) {
  const token = localStorage.getItem("token_reactjs");
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: endpoint,
  });
}

export async function authGetData({ url, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await authGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}
//end gọi api với auth method get

//gọi api với auth method delete
async function authDelete(endpoint) {
  const token = localStorage.getItem("token_reactjs");
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "delete",
    url: endpoint,
  });
}

export async function startDelete({ url, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await authDelete(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}
//show popup confirm delete
// export function authDeleteData({
//   url,
//   setLoading,
//   onSuccess,
//   content = "Bạn có chắc chắn muốn xóa !",
//   title = "Xác nhận",
// }) {
//   Modal.confirm({
//     centered: true,
//     title,
//     content,
//     onOk() {
//       startDelete({ url, setLoading, onSuccess });
//     },
//     onCancel() {},
//     okText: "Đồng ý",
//     okButtonProps: { type: "danger" },
//     cancelText: "Hủy",
//   });
// }
//end gọi api với auth method delete

//gọi api với auth method post
async function authPost(endpoint, method, payload) {
  const token = localStorage.getItem("token_reactjs");
  const body = {};
  Object.keys(payload).forEach((key) => {
    if (
      payload[key] ||
      typeof payload[key] === "boolean" ||
      typeof payload[key] === "number"
    ) {
      body[key] = payload[key];
    }
    return {};
  });
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: method,
    url: endpoint,
    data: body,
  });
}

export async function authPostData({
  url,
  method,
  payload,
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    const res = await authPost(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}
//end gọi api với auth method post

// export async function authPostFormData(endpoint, method, payload) {
//   const token = localStorage.getItem("token_reactjs");
//   const body = {};

//   Object.keys(payload).forEach((key) => {
//     if (
//       payload[key] ||
//       typeof payload[key] === "boolean" ||
//       typeof payload[key] === "number"
//     ) {
//       body[key] = payload[key];
//     }
//     return {};
//   });
//   const formData = new FormData();
//   Object.keys(body).forEach((key) => {
//     return formData.append(key, body[key]);
//   });

//   if (body.imageFile) {
//     formData.append("file", body.imageFile);
//   }
//   return await Axios({
//     headers: {
//       Authorization: `Bearer ${token}`,
//       ContentType: "multipart/form-data",
//     },
//     method: method,
//     url: endpoint,
//     data: formData,
//   });
// }

// export async function authPostFileData({
//   url,
//   method,
//   payload,
//   setLoading,
//   onSuccess,
// }) {
//   setLoading(true);
//   try {
//     const res = await authPostFormData(url, method, payload);
//     if (res && res.data) {
//       onSuccess(res.data);
//     }
//   } catch (err) {
//   } finally {
//     setLoading(false);
//   }
// }

// function getFileName(response) {
//   let filename = "";
//   const disposition = response.headers["content-disposition"];
//   if (disposition && disposition.indexOf("filename") !== -1) {
//     const filenameRegex = /UTF-8(.*)/;
//     const matches = filenameRegex.exec(disposition);
//     if (matches != null && matches[1]) {
//       filename = decodeURIComponent(matches[1].replace(/['"]/g, ""));
//     }
//   }
//   return filename;
// }
// export async function downloadFile({ endpoint, setLoading }) {
//   setLoading(true);
//   const token = localStorage.getItem("token_reactjs");
//   try {
//     const res = await Axios({
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       responseType: "blob",
//       method: "GET",
//       url: endpoint,
//     });

//     const fileName = getFileName(res);
//     if (res && res.data && res.status === 200) {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName ? fileName : "template.xlsx");
//       document.body.appendChild(link);
//       link.click();
//     }
//     if (res && res.data && res.status === 422) {
//       return notification.error({
//         message: `Hãy nhập đủ điều kiện tìm kiếm`,
//       });
//     } else if (fileName === "") {
//       const resTypeText = await Axios({
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         method: "GET",
//         url: endpoint,
//       });
//       alertMessage(
//         "error",
//         "Thông báo",
//         res?.message || resTypeText?.data?.message || "Dữ liệu không tìm thấy"
//       );
//     }
//   } catch (err) {
//   } finally {
//     setLoading(false);
//   }
// }

// export async function downloadFilePostData({
//   endpoint,
//   setLoading,
//   query,
//   errorMess,
// }) {
//   setLoading(true);
//   const token = localStorage.getItem("token_reactjs");
//   try {
//     const res = await Axios({
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       responseType: "blob",
//       method: "POST",
//       url: endpoint,
//       data: query,
//     });
//     const fileName = getFileName(res);
//     if (res && res.data && res.status === 200) {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName ? fileName : "template.xlsx");
//       document.body.appendChild(link);
//       link.click();
//     }
//     if (res && res.data && res.status === 400) {
//       notification.error({
//         message: "Thông báo",
//         description: `${
//           query?.tramIds?.length === 0 ? "Hãy chọn trạm" : errorMess
//         }`,
//       });
//     }
//   } catch (err) {
//   } finally {
//     setLoading(false);
//   }
// }

async function authPostImageFormData(endpoint, method, payload) {
  const token = localStorage.getItem("token_reactjs");
  const formData = new FormData();
  if (payload) {
    payload.forEach((file) => {
      formData.append("fileExcel", file);
    });
  }
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
    method: method,
    url: endpoint,
    data: formData,
  });
}

export async function authPostImageData({
  url,
  method,
  payload,
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    const res = await authPostImageFormData(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

export const useCustomDebounce = (value, time = 600) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), time);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
};
