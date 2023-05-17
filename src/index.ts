import * as CryptoJS from "crypto-js";

export const ArrayBufferToWordArray = (arrayBuffer: ArrayBuffer) => {
  const u8 = new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
  const len = u8.length;
  const words:any = [];
  for (let i = 0; i < len; i += 1) {
      words[i >>> 2] |= (u8[i] & 0xff) << (24 - (i % 4) * 8);
  }

  return CryptoJS.lib.WordArray.create(words, len);
}

export const WordArrayToArrayBuffer = (wordArray: CryptoJS.lib.WordArray) => {
  const { words } = wordArray;
  const { sigBytes } = wordArray;
  const u8 = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i += 1) {
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      u8[i] = byte;
  }
  return u8.buffer;
}

export const loga = ()=>{
  console.log('lof')
}

export const AESEncData = (data: string | CryptoJS.lib.WordArray, key: string, iv: CryptoJS.lib.WordArray):ArrayBuffer => { // 这里的data是WordBuffer类型的数据
  // const bKey = CryptoJS.enc.Hex.parse(key);
  // console.log('bKey',bKey)
  const bKey = CryptoJS.enc.Utf8.parse(key);

  // const bIv = CryptoJS.enc.Utf8.parse(iv);

  const encrypt = CryptoJS.AES.encrypt(data, bKey, { iv: undefined, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  const arrayBuffer = WordArrayToArrayBuffer(encrypt.ciphertext);
  return arrayBuffer;
}

export const AESDecData = (data: any, key: string, iv: any) => { // 这里的data是WordBuffer类型的数据
  const bKey = CryptoJS.enc.Utf8.parse(key);
  // const bKey = CryptoJS.enc.Utf8.parse(key);
  // const bIv = CryptoJS.enc.Utf8.parse(iv);
  const decrypt = CryptoJS.AES.decrypt(data, bKey, { iv: undefined, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  const arrayBuffer = WordArrayToArrayBuffer(decrypt);
  return arrayBuffer;
}
let arrBase16 = [0xEE,0x00,0x09,0x00,0xFE,0x25,0x46,0x7C,0xDC]


let arrayBuffer = new Int8Array(arrBase16).buffer;

const wordBuffer = ArrayBufferToWordArray(arrayBuffer);
let sendData = AESEncData(wordBuffer,'5hvbam6kfbyctw5h',ArrayBufferToWordArray(new ArrayBuffer(16)))
console.log('arrayBuffer加密',sendData) 
