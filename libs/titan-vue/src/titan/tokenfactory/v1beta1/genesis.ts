import { Params, ParamsAmino } from "./params";
import { DenomAuthorityMetadata, DenomAuthorityMetadataAmino } from "./authority_metadata";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/** GenesisState defines the tokenfactory module's genesis state. */
export interface GenesisState {
  /** params defines the parameters of the module. */
  params: Params;
  factoryDenoms: GenesisDenom[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/titan.tokenfactory.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the tokenfactory module's genesis state. */
export interface GenesisStateAmino {
  /** params defines the parameters of the module. */
  params: ParamsAmino;
  factory_denoms: GenesisDenomAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/titan.tokenfactory.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/**
 * GenesisDenom defines a tokenfactory denom that is defined within genesis
 * state. The structure contains DenomAuthorityMetadata which defines the
 * denom's admin.
 */
export interface GenesisDenom {
  denom: string;
  authorityMetadata: DenomAuthorityMetadata;
}
export interface GenesisDenomProtoMsg {
  typeUrl: "/titan.tokenfactory.v1beta1.GenesisDenom";
  value: Uint8Array;
}
/**
 * GenesisDenom defines a tokenfactory denom that is defined within genesis
 * state. The structure contains DenomAuthorityMetadata which defines the
 * denom's admin.
 */
export interface GenesisDenomAmino {
  denom: string;
  authority_metadata: DenomAuthorityMetadataAmino;
}
export interface GenesisDenomAminoMsg {
  type: "/titan.tokenfactory.v1beta1.GenesisDenom";
  value: GenesisDenomAmino;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    factoryDenoms: []
  };
}
export const GenesisState = {
  typeUrl: "/titan.tokenfactory.v1beta1.GenesisState",
  is(o: any): o is GenesisState {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.is(o.params) && Array.isArray(o.factoryDenoms) && (!o.factoryDenoms.length || GenesisDenom.is(o.factoryDenoms[0])));
  },
  isAmino(o: any): o is GenesisStateAmino {
    return o && (o.$typeUrl === GenesisState.typeUrl || Params.isAmino(o.params) && Array.isArray(o.factory_denoms) && (!o.factory_denoms.length || GenesisDenom.isAmino(o.factory_denoms[0])));
  },
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.factoryDenoms) {
      GenesisDenom.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.factoryDenoms.push(GenesisDenom.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.factoryDenoms = object.factoryDenoms?.map(e => GenesisDenom.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.factoryDenoms = object.factory_denoms?.map(e => GenesisDenom.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.factoryDenoms) {
      obj.factory_denoms = message.factoryDenoms.map(e => e ? GenesisDenom.toAmino(e) : undefined);
    } else {
      obj.factory_denoms = message.factoryDenoms;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/titan.tokenfactory.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  },
  registerTypeUrl() {
    Params.registerTypeUrl();
    GenesisDenom.registerTypeUrl();
  }
};
function createBaseGenesisDenom(): GenesisDenom {
  return {
    denom: "",
    authorityMetadata: DenomAuthorityMetadata.fromPartial({})
  };
}
export const GenesisDenom = {
  typeUrl: "/titan.tokenfactory.v1beta1.GenesisDenom",
  is(o: any): o is GenesisDenom {
    return o && (o.$typeUrl === GenesisDenom.typeUrl || typeof o.denom === "string" && DenomAuthorityMetadata.is(o.authorityMetadata));
  },
  isAmino(o: any): o is GenesisDenomAmino {
    return o && (o.$typeUrl === GenesisDenom.typeUrl || typeof o.denom === "string" && DenomAuthorityMetadata.isAmino(o.authority_metadata));
  },
  encode(message: GenesisDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.authorityMetadata !== undefined) {
      DenomAuthorityMetadata.encode(message.authorityMetadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.authorityMetadata = DenomAuthorityMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GenesisDenom>): GenesisDenom {
    const message = createBaseGenesisDenom();
    message.denom = object.denom ?? "";
    message.authorityMetadata = object.authorityMetadata !== undefined && object.authorityMetadata !== null ? DenomAuthorityMetadata.fromPartial(object.authorityMetadata) : undefined;
    return message;
  },
  fromAmino(object: GenesisDenomAmino): GenesisDenom {
    const message = createBaseGenesisDenom();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.authority_metadata !== undefined && object.authority_metadata !== null) {
      message.authorityMetadata = DenomAuthorityMetadata.fromAmino(object.authority_metadata);
    }
    return message;
  },
  toAmino(message: GenesisDenom): GenesisDenomAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.authority_metadata = message.authorityMetadata ? DenomAuthorityMetadata.toAmino(message.authorityMetadata) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisDenomAminoMsg): GenesisDenom {
    return GenesisDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisDenomProtoMsg): GenesisDenom {
    return GenesisDenom.decode(message.value);
  },
  toProto(message: GenesisDenom): Uint8Array {
    return GenesisDenom.encode(message).finish();
  },
  toProtoMsg(message: GenesisDenom): GenesisDenomProtoMsg {
    return {
      typeUrl: "/titan.tokenfactory.v1beta1.GenesisDenom",
      value: GenesisDenom.encode(message).finish()
    };
  },
  registerTypeUrl() {
    DenomAuthorityMetadata.registerTypeUrl();
  }
};