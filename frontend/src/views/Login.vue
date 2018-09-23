<template lang="html">
<div>
  <div>
    <span>UserName</span>
    <input type="text" v-model="accountName" />
  </div>
  <div>
      <span>Private Key</span>
      <input type="text" v-model="privateKey" />
  </div>
  <div>
      <button @click="login">Login</button>
  </div>
</div>
</template>

<script>
import config from "../config.js"
import encryptionService from "../services/encryptionService.js"
import blockchainService from "../services/blockchainService.js"
export default {
    async mounted() {

    },
    data: () => ({
        accountName: "andres",
        privateKey: "5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx"
    }),
    computed: {
        
    },
    methods: {
        async login() {
            config.userAccountName = this.accountName;
            config.privateKey = this.privateKey;
            this.$router.push("/home");
        }
    }
};
</script>