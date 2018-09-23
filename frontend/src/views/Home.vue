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
    <div class="half-spacer"><a style="cursor:pointer" @click="toggle">report this user</a></div>
    <div class="half-spacer" />

    <i>The full profile data is available once both parties connect.</i>

    <sui-modal v-model="open" size="mini">
      <sui-modal-content>
        <h2>Report User</h2>
        You can affect this users reputation if you suspect they're misbehaving.
        <div class="half-spacer" />
          <sui-dropdown class="fullwidth"
            placeholder="Select a reason"
            selection
            :options="options"
            v-model="current"
          />
          <div class="half-spacer" />
          <sui-button @click.native="report" class="fullwidth">
              Send Report
          </sui-button>
      </sui-modal-content>
    </sui-modal>
    
  </div>
</template>

<script>
import encryptionService from "../services/encryptionService.js"
import blockchainService from "../services/blockchainService.js"
import config from "../config.js"


export default {
    async mounted() {
        var result = await blockchainService.getEos().getTableRows({
          json: true,
          code: "wings",
          scope: "wings",
          table: "users"
        });

        this.users = result.rows;

        console.log(this.users);
    },
    data: () => ({
      users: [],
      userIndex: 1,
      open: false,
      current: 1,
      options: [{text: "The profile photo is innapropriate. (-50 reputation points)", value: 0},
      {text: "I suspect this profile is not authentic. (-100 reputation points)", value: 1}]
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
        report() {
          this.$toasted.show("Profile Reported");
          this.open = !this.open
        },
        toggle() {
          this.open = !this.open
        },        
        async notInterested() {
          this.userIndex = this.userIndex >= this.users.length ? 1 : this.userIndex+1;
          console.log(this.users.length)
          console.log(this.userIndex)
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
                   nonce: encryptObj.nonce,
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