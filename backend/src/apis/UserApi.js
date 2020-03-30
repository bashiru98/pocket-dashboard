import express from "express";
import UserService from "../services/UserService";

const router = express.Router();

const userService = new UserService();

/**
 * Provides Auth provider urls to show consent.
 */
router.get("/Auth/Providers", (request, response) => {
  response.send(userService.getConsentProviderUrls());
});

/**
 * User authentication using an Auth provider.
 */
router.post("/Auth/provider/login", async (request, response) => {
  try {
    /** @type {{provider_name:string, code:string}} */
    const data = request.body;
    const user = await userService.authenticateWithAuthProvider(data.provider_name, data.code);

    response.send(user);
  } catch (e) {
    const error = {
      message: e.toString()
    };

    response.status(400).send(error);
  }

});

/**
 * User authentication using username and password.
 */
router.post("/Auth/login", async (request, response) => {
  try {
    /** @type {{username:string, password:string}} */
    const data = request.body;
    const user = await userService.authenticateUser(data.username, data.password);

    response.send(user);
  } catch (e) {
    const error = {
      message: e.toString()
    };

    response.status(400).send(error);
  }

});

/**
 * User sign up using email.
 */
router.post("/Auth/signup", async (request, response) => {
  try {
    /** @type {{email:string, username:string, password1:string, password2:string}} */
    const data = request.body;

    const result = await userService.signupUser(data);

    response.send(result);
  } catch (e) {
    const error = {
      message: e.toString()
    };

    response.status(400).send(error);
  }

});

/**
 * User logout.
 */
router.post("/Auth/logout", async (request, response) => {
  try {
    /** @type {{email:string}} */
    const data = request.body;

    const result = await userService.logout(data.email);

    response.send(result);
  } catch (e) {
    response.send(false);
  }

});


export default router;
