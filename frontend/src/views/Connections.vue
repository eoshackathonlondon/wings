<template lang="html">
    <div class="wrap alignLeft">
        <sui-table celled padded>
          <sui-table-body>
            <sui-table-row v-for="user in connectedUsers" :key="user.account">
                <sui-table-cell>
                  <img class="profilePhotoConnected" alt="profile photo" src="user.profile_pic_url">
                </sui-table-cell>
                <sui-table-cell single-line><h3>
                  {{user.name}} &bull; {{user.age}} &nbsp; &nbsp; &nbsp; <sui-rating icon="star" :rating="1" :max-rating="1" /> 10500
                </h3></sui-table-cell>
                <sui-table-cell>
                  Creatine supplementation is the reference compound for increasing
                  muscular creatine levels; there is variability in this increase,
                  however, with some nonresponders.
                </sui-table-cell>  
            </sui-table-row>
          </sui-table-body>
        </sui-table>
    </div>
</template>
      
<script>
import blockchainService from "../services/blockchainService.js";

export default {
  name: "TableRatingExample",
  data() {
    return {
      connections: [],
      users: []
    };
  },
  async mounted() {
    this.connections = (await blockchainService.getEos().getTableRows({
      json: true,
      code: "wings",
      scope: "wings",
      table: "messages"
    })).rows;
    this.users = (await blockchainService.getEos().getTableRows({
      json: true,
      code: "wings",
      scope: "wings",
      table: "users"
    })).rows;
  },
  computed: {
    connectedUsers() {
      return this.connections.map(c =>
        this.users.find(u => u.account === c.to)
      );
    }
  }
};
</script>
