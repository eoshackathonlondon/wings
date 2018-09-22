<template lang="html">
  <div class="wrap">
    <div>

      <div class="photo">
        <img class="profilePhoto" alt="profile photo" :src="currentProfilePic">
        <div class="text-overlay"><sui-icon size="med" name="star" /> 10500</div>
      </div>
          


      <div class="spacer" />
      <div class="emphasize">Ashley Louise &bull; 28</div>
    </div>

    <div class="spacer" />


    <div is="sui-button-group">
        <sui-button v-model="notInterested">Not Interested</sui-button>
        <sui-button-or text="or" />
        <sui-button v-model="connect" color='red' icon="heart" label-position="right">Connect</sui-button>
    </div>
    <div class="half-spacer">Report this user</div>
    <div class="half-spacer" />

    <i>The full profile data is available once both parties connect.</i>
  </div>
</template>

<script>
import blockchainService from "../services/blockchainService.js"
export default {
    async mounted() {
        var result = await blockchainService.getEos().getTableRows({
          json: true,
          code: "wings",
          scope: "wings",
          table: "users"
        });

        this.users = result.rows;

        console.log(this.users)
    },
    data: () => ({
      users: [],
      userIndex: 0
    }),
    computed: {
        currentProfilePic() {
          var user = this.users[this.userIndex];

          if(!user) return "";

          return '../assets/' + user.profile_pic_url;
        }
    },
    methods: {
        async notInterested() {
          this.userIndex = this.users.length >= this.userIndex ? 0 : this.userIndex++;
        },
        async connect() {
          // const txResult = await blockchainService.getEos().transaction({ 
          //   actions: {
          //     account: "wings",
          //     name: "connect",
          //     authorization: [
          //     {
          //       actor: config.userAccountName,
          //       permission: "active"
          //     }],
          //     data: {
                 
          //     }
          //   }
          // });
        }
    }
};
</script>