import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'https://ws.soj.tw',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Authorization': 'Bearer 1|4rgReWg4fYdbfhPBLCw8p8ksSyPQYTH4ywyewKw2',
  },
});

export default {
  GET(url, params) {
    return backendAPI.get(url, {
      params,
    });
  },
};
