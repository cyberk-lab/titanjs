import { Bech32, fromBase64 } from "@cosmjs/encoding";

import {
  decodeAminoPubkey,
  decodeBech32Pubkey,
  encodeAminoPubkey,
  encodeBech32Pubkey,
  encodeSecp256k1Pubkey,
} from "./encoding";
import { MultisigThresholdPubkey, Pubkey } from "./pubkeys";

describe("encoding", () => {
  describe("encodeSecp256k1Pubkey", () => {
    it("encodes a compresed pubkey", () => {
      const pubkey = fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
      expect(encodeSecp256k1Pubkey(pubkey)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      });
    });

    it("throws for uncompressed public keys", () => {
      const pubkey = fromBase64(
        "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
      );
      expect(() => encodeSecp256k1Pubkey(pubkey)).toThrowError(/public key must be compressed secp256k1/i);
    });
  });

  describe("decodeAminoPubkey", () => {
    it("works for secp256k1", () => {
      const amino = Bech32.decode(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      ).data;
      expect(decodeAminoPubkey(amino)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      });
    });

    it("works for ed25519", () => {
      // Encoded from `corald tendermint show-validator`
      // Decoded from http://localhost:26657/validators
      const amino = Bech32.decode(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      ).data;
      expect(decodeAminoPubkey(amino)).toEqual({
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      });
    });

    it("works for sr25519", () => {
      pending("No test data available");
    });
  });

  describe("decodeBech32Pubkey", () => {
    it("works", () => {
      expect(
        decodeBech32Pubkey("cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5"),
      ).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      });
    });

    it("works for enigma pubkey", () => {
      expect(
        decodeBech32Pubkey("enigmapub1addwnpepqw5k9p439nw0zpg2aundx4umwx4nw233z5prpjqjv5anl5grmnchzp2xwvv"),
      ).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A6lihrEs3PEFCu8m01ebcas3KjEVAjDIEmU7P9ED3PFx",
      });
    });

    it("works for ed25519", () => {
      // Encoded from `corald tendermint show-validator`
      // Decoded from http://localhost:26657/validators
      const decoded = decodeBech32Pubkey(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      );
      expect(decoded).toEqual({
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      });
    });
  });

  describe("encodeAminoPubkey", () => {
    it("works for secp256k1", () => {
      const pubkey: Pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      };
      const expected = Bech32.decode(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      ).data;
      expect(encodeAminoPubkey(pubkey)).toEqual(expected);
    });

    it("works for ed25519", () => {
      // Decoded from http://localhost:26657/validators
      // Encoded from `corald tendermint show-validator`
      const pubkey: Pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      };
      const expected = Bech32.decode(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      ).data;
      expect(encodeAminoPubkey(pubkey)).toEqual(expected);
    });
  });

  describe("encodeBech32Pubkey", () => {
    it("works for secp256k1", () => {
      const pubkey: Pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      };
      expect(encodeBech32Pubkey(pubkey, "cosmospub")).toEqual(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      );
    });

    it("works for ed25519", () => {
      // Decoded from http://localhost:26657/validators
      // Encoded from `corald tendermint show-validator`
      const pubkey: Pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      };
      expect(encodeBech32Pubkey(pubkey, "coralvalconspub")).toEqual(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      );
    });

    it("works for multisig", () => {
      // ./build/wasmd keys add test1
      // ./build/wasmd keys add test2
      // ./build/wasmd keys add test3
      // ./build/wasmd keys add testgroup1 --multisig=test1,test2,test3 --multisig-threshold 2
      // ./build/wasmd keys add testgroup2 --multisig=test1,test2,test3 --multisig-threshold 1
      // ./build/wasmd keys add testgroup3 --multisig=test3,test1 --multisig-threshold 2

      const test1 = decodeBech32Pubkey(
        "wasmpub1addwnpepqwxttx8w2sfs6d8cuzqcuau84grp8xsw95qzdjkmvc44tnckskdxw3zw2km",
      );
      const test2 = decodeBech32Pubkey(
        "wasmpub1addwnpepq2gx7x7e29kge5a4ycunytyqr0u8ynql5h583s8r9wdads9m3v8ks6y0nhc",
      );
      const test3 = decodeBech32Pubkey(
        "wasmpub1addwnpepq0xfx5vavxmgdkn0p6x0l9p3udttghu3qcldd7ql08wa3xy93qq0xuzvtxc",
      );

      // 2/3 multisig
      const testgroup1: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [test1, test2, test3],
        },
      };
      const expected1 = Bech32.decode(
        "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7v7aysdd",
      ).data;
      expect(encodeAminoPubkey(testgroup1)).toEqual(expected1);

      // 1/3 multisig
      const testgroup2: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "1",
          pubkeys: [test1, test2, test3],
        },
      };
      const expected2 = Bech32.decode(
        "wasmpub1ytql0csgqyfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vc4ejke",
      ).data;
      expect(encodeAminoPubkey(testgroup2)).toEqual(expected2);
    });
  });
});
