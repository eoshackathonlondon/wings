import blockchainService from "./blockchainService.js"
import config from "../config.js"

export default {
    async getAccountAuthorityKey(accountName, authority) {

        var account = await blockchainService.getEos().getAccount(accountName);
        var key = null;
        for (var i = 0; i < account.permissions.length; i++) {
            if (account.permissions[i].perm_name == authority) {
                key = account.permissions[i].required_auth.keys[0].key;
                break;
            }
        }
        return key;
    },
    
    async encryptData(data, receiver)
    {    
      var receiverPubKey = await getAccountAuthorityKey(receiver, "active");
      var encryptedData = Eos.modules.ecc.Aes.encrypt(config.privateKey, receiverPubKey, data);
      return { nonce: encryptedData.nonce.toString(), checksum: encryptedData.checksum, encryptedData: encryptedData.message.toString('binary') };
    },
    
    async decryptData(sender, data, nonce, checksum)
    {
        var senderPubKey = await getAccountAuthorityKey(sender, "active");
        return Eos.modules.ecc.Aes.decrypt(config.privateKey, senderPubKey, nonce, data, checksum);
    }
  }