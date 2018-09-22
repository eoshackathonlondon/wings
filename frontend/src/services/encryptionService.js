import Eos from "eosjs";
import blockchainService from "./blockchainService.js"
import config from "../config.js"

export default {
    encryptData(data, receiverPubKey)
    {    
      var encryptedData = Eos.modules.ecc.Aes.encrypt(config.privateKey, receiverPubKey, data);
      return { 
          nonce: encryptedData.nonce, 
          checksum: encryptedData.checksum, 
          encryptedData: encryptedData.message
        };
    },
    
    decryptData(senderPubKey, data, nonce, checksum)
    {
        return Eos.modules.ecc.Aes.decrypt(config.privateKey, senderPubKey, nonce, data, checksum);
    }
  }