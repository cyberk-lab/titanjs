import { buildQuery } from "../../../../helper-func-types";
import { QueryIncentivizedPacketsRequest, QueryIncentivizedPacketsResponse, QueryIncentivizedPacketRequest, QueryIncentivizedPacketResponse, QueryIncentivizedPacketsForChannelRequest, QueryIncentivizedPacketsForChannelResponse, QueryTotalRecvFeesRequest, QueryTotalRecvFeesResponse, QueryTotalAckFeesRequest, QueryTotalAckFeesResponse, QueryTotalTimeoutFeesRequest, QueryTotalTimeoutFeesResponse, QueryPayeeRequest, QueryPayeeResponse, QueryCounterpartyPayeeRequest, QueryCounterpartyPayeeResponse, QueryFeeEnabledChannelsRequest, QueryFeeEnabledChannelsResponse, QueryFeeEnabledChannelRequest, QueryFeeEnabledChannelResponse } from "./query";
export const getIncentivizedPackets = buildQuery<QueryIncentivizedPacketsRequest, QueryIncentivizedPacketsResponse>({
  encode: QueryIncentivizedPacketsRequest.encode,
  decode: QueryIncentivizedPacketsResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "IncentivizedPackets",
  deps: [QueryIncentivizedPacketsRequest, QueryIncentivizedPacketsResponse]
});
export const getIncentivizedPacket = buildQuery<QueryIncentivizedPacketRequest, QueryIncentivizedPacketResponse>({
  encode: QueryIncentivizedPacketRequest.encode,
  decode: QueryIncentivizedPacketResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "IncentivizedPacket",
  deps: [QueryIncentivizedPacketRequest, QueryIncentivizedPacketResponse]
});
export const getIncentivizedPacketsForChannel = buildQuery<QueryIncentivizedPacketsForChannelRequest, QueryIncentivizedPacketsForChannelResponse>({
  encode: QueryIncentivizedPacketsForChannelRequest.encode,
  decode: QueryIncentivizedPacketsForChannelResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "IncentivizedPacketsForChannel",
  deps: [QueryIncentivizedPacketsForChannelRequest, QueryIncentivizedPacketsForChannelResponse]
});
export const getTotalRecvFees = buildQuery<QueryTotalRecvFeesRequest, QueryTotalRecvFeesResponse>({
  encode: QueryTotalRecvFeesRequest.encode,
  decode: QueryTotalRecvFeesResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "TotalRecvFees",
  deps: [QueryTotalRecvFeesRequest, QueryTotalRecvFeesResponse]
});
export const getTotalAckFees = buildQuery<QueryTotalAckFeesRequest, QueryTotalAckFeesResponse>({
  encode: QueryTotalAckFeesRequest.encode,
  decode: QueryTotalAckFeesResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "TotalAckFees",
  deps: [QueryTotalAckFeesRequest, QueryTotalAckFeesResponse]
});
export const getTotalTimeoutFees = buildQuery<QueryTotalTimeoutFeesRequest, QueryTotalTimeoutFeesResponse>({
  encode: QueryTotalTimeoutFeesRequest.encode,
  decode: QueryTotalTimeoutFeesResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "TotalTimeoutFees",
  deps: [QueryTotalTimeoutFeesRequest, QueryTotalTimeoutFeesResponse]
});
export const getPayee = buildQuery<QueryPayeeRequest, QueryPayeeResponse>({
  encode: QueryPayeeRequest.encode,
  decode: QueryPayeeResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "Payee",
  deps: [QueryPayeeRequest, QueryPayeeResponse]
});
export const getCounterpartyPayee = buildQuery<QueryCounterpartyPayeeRequest, QueryCounterpartyPayeeResponse>({
  encode: QueryCounterpartyPayeeRequest.encode,
  decode: QueryCounterpartyPayeeResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "CounterpartyPayee",
  deps: [QueryCounterpartyPayeeRequest, QueryCounterpartyPayeeResponse]
});
export const getFeeEnabledChannels = buildQuery<QueryFeeEnabledChannelsRequest, QueryFeeEnabledChannelsResponse>({
  encode: QueryFeeEnabledChannelsRequest.encode,
  decode: QueryFeeEnabledChannelsResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "FeeEnabledChannels",
  deps: [QueryFeeEnabledChannelsRequest, QueryFeeEnabledChannelsResponse]
});
export const getFeeEnabledChannel = buildQuery<QueryFeeEnabledChannelRequest, QueryFeeEnabledChannelResponse>({
  encode: QueryFeeEnabledChannelRequest.encode,
  decode: QueryFeeEnabledChannelResponse.decode,
  service: "ibc.applications.fee.v1.Query",
  method: "FeeEnabledChannel",
  deps: [QueryFeeEnabledChannelRequest, QueryFeeEnabledChannelResponse]
});