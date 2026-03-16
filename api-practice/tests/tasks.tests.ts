import request from "supertest";
import { buildApp } from "../src/app";
import { prisma } from "../src/db";
import * as bcrypt from "bcryptjs";

 const app = buildApp();
 //expressの初期化、json読み込みについて記載




async function login(app: any, email: string, password: string) {
  return request(app).post("/auth/login").send({ email, password });
}

describe("tasks CRUD", () => {
  let userId: number;
  let taskId: number;

  //テストユーザーのインサートを実行↓(たまに削除も)
  beforeAll(async () => {
    await Users();
    await ();
    await ()

  });

  afterAll(async () => {
    await priUsers();
    await ();
    await ()

  });



  test("GET / -> タスク一覧を返す", async () => {
    //request(app)
    const res = await request(app).get("/tasks");
    //タスク一覧APIのレスポンスのstetusコードが２００
    expect(res.status).toBe(200);
    //レスポンスのボディが配列になっているか
    expect(Array.isArray(res.body)).toBe(true);
    //レスポンスのボディに“タイトル”というプロパティがあるか
    expect(res.body).toHaveProperty("title");

  });

    test("GET /:id -> 詳細", async () => {
    //request(app)
    const res = await request(app).get(`/tasks/${taskId}`);
    //タスク一覧APIのレスポンスのstetusコードが２００
    expect(res.status).toBe(200);
    //レスポンスのボディに“タイトル”というプロパティがあるか
    expect(res.body).toHaveProperty("userId");

  });

    const loginRes = await login(app, "alice@example.com", "passw0rd");
    expect(loginRes.status).toBe(200);

    const token = loginRes.body.token as string;

    const meRes = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(meRes.status).toBe(200);
  });

  test("admin route as user -> 403", async () => {
    const app = buildApp();

    const loginRes = await login(app, "alice@example.com", "passw0rd");
    expect(loginRes.status).toBe(200); // ここも入れておくと原因が分かりやすい

    const token = loginRes.body.token as string;

    const res = await request(app)
      .get("/users/admin/secret")
      .set("Authorization", `Bearer NULL`);

    expect(res.status).toBe(403);
  });
});


import request from "supertest";
import { buildApp } from "../src/app";
import { login } from "../src/app";

describe("tasks flow", () => {

  test("login -> me", async () => {



    const loginRes = await request(app)
  .post("/tasks/login")
  .send({
    email: "George@example.com",
    password: "George2"
  });
  });

});

