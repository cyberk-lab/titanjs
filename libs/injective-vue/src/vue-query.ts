/**
* This file and any referenced files were automatically generated by @cosmology/telescope@1.11.19
* DO NOT MODIFY BY HAND. Instead, download the latest proto files for your chain
* and run the transpile command or npm scripts command that is used to regenerate this bundle.
*/




import { getRpcClient } from './extern'
import {
  isRpc,
  Rpc,
} from './helpers'
import {
  ITxArgs,
  ISigningClient,
  StdFee,
  DeliverTxResponse,
  SigningClientResolver,
  RpcResolver,
  isISigningClient
} from './helper-func-types'
import {
    useQuery,
    useQueryClient,
    UseQueryOptions,
    useMutation,
    UseMutationOptions,
    QueryKey,
} from '@tanstack/vue-query';

import { HttpEndpoint, ProtobufRpcClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import {Ref} from 'vue'

export const DEFAULT_RPC_CLIENT_QUERY_KEY = 'rpcClient';
export const DEFAULT_RPC_ENDPOINT_QUERY_KEY = 'rpcEndPoint';
export const DEFAULT_SIGNING_CLIENT_QUERY_KEY = 'signingClient';

export interface CacheResolver {
    rpcEndpoint?: string | HttpEndpoint;
    clientQueryKey?: string;
}

export function isCacheResolver(resolver: unknown): resolver is CacheResolver {
  return (
    resolver !== null &&
    resolver !== undefined &&
    (resolver as CacheResolver).rpcEndpoint !== undefined &&
    (resolver as CacheResolver).clientQueryKey !== undefined
  );
}

export interface VueQueryParams<TResponse, TData = TResponse> {
  options?: UseQueryOptions<TResponse, Error, TData>;
}

export interface UseRpcClientQuery<TData> extends VueQueryParams<ProtobufRpcClient, TData> {
  clientResolver?: CacheResolver;
}

export interface UseRpcEndpointQuery<TData> extends VueQueryParams<string | HttpEndpoint, TData> {
    getter: () => Promise<string | HttpEndpoint>;
    rpcEndPointKey?: string;
    extraKey?: string
}

export function useRpcEndpoint<TData = string | HttpEndpoint>({
  getter,
  options,
  rpcEndPointKey,
  extraKey,
}: UseRpcEndpointQuery<TData>) {
  const key = rpcEndPointKey || DEFAULT_RPC_ENDPOINT_QUERY_KEY;
  return useQuery<string | HttpEndpoint, Error, TData>(
    {
      queryKey: [key, extraKey],
      queryFn: async () => {
        return await getter();
      }, ...options
    }
  );
};

export function useRpcClient<TData = ProtobufRpcClient>({
  options,
  clientResolver,
}: UseRpcClientQuery<TData>) {
  const queryClient = useQueryClient();

  const key = clientResolver?.clientQueryKey || DEFAULT_RPC_CLIENT_QUERY_KEY;
  return useQuery<ProtobufRpcClient, Error, TData>({
    queryKey: [key, clientResolver?.rpcEndpoint],
    queryFn: async () => {
      if (!clientResolver?.rpcEndpoint) {
        throw new Error('rpcEndpoint is required');
      }

      const client = await getRpcClient(clientResolver.rpcEndpoint);
      if (!client) {
        throw new Error('Failed to connect to rpc client');
      }

      queryClient.setQueryData([key], client);

      return client;
    },
    ...options
  }
  );
}

interface UseTendermintClient extends VueQueryParams<Tendermint34Client> {
    rpcEndpoint: string | HttpEndpoint;
}

/**
 * Function that uses vue-query to cache a connected tendermint client.
 */
export const useTendermintClient = ({
    rpcEndpoint,
    options,
}: UseTendermintClient) => {
    const { data: client } = useQuery<Tendermint34Client, Error, Tendermint34Client>({
        queryKey: ['client', 'tendermint', rpcEndpoint],
        queryFn: () => Tendermint34Client.connect(rpcEndpoint),
        ...{
            // allow overriding
            onError: (e: any) => {
                throw new Error(`Failed to connect to ${rpcEndpoint}` + '\n' + e)
            },
            ...options,
        }
      }
    );
    return { client };
};

export interface UseQueryBuilderOptions<TReq, TRes> {
  builderQueryFn: (
    clientResolver?: RpcResolver
  ) => (request: TReq) => Promise<TRes>;
  queryKeyPrefix: string;
}

export function buildUseVueQuery<TReq, TRes>(
  opts: UseQueryBuilderOptions<TReq, TRes>
) {
  return function useBuiltQuery<TData = TRes>({
    request,
    options,
    clientResolver,
    customizedQueryKey,
  }: UseQueryParams<TReq, TRes, TData>) {
    const queryClient = useQueryClient();
    let rpcResolver: RpcResolver | undefined;
    if (isRpc(clientResolver)) {
      rpcResolver = clientResolver;

    } else if (isCacheResolver(clientResolver)) {
      const key = clientResolver.clientQueryKey || DEFAULT_RPC_CLIENT_QUERY_KEY;
      const queryKey = clientResolver.rpcEndpoint
        ? [key, clientResolver.rpcEndpoint]
        : [key];
      rpcResolver = queryClient.getQueryData<Rpc>(queryKey);

      if (!rpcResolver && clientResolver.rpcEndpoint) {
        rpcResolver = clientResolver.rpcEndpoint;
      }
    } else {
      rpcResolver = clientResolver;

    }

    const queryFn = opts.builderQueryFn(rpcResolver);
    return useQuery<TRes, Error, TData>({
      queryKey: customizedQueryKey || [opts.queryKeyPrefix, request],
      queryFn: () => queryFn(request.value),
      ...options
    }
    );
  };
}

export interface UseQueryParams<TReq, TRes, TData = TRes>
  extends VueQueryParams<TRes, TData> {
  request: Ref<TReq>;
  clientResolver?: CacheResolver | RpcResolver;
  customizedQueryKey?: QueryKey;
}

export interface VueMutationParams<
  TData,
  TError,
  TVariables,
  TContext = unknown
> {
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  clientResolver?: CacheResolver | SigningClientResolver;
}

export interface UseMutationBuilderOptions<TMsg> {
  builderMutationFn: (
    clientResolver?: SigningClientResolver
  ) => (
    signerAddress: string,
    message: TMsg | TMsg[],
    fee: StdFee | 'auto',
    memo: string
  ) => Promise<DeliverTxResponse>;
}

export function buildUseVueMutation<TMsg, TError>(
  opts: UseMutationBuilderOptions<TMsg>
) {
  return function useBuiltMutation({
    options,
    clientResolver,
  }: VueMutationParams<DeliverTxResponse, TError, ITxArgs<TMsg>>) {
    const queryClient = useQueryClient();

    let signingClientResolver: SigningClientResolver | undefined;

    if (isISigningClient(clientResolver)) {
      signingClientResolver = clientResolver;
    } else if (isCacheResolver(clientResolver)) {
      const key =
        clientResolver.clientQueryKey || DEFAULT_SIGNING_CLIENT_QUERY_KEY;
      const queryKey = clientResolver.rpcEndpoint
        ? [key, clientResolver.rpcEndpoint]
        : [key];
      signingClientResolver = queryClient.getQueryData<ISigningClient>(
        queryKey
      );
    } else {
      clientResolver = clientResolver;
    }

    const mutationFn = opts.builderMutationFn(signingClientResolver);

    return useMutation<DeliverTxResponse, TError, ITxArgs<TMsg>>(
      {
        mutationFn: (reqData: ITxArgs<TMsg>) =>
          mutationFn(
            reqData.signerAddress,
            reqData.message,
            reqData.fee,
            reqData.memo
          ),
        ...options
      }
    );
  };
}
