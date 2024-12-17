/**
* This file and any referenced files were automatically generated by @cosmology/telescope@1.11.0
* DO NOT MODIFY BY HAND. Instead, download the latest proto files for your chain
* and run the transpile command or npm scripts command that is used to regenerate this bundle.
*/

import { getRpcClient } from './extern'
import {
    useQuery,
    UseQueryOptions,
} from '@tanstack/vue-query';
import { Ref, isRef } from 'vue'

import { HttpEndpoint, ProtobufRpcClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

export interface VueQueryParams<TResponse, TData = TResponse> {
    options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey'>;
}

export interface UseRpcClientQuery<TData> extends VueQueryParams<ProtobufRpcClient, TData> {
    rpcEndpoint: Ref<string | HttpEndpoint>;
}

export interface UseRpcEndpointQuery<TData> extends VueQueryParams<string | HttpEndpoint, TData> {
    getter: () => Promise<string | HttpEndpoint>;
}

export const useRpcEndpoint = <TData = string | HttpEndpoint>({
    getter,
    options,
}: UseRpcEndpointQuery<TData>) => {
    return useQuery<string | HttpEndpoint, Error, TData>({
        queryKey: ['rpcEndpoint', getter],
        queryFn: async () => {
            return await getter();
        },
        ...options
    })
};

export const useRpcClient = <TData = ProtobufRpcClient>({
    rpcEndpoint,
    options,
}: UseRpcClientQuery<TData>) => {
    let params = {
		queryKey: ['rpcClient', rpcEndpoint],
			queryFn: async () => {
			return await getRpcClient(rpcEndpoint.value);
		},
	};
	if (options && !isRef(options)) {
		params = {
			...options,
			...params,
		};
	}
	return useQuery<ProtobufRpcClient | undefined, Error, TData>(params);
};

interface UseTendermintClient extends VueQueryParams<Tendermint34Client> {
    rpcEndpoint: Ref<string | HttpEndpoint>;
}

/**
 * Hook that uses vue-query to cache a connected tendermint client.
 */
export const useTendermintClient = ({
    rpcEndpoint,
    options,
}: UseTendermintClient) => {
    const { data: client } = useQuery<Tendermint34Client, Error, Tendermint34Client>({
        queryKey: ['client', 'tendermint', rpcEndpoint],
        queryFn: () => Tendermint34Client.connect(rpcEndpoint.value),
		// allow overriding
		throwOnError: (e) => {
			throw new Error(`Failed to connect to ${rpcEndpoint}` + '\n' + e)
		},
		...options,
    })
    return { client }
};
