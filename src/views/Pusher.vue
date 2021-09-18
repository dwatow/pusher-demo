<template>
  <div>
    <pre>{{ message }}</pre>
    <div>
      <label>public: <input type="text" v-model="message">
      </label>
      <button @click="sendPublicMessage">送出</button>
    </div>
    <div>
      <label>private: <input type="text" v-model="message">
      </label>
      <button @click="sendPrivateMessage">送出</button>
    </div>
    <span>public_channel</span>
    <pre>{{ public_channel }}</pre>
    <span>private_channel</span>
    <pre>{{ private_channel }}</pre>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
// import Echo from 'laravel-echo';
import backendAPI from '@/utility/API';

export default {
  name: 'Pusher',
  created() {
    this.pusher = new Pusher('local', {
      wsHost: 'ws.soj.tw',
      wsPort: 80,
      wssPort: 443,
      httpHost: 'ws.soj.tw',
      httpPort: 80,
      httpsPort: 443,
      authEndpoint: 'https://ws.soj.tw/broadcasting/auth',
      forceTLS: true,
      auth: {
        headers: {
          Authorization: 'Bearer 1|4rgReWg4fYdbfhPBLCw8p8ksSyPQYTH4ywyewKw2',
        },
      },
    });
  },
  mounted() {
    this.pusher.subscribe('new-message')
      .bind('App\\Events\\NewMessage', (e) => {
        console.log(e);
        this.public_channel = e.message;
      });

    this.pusher.subscribe('private-new-message')
      .bind('App\\Events\\PrivateMessage', (e) => {
        this.private_channel = e.message;
      });
  },
  data() {
    return {
      echo: null,
      public_channel: null,
      private_channel: null,
      message: 'Pusher',
    };
  },
  methods: {
    sendPublicMessage() {
      const { message } = this;
      backendAPI.GET('/public-channel', {
        message,
      });
    },
    sendPrivateMessage() {
      const { message } = this;
      backendAPI.GET('/private-channel', {
        message,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
