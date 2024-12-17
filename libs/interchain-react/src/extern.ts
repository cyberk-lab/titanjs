/**
* This file and any referenced files were automatically generated by @cosmology/telescope@1.11.0
* DO NOT MODIFY BY HAND. Instead, download the latest proto files for your chain
* and run the transpile command or npm scripts command that is used to regenerate this bundle.
*/


import { HttpEndpoint } from "@interchainjs/types";
import {
  createQueryRpc,
} from '@interchainjs/cosmos/utils';
import { Rpc } from "./helpers";

const _rpcClients: Record<string, Rpc> = {};

export const getRpcEndpointKey = (rpcEndpoint: string | HttpEndpoint) => {
    if (typeof rpcEndpoint === 'string') {
        return rpcEndpoint;
    } else if (!!rpcEndpoint) {
        //@ts-ignore
        return rpcEndpoint.url;
    }
}

export const getRpcClient = async (rpcEndpoint: string | HttpEndpoint) => {
    const key = getRpcEndpointKey(rpcEndpoint);
    if (!key) return;
    if (_rpcClients.hasOwnProperty(key)) {
        return _rpcClients[key];
    }
    const rpc = await createRpcClient(rpcEndpoint);
    _rpcClients[key] = rpc;
    return rpc;
}

export const createRpcClient = async (rpcEndpoint: string | HttpEndpoint) => {
  return createQueryRpc(rpcEndpoint)
}
