import {Chains} from "../providers/NetworkChains";

export class NetworkChain {

  /**
   * @param {string} name Name.
   * @param {string} netID Network Identifier.
   * @param {string} hash Hash.
   */
  constructor(name, netID, hash) {
    Object.assign(this, {name, netID, hash});
  }

  /**
   * Get available network chains.
   *
   * @returns {NetworkChain[]} Network chains in Pocket.
   * @static
   */
  static getAvailableNetworkChains() {
    return Chains.map(chain => new NetworkChain(chain.name, chain.netID, chain.hash));
  }
}
