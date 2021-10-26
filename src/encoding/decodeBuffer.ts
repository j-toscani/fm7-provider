import { EncodingsV2, V2 } from "../types";

import all from "./all";

export default function decodeBuffer(message: Buffer, decoder: Decoder) {
  let byteToRead = 0;
  const values = [];

  for (let index = 0; index < all.length; index++) {
    const option = all[index];
    if (byteToRead >= message.byteLength) {
      break;
    }

    const value = decoder(option, byteToRead);
    byteToRead = getNextByteToRead(byteToRead, option.encoding);
    values.push(value);
  }

  return values;
}

function getNextByteToRead(prev: number, encoding: EncodingsV2) {
  return prev + parseInt(encoding.slice(1)) / 8;
}

export function createDecoder(message: Buffer) {
  return (option: V2[number], byteToRead: number) => {
    switch (option.encoding) {
      case "f32":
        return message.readFloatLE(byteToRead);
      case "u32":
        return message.readUInt32LE(byteToRead);
      case "u16":
        return message.readUInt16LE(byteToRead);
      case "s8":
        return message.readInt8(byteToRead);
      case "u8":
        return message.readUInt8(byteToRead);
      case "s32":
        return message.readInt32LE(byteToRead);
      default:
        throw Error("Unknown decoding");
    }
  };
}

export type Decoder = ReturnType<typeof createDecoder>;
