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
        privateKey: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5"
    }),
    computed: {
        
    },
    methods: {
        async login() {
            config.userAccountName = this.accountName;
            config.privateKey = this.privateKey;

            // var receiverPubKey = await blockchainService.getAccountAuthorityKey("useraaaaaaab", "active");
            // var encryptObj = await encryptionService.encryptData("hello world!", receiverPubKey);
            // console.log(encryptObj)

            // config.privateKey = "5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg";

            // var senderPubKey = await blockchainService.getAccountAuthorityKey("useraaaaaaaa", "active");
            // var text = await encryptionService.decryptData(senderPubKey, encryptObj.encryptedData, encryptObj.nonce, encryptObj.checksum);

            // console.log(text);

            this.$router.push("/home");
        }
    }
};
</script>