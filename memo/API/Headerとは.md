# 『Headerとは』

API呼び出しの際に言われる「**ヘッダー（Header）」**は、HTTPリクエストやレスポンスに含まれる追加情報を指します。APIサーバーとクライアント間でやり取りする**メタデータ**のようなものです。

---

### **HTTPヘッダーの役割**
HTTPリクエストやレスポンスにヘッダーを含めることで、通信内容を詳細にコントロールできます。

#### 主な役割：
1. **通信内容の説明**
   - データ形式、エンコーディング方式、認証情報などを伝える。
2. **サーバーやクライアントの情報提供**
   - サーバーの設定やクライアントの仕様を伝える。
3. **状態管理**
   - 認証トークンやセッション情報を管理する。

---

### **ヘッダーの構造**
ヘッダーは**名前**と**値**のペアで構成されます。

#### 例：
```plaintext
Content-Type: application/json
Authorization: Bearer your-access-token
```

---

### **リクエストヘッダーとレスポンスヘッダーの違い**
1. **リクエストヘッダー**  
   クライアントがサーバーに送信するヘッダー。
   - 例:
     - 認証情報（`Authorization`）
     - データ形式指定（`Content-Type`）
     - ユーザーエージェント（`User-Agent`）

2. **レスポンスヘッダー**  
   サーバーがクライアントに送信するヘッダー。
   - 例:
     - データ形式（`Content-Type`）
     - キャッシュ制御（`Cache-Control`）
     - サーバー情報（`Server`）

---

### **よく使われるリクエストヘッダー**
| ヘッダー名          | 説明 |
|--------------------|------|
| `Content-Type`     | 送信するデータの形式を指定（例: `application/json`）。|
| `Authorization`    | 認証トークンやAPIキーを送信。|
| `Accept`           | クライアントが受け入れるデータ形式を指定。|
| `User-Agent`       | クライアントの情報（ブラウザやアプリの名前、バージョンなど）。|

#### 例: JSONデータを送信する場合
```plaintext
Content-Type: application/json
```

---

### **ヘッダーを設定するコード例**

#### JavaScript（Axiosの場合）
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-access-token',
  },
});

api.get('endpoint')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

### **ヘッダーが重要な理由**
- **認証**: トークンやAPIキーを使用して安全な通信を確立する。
- **データ形式の統一**: サーバーとクライアント間で扱うデータ形式を指定する。
- **効率的な通信**: クライアントの要件に応じたレスポンスを効率的に受け取る。

---


