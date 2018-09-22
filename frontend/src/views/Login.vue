<template lang="html">
<div>
  <div>
    <span>UserName</span>
    <input type="text" :value="accountName" />
  </div>
  <div>
      <span>Private Key</span>
      <input type="text" :value="privateKey" />
  </div>
  <div>
      <button @click="login">Login</button>
  </div>
</div>
</template>

<script>
import config from "../config.js"
export default {
    async mounted() {

    },
    data: () => ({
        accountName: null,
        privateKey: null
    }),
    computed: {
        
    },
    methods: {
        login() {
            config.userAccountName = this.accountName;
            config.privateKey = this.privateKey;
            this.$router.push("/home");
        }
    }
};
</script>