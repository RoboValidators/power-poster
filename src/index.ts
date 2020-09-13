// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
process.env.NTBA_FIX_319 = "1";

import "firebase/firestore";
import * as fireorm from "fireorm";
import admin, { ServiceAccount } from "firebase-admin";

import serviceAccount from "../serviceAccountKey.json";
import { alias } from "./defaults";

const instance = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  },
  alias
);

fireorm.initialize(instance.firestore());

export * from "./plugin";
