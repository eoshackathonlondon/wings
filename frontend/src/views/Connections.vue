<template lang="html">
    <div class="wrap alignLeft">
        <!-- <sui-table celled padded>
          <sui-table-body>
            <sui-table-row >
                <sui-table-cell>
                  <img class="profilePhotoConnected" alt="profile photo" :src="user.profile_pic_url">
                </sui-table-cell>
                <sui-table-cell single-line><h3>
                  {{user.name}} &bull; {{user.age}} &nbsp; &nbsp; &nbsp; 
                </h3></sui-table-cell>
                <sui-table-cell>
                  {{user.description}}
                </sui-table-cell>  
            </sui-table-row>
          </sui-table-body>
        </sui-table> -->

        <sui-card v-for="user in connectedUsers" :key="user.account">
          <sui-image :src="user.profile_pic_url" />
          <sui-card-content>
            <sui-card-header>{{user.name}} &bull; {{user.age}}</sui-card-header>
            <sui-card-description>{{user.description}}</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            Reputation: <sui-rating icon="star" :rating="1" :max-rating="1" /> 10500
          </sui-card-content>
        </sui-card>
    </div>
</template>
      
<script>
import encryptionService from "../services/encryptionService.js";
import blockchainService from "../services/blockchainService.js";
import config from "../config.js";

export default {
  data() {
    return {
      connectedUsers: []
    };
  },
  async mounted() {
    var connections = (await blockchainService.getEos().getTableRows({
      json: true,
      code: "wings",
      scope: "wings",
      table: "messages"
    })).rows.filter(c => c.to === config.userAccountName);

    var users = (await blockchainService.getEos().getTableRows({
      json: true,
      code: "wings",
      scope: "wings",
      table: "users"
    })).rows;

    this.connectedUsers = connections.map(c => ({
      ...users.find(u => u.account === c.from),
      private_data: c.data
    }));

    for (const cu of this.connectedUsers) {
      if (cu.private_data && cu.private_data.data) {
        var prvDataText = encryptionService.decryptData(
          cu.encryption_key,
          cu.private_data.data,
          cu.private_data.nonce,
          cu.private_data.checksum
        );
        var pvtData = JSON.parse(prvDataText);
        cu.description = pvtData.description;
        cu.pics = pvtData.pics;
      }
    }
  }
};
</script>
