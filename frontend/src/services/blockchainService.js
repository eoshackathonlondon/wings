import Eos from "eosjs";
import config from "../config.js";

const BlockchainService = {
    getEos() {
      const eosOptions = {
        expireInSeconds: 60,
        chainId: config.chainId,
        broadcast: true,
        debug: false,
        sign: true
      };
  
      eosOptions.authorization = [
        config.userAccountName + "@active"
      ];

      return Eos({
        keyProvider: config.privateKey,
        httpEndpoint: config.endpoint,
        ...eosOptions
      });
    },

    async getAccountAuthorityKey(accountName, authority) {

        var account = await this.getEos().getAccount(accountName);
        var key = null;
        for (var i = 0; i < account.permissions.length; i++) {
            if (account.permissions[i].perm_name == authority) {
                key = account.permissions[i].required_auth.keys[0].key;
                break;
            }
        }
        return key;
    }
};

export default BlockchainService;