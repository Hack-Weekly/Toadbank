import { Buffer } from "node:buffer"
import * as Crypto from "node:crypto"

class ServerCrypto implements IServerCrypto {
  constructor () {}

  deriveKey (key: string, salt: string): (string | null) {
    try {
      const derived = Crypto.scryptSync(key, salt, 32)
      return derived.toString("hex")
    } catch (e) {
      console.error("Something went wrong when creating derived key!", e)
      return null
    }
  }

  hash (data: string): (string | null) {
    try {
      const hash = Crypto.createHash("sha256")
      hash.update(data)
      return hash.digest("hex")
    } catch (e) {
      console.error("There was an error creating the one way hash!", e)
      return null
    }
  }

  encrypt (key: string, iv: string, data: string): (string | null) {
    try {
      const cipher = Crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"))
      // utf-8 => hex
      let encrypted = cipher.update(data, "utf8", "hex")
      encrypted += cipher.final("hex")
      return encrypted 
    } catch (e) {
      console.error("There was an error when encrypting the data!", e)
      return null
    }
  }

  decrypt (key: string, iv: string, cipher: string): (string | null) {
    try {
      const decipher = Crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"))
      // hex => utf-8
      let decrypted = decipher.update(cipher, "hex", "utf-8")
      decrypted += decipher.final("utf-8")
      return decrypted
    } catch (e) {
      console.error("There was an error decrypting the data!", e)
      return null
    }
  }
}

export default new ServerCrypto()
