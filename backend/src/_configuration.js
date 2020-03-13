import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

// Configure Environment Variables: Now .env files can be loaded and used in process.env.
dotenv.config();

export const Configurations = {
  auth: {
    providers: {
      google: {
        client_id: process.env.AUTH_PROVIDER_GOOGLE_CLIENT_ID,
        client_secret: process.env.AUTH_PROVIDER_GOOGLE_CLIENT_SECRET,
        callback_url: process.env.AUTH_PROVIDER_GOOGLE_CALLBACK_URL,
        scopes: ["read:user", "user:email"],
        urls: {
          consent_url: "https://github.com/login/oauth/authorize",
          access_token: "https://github.com/login/oauth/access_token",
          user_info_url: "https://api.github.com/user"
        }
      },
      github: {
        client_id: process.env.AUTH_PROVIDER_GITHUB_CLIENT_ID,
        client_secret: process.env.AUTH_PROVIDER_GITHUB_CLIENT_SECRET,
        callback_url: process.env.AUTH_PROVIDER_GITHUB_CALLBACK_URL,
        scopes: ["read:user", "user:email"],
        urls: {
          consent_url: "https://github.com/login/oauth/authorize",
          access_token: "https://github.com/login/oauth/access_token",
          user_info_url: "https://api.github.com/user"
        }
      }
    }
  },
  persistence: {
    url: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_NAME,
    options: {
      useUnifiedTopology: true
    }
  },
  poktNetwork: {
    aat_version: "0.0.1",
    default_rpc_port: 8081,
    max_dispatchers: process.env.POKT_NETWORK_MAX_DISPATCHER,
    request_timeout: process.env.POKT_NETWORK_REQUEST_TIMEOUT,
    max_sessions: process.env.POKT_NETWORK_MAX_SESSIONS,
    nodes: {
      test: [
        "http://node1.testnet.pokt.network",
        "http://node2.testnet.pokt.network",
        "http://node3.testnet.pokt.network",
        "http://node4.testnet.pokt.network",
        "http://node5.testnet.pokt.network",
        "http://node6.testnet.pokt.network",
        "http://node7.testnet.pokt.network",
        "http://node8.testnet.pokt.network",
        "http://node9.testnet.pokt.network",
        "http://node10.testnet.pokt.network"
      ],
      main: []
    }
  }
};

export function configureExpress(expressApp) {
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({extended: false}));
  expressApp.use(cookieParser());
  expressApp.use(logger("dev"));
}
