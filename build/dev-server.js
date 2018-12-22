const bodyParser = require("body-parser");

// Expressアプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
    // HTTPリクエストのbodyの内容をJSONとして解析するようミドルウェアをインストール
    app.use(bodyParser.json());
    // TODO: APIの実装を追加する
};
