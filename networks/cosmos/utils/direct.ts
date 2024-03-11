import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
} from "../codegen/cosmos/tx/v1beta1/tx";
import { EncodedMessage, Encoder, Message } from "../types/direct";
import { Key, assertEmpty } from "@cosmonauts/utils";
import { PubKey as Secp256k1PubKey } from "../codegen/cosmos/crypto/secp256k1/keys";
import { SignMode } from "../codegen/cosmos/tx/signing/v1beta1/signing";
import { TelescopeGeneratedType } from "../codegen/types";
import { StdFee } from "../types/amino";
import { toFee } from "./amino";

export function constructTxBody(
  messages: Message[],
  getEncoder: (typeUrl: string) => { encode: (data: any) => Uint8Array },
  memo?: string
) {
  const encoded = messages.map(({ typeUrl, value }) => {
    return {
      typeUrl,
      value: getEncoder(typeUrl).encode(value),
    };
  });
  const txBody = TxBody.fromPartial({
    messages: encoded,
    memo,
  });
  return {
    txBody,
    encode: () => TxBody.encode(txBody).finish(),
  };
}

export function constructSignerInfo(
  keyType: string,
  publicKey: Key,
  sequence: bigint,
  signMode: SignMode
) {
  let encodedKey: EncodedMessage;
  switch (keyType) {
    case "secp256k1":
      encodedKey = {
        typeUrl: Secp256k1PubKey.typeUrl,
        value: Secp256k1PubKey.encode(
          Secp256k1PubKey.fromPartial({ key: publicKey.value })
        ).finish(),
      };
      break;
    case "ed25519":
      throw new Error(
        "Ed25519 signer info construction is not implemented yet"
      );
    default:
      throw new Error(`Unsupported public key type: ${keyType}`);
  }

  const signerInfo = SignerInfo.fromPartial({
    publicKey: encodedKey,
    sequence,
    modeInfo: { single: { mode: signMode } },
  });

  return {
    signerInfo,
    encode: () => SignerInfo.encode(signerInfo).finish(),
  };
}

export function constructAuthInfo(signerInfos: SignerInfo[], fee: Fee) {
  const authInfo = AuthInfo.fromPartial({ signerInfos, fee });
  return {
    authInfo,
    encode: () => AuthInfo.encode(authInfo).finish(),
  };
}

export function toEncoder(
  generated: TelescopeGeneratedType<any, any, any>
): Encoder {
  return {
    typeUrl: generated.typeUrl,
    encode: (data: any) => {
      assertEmpty(generated.encode);
      return generated.encode(generated.fromPartial(data)).finish();
    },
  };
}
