/**
* This file and any referenced files were automatically generated by @cosmology/telescope@1.10.3
* DO NOT MODIFY BY HAND. Instead, download the latest proto files for your chain
* and run the transpile command or npm scripts command that is used to regenerate this bundle.
*/

import { getRpcClient } from './extern'
import {
  Rpc,
} from './helpers'
import {
  ITxArgs,
  ISigningClient,
  StdFee,
  DeliverTxResponse
} from './helper-func-types'
import {
    useQuery,
    useQueryClient,
    UseQueryOptions,
    MutationOptions,
    useMutation,
    UseMutationOptions,
    QueryKey,
} from '@tanstack/react-query';

import { HttpEndpoint } from "@interchainjs/types";
import { Rpc as ProtobufRpcClient } from "./helpers";

export const DEFAULT_RPC_CLIENT_QUERY_KEY = 'rpcClient';
export const DEFAULT_RPC_ENDPOINT_QUERY_KEY = 'rpcEndPoint';
export const DEFAULT_SIGNING_CLIENT_QUERY_KEY = 'signingClient';

export interface ReactQueryParams<TResponse, TData = TResponse> {
    options?: UseQueryOptions<TResponse, Error, TData>;
    rpcEndpoint?: string | HttpEndpoint;
    rpcClientQueryKey?: string;
}

export interface UseRpcClientQuery<TData> extends ReactQueryParams<ProtobufRpcClient, TData> {
}

export interface UseRpcEndpointQuery<TData> extends ReactQueryParams<string | HttpEndpoint, TData> {
    getter: () => Promise<string | HttpEndpoint>;
    rpcEndPointKey?: string;
}

export const useRpcEndpoint = <TData = string | HttpEndpoint>({
    getter,
    options,
    rpcEndPointKey,
}: UseRpcEndpointQuery<TData>) => {
    const key = rpcEndPointKey || DEFAULT_RPC_ENDPOINT_QUERY_KEY;
    return useQuery<string | HttpEndpoint, Error, TData>([key, getter], async () => {
        return await getter();
    }, options);
};

export const useRpcClient = <TData = ProtobufRpcClient>({
    rpcEndpoint,
    options,
    rpcClientQueryKey,
}: UseRpcClientQuery<TData>) => {
    const queryClient = useQueryClient({
      context: options.context
    });
    const key = rpcClientQueryKey || DEFAULT_RPC_CLIENT_QUERY_KEY;
    return useQuery<ProtobufRpcClient, Error, TData>([key, rpcEndpoint], async () => {
      if(!rpcEndpoint) {
        throw new Error('rpcEndpoint is required');
      }

      const client = await getRpcClient(rpcEndpoint);
      if(!client) {
          throw new Error('Failed to connect to rpc client');
      }

      queryClient.setQueryData([key], client);

      return client;
    }, options);
};

export interface UseQueryBuilderOptions<TReq, TRes> {
  builderQueryFn: (getRpcInstance: () => Rpc | undefined) => (request: TReq) => Promise<TRes>,
  queryKeyPrefix: string,
}


export function buildUseQuery<TReq, TRes>(opts: UseQueryBuilderOptions<TReq, TRes>) {
  return <TData = TRes>({
    request,
    options,
    rpcEndpoint,
    rpcClientQueryKey,
    customizedQueryKey,
  }: UseQueryParams<TReq, TRes, TData>) => {
    const queryClient = useQueryClient({
      context: options.context
    });
    const key = rpcClientQueryKey || DEFAULT_RPC_CLIENT_QUERY_KEY;
    const queryKey = rpcEndpoint ? [key, rpcEndpoint] : [key];
    const rpc = queryClient.getQueryData<Rpc>(queryKey);
    const queryFn = opts.builderQueryFn(()=>{
      return rpc;
    });
    return useQuery<TRes, Error, TData>(customizedQueryKey || [opts.queryKeyPrefix, request], () => queryFn(request), options);
  };
}

export interface UseQueryParams<TReq, TRes, TData = TRes> extends ReactQueryParams<TRes, TData> {
  request: TReq;
  customizedQueryKey?: QueryKey
}

export interface ReactMutationParams<TData, TError, TVariables, TContext = unknown> {
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  rpcEndpoint?: string | HttpEndpoint;
  signingClientQueryKey?: string;
}


export interface UseMutationBuilderOptions<TMsg> {
  builderMutationFn: (getSigningClientInstance: () => ISigningClient | undefined) => (
    signerAddress: string,
    message: TMsg,
    fee: StdFee | 'auto',
    memo: string
  ) => Promise<DeliverTxResponse>,
}


export function buildUseMutation<TMsg, TError>(opts: UseMutationBuilderOptions<TMsg>) {
  return ({
    options,
    rpcEndpoint,
    signingClientQueryKey
  }: ReactMutationParams<DeliverTxResponse, TError, ITxArgs<TMsg>>) => {
    const queryClient = useQueryClient({
      context: options.context
    });
    const key = signingClientQueryKey || DEFAULT_SIGNING_CLIENT_QUERY_KEY;
    const queryKey = rpcEndpoint ? [key, rpcEndpoint] : [DEFAULT_SIGNING_CLIENT_QUERY_KEY];
    const signingClient = queryClient.getQueryData<ISigningClient>(queryKey);

    const mutationFn = opts.builderMutationFn(() => {
      return signingClient;
    });

    return useMutation<DeliverTxResponse, Error, ITxArgs<TMsg>>(
      (reqData: ITxArgs<TMsg>) => mutationFn(reqData.signerAddress, reqData.message, reqData.fee, reqData.memo),
      options as Omit<UseMutationOptions<DeliverTxResponse, Error, ITxArgs<TMsg>, unknown>, "mutationFn">
    );
  };
}
