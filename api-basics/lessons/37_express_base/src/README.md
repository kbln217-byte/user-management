# リソースを決める
  id　主キー
  name 名前
  email　メールアドレス
  phone　電話番号
  createdAt　登録日

# usersのデータモデル（1件）
```json
{
  "id": 1,
  "name": "Alice",
  "email": "taro@example.com",
  "phone":"080-0000-0000",
  "createdAt": "2026-02-19T12:00:00Z",
}
```

# エンドポイント一覧（CRUD）
一覧	GET	/users
1件取得	GET	/users/:id
作成	POST	/users
更新	PUT	/users/:id
削除	DELETE	/users/:id


# 成功レスポンス例（一覧/詳細）
<!-- 一覧 -->
<!-- {
  "items": [
    { "id": 1, "name": "Alice", "email": "taro@example.com", "phone":"080-0000-0000", "createdAt": "..." }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
} -->
<!-- 詳細 -->
```json
{
  "items": [
    { "id": 1, "name": "Alice", "email": "taro@example.com", "phone":"080-0000-0000", "createdAt": "..." }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

# エラー形式（統一）
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

# ステータスコード方針
一覧/詳細取得成功	200
作成成功	201
更新成功（返すデータあり）	200
削除成功（返すデータなし）	204
入力ミス	400
未認証	401
権限なし	403
対象なし	404
想定外	500

