import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      baseURL: 'https://subreddit-post.herokuapp.com',
      Authorization: token
    }
  });
};

export default axiosWithAuth;