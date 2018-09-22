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
  
      state.eos = Eos({
        keyProvider: config.privateKey,
        httpEndpoint: config.endpoint,
        ...eosOptions
      });
  
      return state.eos;
    }
};

export default BlockchainService;