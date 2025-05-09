import { GenesisState as GenesisState1 } from "../../client/v1/genesis";
import { GenesisState as GenesisState2 } from "../../connection/v1/genesis";
import { GenesisState as GenesisState3 } from "../../channel/v1/genesis";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { DeepPartial } from "../../../../helpers";
/** GenesisState defines the ibc module's genesis state. */
export interface GenesisState {
  /** ICS002 - Clients genesis state */
  clientGenesis: GenesisState1;
  /** ICS003 - Connections genesis state */
  connectionGenesis: GenesisState2;
  /** ICS004 - Channel genesis state */
  channelGenesis: GenesisState3;
}
function createBaseGenesisState(): GenesisState {
  return {
    clientGenesis: GenesisState1.fromPartial({}),
    connectionGenesis: GenesisState2.fromPartial({}),
    channelGenesis: GenesisState3.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/ibc.core.types.v1.GenesisState",
  aminoType: "cosmos-sdk/GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientGenesis !== undefined) {
      GenesisState1.encode(message.clientGenesis, writer.uint32(10).fork()).ldelim();
    }
    if (message.connectionGenesis !== undefined) {
      GenesisState2.encode(message.connectionGenesis, writer.uint32(18).fork()).ldelim();
    }
    if (message.channelGenesis !== undefined) {
      GenesisState3.encode(message.channelGenesis, writer.uint32(26).fork()).ldelim();
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
          message.clientGenesis = GenesisState1.decode(reader, reader.uint32());
          break;
        case 2:
          message.connectionGenesis = GenesisState2.decode(reader, reader.uint32());
          break;
        case 3:
          message.channelGenesis = GenesisState3.decode(reader, reader.uint32());
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
    message.clientGenesis = object.clientGenesis !== undefined && object.clientGenesis !== null ? GenesisState1.fromPartial(object.clientGenesis) : undefined;
    message.connectionGenesis = object.connectionGenesis !== undefined && object.connectionGenesis !== null ? GenesisState2.fromPartial(object.connectionGenesis) : undefined;
    message.channelGenesis = object.channelGenesis !== undefined && object.channelGenesis !== null ? GenesisState3.fromPartial(object.channelGenesis) : undefined;
    return message;
  }
};