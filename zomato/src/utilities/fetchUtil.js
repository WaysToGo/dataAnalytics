import axios from "axios";
export default (url, setState) => {
  fetch(url)
    .then(response => {
      return response.ok ? response : Promise.reject(response);
    })
    .then(data => data.json())
    .then(data => {
      setState({});
    })
    .catch(error => {
      setState({ loading: false, error: "Sorry somthing went wrong" });
    });
};

function postData(url = ``, data = {}) {
  return axios
    .post(url, {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    })
    .then(response => response.body.json());
}

function getData(url = ``) {
  return axios
    .get(url)
    .then(response => {
      return response.ok ? response : Promise.reject(response);
    })
    .then(data => data.body.json());
}
export { postData, getData };
