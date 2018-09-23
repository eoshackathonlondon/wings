<template lang="html">
    <div class="wrap alignLeft">

        <h3>Your Name</h3>
        <sui-input class="fullwidth" v-model="name" />

        <sui-input class="fullwidth" v-model="profile_pic_url" />
        
        <h3>Current Age</h3>
        <sui-dropdown class="fullwidth"
            placeholder="Select Age"
            selection
            :options="options"
            v-model="current"
        />

        <h3>Private Profile</h3>
        <span>The field is only exposed when both parties connect. <b>Encrypted on blockchain.</b></span>
        <div class="half-spacer" />
        <textarea rows="7" style="border:1px solid #ccc; width:100%" v-model="private_data.description">
        </textarea>

        <div class="spacer" />
        <sui-button @click="saveProfile" color='red'>Save Profile</sui-button>
    </div>
</template>

<script>
import encryptionService from "../services/encryptionService.js"
import blockchainService from "../services/blockchainService.js"
import config from "../config.js"

export default {
  async mounted() {
      var user = await this.getLoggedInUser();
      this.name = user.name;
      this.encryption_key = user.encryption_key;
      this.current = user.age;
      this.profile_pic_url = user.profile_pic_url;

      if(user.private_data && user.private_data.data) {
          var prvDataText = encryptionService.decryptData(this.encryption_key, user.private_data.data, user.private_data.nonce, user.private_data.checksum);
          this.private_data = JSON.parse(prvDataText);
      }
  },
  data() {
    return {
      encryption_key: "",  
      name: "Jordan Matthews",
      profile_pic_url: "",
      current: "24",
      private_data: {
          pics: ["valerie"], 
          description: "I'm super glad we both decided to connect. My phone number is 044-245-123-9812, give me a call sometime soon. :)"
      },
      options: [...Array(100).keys()].map(function(i) {
        return {
            text: (18+i).toString(),
            value:18+i,
        } 
        })
    };
  },
  computed: {
        
  },
  methods: {
    async getLoggedInUser() {
        var result = await blockchainService.getEos().getTableRows({
            json: true,
            code: "wings",
            scope: "wings",
            table: "users"
        });
        return result.rows.find(u => u.account == config.userAccountName);
    },

    async saveProfile() {
          var encryptObj = encryptionService.encryptData(JSON.stringify(this.private_data), this.encryption_key);

          const txResult = await blockchainService.getEos().transaction({ 
            actions: [{
              account: "wings",
              name: "setdata",
              authorization: [
              {
                actor: config.userAccountName,
                permission: "active"
              }],
              data: {
                account: config.userAccountName,
                encryption_key: this.encryption_key,
                name: this.name,
                age: parseInt(this.current), 
                profile_pic_url: this.profile_pic_url, 
                private_data: {
                    data: encryptObj.encryptedData.toString('binary'),
                    nonce: encryptObj.nonce,
                    checksum: encryptObj.checksum
                }
              }
            }]
        });
        this.$toasted.show("Profile Updated!");
        this.$router.push("/home");
    }
  }
};
</script>