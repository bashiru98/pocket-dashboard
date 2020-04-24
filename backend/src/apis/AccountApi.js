import express from "express";
import AccountService from "../services/AccountService";

const router = express.Router();

const accountService = new AccountService();

/**
 * Import account.
 */
router.post("/import", async (request, response) => {
  try {
    /** @type {{accountPrivateKey:string}} */
    const data = request.body;
    const account = await accountService.importAccountFromNetwork(data.accountPrivateKey);

    response.send(account);
  } catch (e) {
    const error = {
      message: e.toString()
    };

    response.status(400).send(error);
  }
});


export default router;