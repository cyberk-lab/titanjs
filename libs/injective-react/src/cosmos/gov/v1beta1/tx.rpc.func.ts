import { buildTx, SigningClientResolver } from "../../../helper-func-types";
import { toEncoders, toConverters } from "@interchainjs/cosmos/utils";
import { buildUseMutation } from "../../../react-query";
import { MsgSubmitProposal, MsgVote, MsgVoteWeighted, MsgDeposit } from "./tx";
export const createSubmitProposal = (clientResolver?: SigningClientResolver) => buildTx<MsgSubmitProposal>({
  clientResolver,
  typeUrl: MsgSubmitProposal.typeUrl,
  encoders: toEncoders(MsgSubmitProposal),
  converters: toConverters(MsgSubmitProposal),
  deps: [MsgSubmitProposal]
});
export const useSubmitProposal = buildUseMutation<MsgSubmitProposal, Error>({
  builderMutationFn: createSubmitProposal
});
export const createVote = (clientResolver?: SigningClientResolver) => buildTx<MsgVote>({
  clientResolver,
  typeUrl: MsgVote.typeUrl,
  encoders: toEncoders(MsgVote),
  converters: toConverters(MsgVote),
  deps: [MsgVote]
});
export const useVote = buildUseMutation<MsgVote, Error>({
  builderMutationFn: createVote
});
export const createVoteWeighted = (clientResolver?: SigningClientResolver) => buildTx<MsgVoteWeighted>({
  clientResolver,
  typeUrl: MsgVoteWeighted.typeUrl,
  encoders: toEncoders(MsgVoteWeighted),
  converters: toConverters(MsgVoteWeighted),
  deps: [MsgVoteWeighted]
});
export const useVoteWeighted = buildUseMutation<MsgVoteWeighted, Error>({
  builderMutationFn: createVoteWeighted
});
export const createDeposit = (clientResolver?: SigningClientResolver) => buildTx<MsgDeposit>({
  clientResolver,
  typeUrl: MsgDeposit.typeUrl,
  encoders: toEncoders(MsgDeposit),
  converters: toConverters(MsgDeposit),
  deps: [MsgDeposit]
});
export const useDeposit = buildUseMutation<MsgDeposit, Error>({
  builderMutationFn: createDeposit
});