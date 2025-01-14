# async / await

`async` と `await` は、JavaScript において非同期処理を簡潔に書くためのキーワードです。特に、非同期操作（例えば API 呼び出しやタイマー処理）を「同期処理のように」記述することで、コードが読みやすくなります。

---

### **`async` の役割**
`async` は、関数を非同期関数として定義します。この関数は、必ず **Promise** を返します。  
（内部でエラーが発生した場合、エラーは自動的に Promise の `reject` として扱われます。）

#### **例**
```javascript
async function example() {
  return "Hello, async!";
}
example().then(console.log); // "Hello, async!" と表示
```

---

### **`await` の役割**
`await` は、`Promise` が解決（成功または失敗）するまで処理を一時停止し、その結果を返します。これにより、`Promise.then()` を使う必要がなくなります。

#### **例**
```javascript
async function example() {
  const result = await Promise.resolve("Hello, await!");
  console.log(result); // "Hello, await!" と表示
}
example();
```

---

### **`async/await` を使った API 呼び出しの流れ**
1. `fetchData` 関数が `async` で定義されています。
2. `await` を使って `$pokeApi.get('pokemon')` の結果（`Promise`）を待ちます。
3. API 呼び出しが成功すると、`response` に結果が格納されます。
4. `console.log(response.data)` でデータを出力します。

---

### **コードの解説**
```javascript
const fetchData = async () => {
  // $pokeApi.get() が完了するまで待機
  const response = await $pokeApi.get('pokemon'); 

  // 結果を出力
  console.log(response.data); 
};
fetchData();
```

1. `$pokeApi.get('pokemon')` は非同期でデータを取得する API 呼び出しです。
   - これは `Promise` を返します。
2. `await` によって、API の応答を待ちます。
   - 処理が完了するまで次の行へ進まない。
3. `response.data` に取得したデータが入っています。

---

### **メリット**
- **可読性が向上**: `.then()` を連続して書く必要がなく、コードがシンプルになります。
- **エラーハンドリングが簡単**: `try-catch` を使うことでエラーを直感的に処理できます。

#### **エラーハンドリング例**
```javascript
const fetchData = async () => {
  try {
    const response = await $pokeApi.get('pokemon');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchData();
```

---

### **まとめ**
- `async`：非同期関数を定義する。
- `await`：Promise の完了を待つ。

これを使うと、非同期処理が直感的で書きやすくなります！