# tasks APIの仕様
## tasks
```json
{
  "id": 1,
  "title": "タスクタイトル",
  "status": "DONE",
  //キャメルケース　スネークケース(user_id)
  "userId": 2,
  "createdAt": "2026-02-19T12:00:00Z"
}
```

## users
``` json
{
  "id": 1,
  "name": "Taro",
  "email": "taro@example.com",
  "password": "xxxxxxxxxxxxxxx",
  "createdAt": "2026-02-19T12:00:00Z"
}
```
----

# エンドポイント一覧
## tasks API
```txt
目的	メソッド	パス
一覧	GET	/tasks
詳細	GET	/tasks/:id
作成	POST	/regisuter
更新	PUT	/tasks/:id
削除	DELETE	/tasks/:id
```

## Users API
``` txt
一覧	GET	/users
1件取得	GET	/users/:id
作成	POST	/register
更新	PUT	/users/:id
削除	DELETE	/users/:id
```

# レスポンス

## tasks API

### 一覧

``` json
{
  "items": [
    { 
        "id": 1,
        "title": "タスクタイトル",
        "done": true, 
        "user_id": 2,
        "createdAt": "2026-02-19T12:00:00Z"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

## users API

### 一覧
``` json
{
  "items": [
    { "id": 1, "name": "Taro", "email": "taro@example.com", "createdAt": "..." }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```
----

# エラー形式（統一）

- ※失敗はすべてこの形で返します

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "email is required",
    "details": [
      { "field": "email", "reason": "required" }
    ]
  }
}
```

# ステータスコード方針

## HTTPステータスコード一覧

| ケース                     | ステータスコード |
|---------------------------|----------------|
| 一覧取得 / 詳細取得 成功   | 200 |
| 作成成功                   | 201 |
| 更新成功（返すデータあり） | 200 |
| 削除成功（返すデータなし） | 204 |
| 入力ミス                   | 400 |
| 未認証                     | 401 |
| 権限なし                   | 403 |
| 対象なし                   | 404 |
| 想定外エラー               | 500 |

---


# 環境構築

## ①npmの初期化
``` bash
npm init -y
```

## ②依存関係インストール
- ExpressとPrismaClientの導入
``` bash
npm install express @prisma/client
```
## ③開発依存
``` bash
npm install -D prisma typescript ts-node-dev @types/node @types/express
```

## ④TypeScript設定生成
``` bash
npx tsc --init
```
## ⑤Prisma初期化
``` bash
npx prisma init
```


# 動作確認

### サーバー起動
``` bash
npm run dev
```

### 該当エンドポイントを叩く
``` bash
curl xxxxxxxxxxxxxxxxxx
```

### テスト
``` bash
npm run test
```




## tasks
一覧	GET	/tasks
一覧取得	GET	/tasks/:id
作成	POST	/tasks
更新	PUT	/tasks/:id
削除	DELETE	//:id

## users
一覧	GET	/tasks
一覧取得	GET	/tasks/:id
作成	POST	/tasks
更新	PUT	/tasks/:id
削除	DELETE	//:id







1) REST設計

# エンドポイント一覧　動詞URLは禁止（名詞で）
一覧	GET	/tasks
一覧取得	GET	/tasks/:id
作成	POST	/tasks
更新	PUT	/tasks/:id
削除	DELETE	//:id

# 成功/失敗のJSON形式を統一
## 成功レスポンス例
```json
{
  "items": [
    { 
     "id": 1,
     "title": "PC立ち上げ", 
     "status":"完了", 
     "use_id":"田中", 
     "createdAt": "2026-02-19T12:00:00Z" }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

## エラー形式（統一）
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "タスクが完了していません",
    "details": [
      { "field": "担当者", "reason": "required" }
    ]
  }
}
```
# ステータスコード方針をREADMEに書く
一覧/詳細取得成功	200
作成成功	201
更新成功（返すデータあり）	200
削除成功（返すデータなし）	204
バリデーション	400
認証なし	401
権限なし	403
対象なし	404
想定外	500


2) バリデーション
必須項目が欠けたら400
不正な形式も400（例：空文字、過去日付など）

 if (!必須項目) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "必須項目がかけています" } });
      return;
    }

 if (!形式) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "形式が間違っています" } });
      return;
    }

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "name is required",
    "details": [
      { "field": "name", "reason": "required" }
    ]
  }
}
```


3) 認証（最低限）
POST /auth/login でJWT発行（固定ユーザーでOK）
作成/更新/削除は認証必須（401）





4) DB連携
Postgreに保存（再起動しても残る）

id 主キー
title タスク名
done 状態
createdAt 完了日


5) テスト
最低3本（例）

正常系（一覧取得）
異常系（バリデーション400）
認証なし401









# リソースを決める
  id　主キー
  title 
  status　完了／未完了／着手／未着手
  use_id　担当者
  createdAt　登録日
