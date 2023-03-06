import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { describe, test, it } from "vitest";
import { readFileSync } from "fs";
import { setDoc, addDoc, doc } from "firebase/firestore";
// import * from "../../"

let testEnv = await initializeTestEnvironment({
  projectId: "bluudit-fe53b",
  firestore: {
    rules: readFileSync("firestore.rules", "utf8"),
    host: "localhost",
    port: 8080,
  },
});

const myUser = testEnv.authenticatedContext("myUser");
const theirUser = testEnv.authenticatedContext("theirUser");
const guestUser = testEnv.unauthenticatedContext();

describe("writing data", () => {
  // beforeAll(() => {});
  it("fails if guestUser user tries to create user doc", async () => {
    await assertFails(
      setDoc(doc(guestUser.firestore(), "users", "guestUser"), {
        nickname: "guestUser",
      })
    );
  });
  it("succeeds if authenticated user tries to create user doc", async () => {
    await assertSucceeds(
      setDoc(doc(myUser.firestore(), "users", "myUser"), {
        nickname: "myUser",
      })
    );
  });
});
