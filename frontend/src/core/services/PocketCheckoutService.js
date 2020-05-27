import PocketBaseService from "./PocketBaseService";
import axios from "axios";

export class PocketCheckoutService extends PocketBaseService {
  constructor() {
    super("api/checkout");
  }

  /**
   * Get relays per day data.
   *
   * @returns {Promise<object|*>} Relays per day data.
   */
  getRelaysPerDay() {
    return axios
      .get(this._getURL("applications/relays-per-day"))
      .then((response) => response.data);
  }

  /**
   * Get money to spent.
   *
   * @param {number} relaysPerDay Relays per day.
   *
   * @returns {Promise<number|*>} Cost to spent.
   */
  getApplicationMoneyToSpent(relaysPerDay) {
    return axios
      .get(this._getURL(`applications/cost?rpd=${relaysPerDay}`))
      .then((response) => response.data);
  }
}

export default new PocketCheckoutService();