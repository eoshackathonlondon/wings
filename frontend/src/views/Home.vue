<template lang="html">
  <div class="wrap">
    <div>

      <div class="photo">
        <img class="profilePhoto" alt="profile photo" :src="currentProfilePic">
        <div class="text-overlay"><sui-rating icon="star" :rating="1" :max-rating="1" /> 10500</div>
      </div>
          


      <div class="spacer" />
      <div class="emphasize">{{currentProfileName}} &bull; {{currentProfileAge}}</div>
    </div>

    <div class="spacer" />


    <div is="sui-button-group">
        <sui-button @click="notInterested">Not Interested</sui-button>
        <sui-button-or text="or" />
        <sui-button @click="connect" color='red' icon="heart" label-position="right">Connect</sui-button>
    </div>
    <div class="half-spacer">Report this user</div>
    <div class="half-spacer" />

    <i>The full profile data is available once both parties connect.</i>
  </div>
</template>

<script>
import encryptionService from "../services/encryptionService.js"
import blockchainService from "../services/blockchainService.js"
import config from "../config.js"

import erica from "../assets/erica.png";
import susan from "../assets/susan.png";
import valerie from "../assets/valerie.png";

var images = {erica, susan, valerie};

export default {
    async mounted() {
        var result = await blockchainService.getEos().getTableRows({
          json: true,
          code: "wings",
          scope: "wings",
          table: "users"
        });

        this.users = result.rows;
    },
    data: () => ({
      users: [],
      userIndex: 1
    }),
    computed: {
        currentProfilePic() {
          var user = this.users[this.userIndex];

          if(!user) return "";

          return user.profile_pic_url;
        },
        currentProfileName() {
          var user = this.users[this.userIndex];

          if(!user) return "";

          return user.name;
        },
        currentProfileAge() {
          var user = this.users[this.userIndex];

          if(!user) return "";

          return user.age;
        }
    },
    methods: {
        async notInterested() {
          this.userIndex = this.users.length >= this.userIndex ? 0 : this.userIndex++;
        },
        async connect() {
          var connectUser = this.users[this.userIndex];
          var user = this.users.find(u => u.account == config.userAccountName);

          var privData = user.private_data.data;

          var encryptObj = encryptionService.encryptData(privData, connectUser.encryption_key);

          const txResult = await blockchainService.getEos().transaction({ 
            actions: [{
              account: "wings",
              name: "share",
              authorization: [
              {
                actor: config.userAccountName,
                permission: "active"
              }],
              data: {
                 from: config.userAccountName, 
                 to: connectUser.account, 
                 shared_data: {
                   data: encryptObj.encryptedData.toString('binary'),
                   nonce: encryptObj.nonce.toString(),
                   checksum: encryptObj.checksum
                 }
              }
            }]
          });

          this.$router.push("/connections");
        }
    }
};
</script>