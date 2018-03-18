---
title: webpack-dev-serverとバックエンドアプリケーションを同じポートで動かす
date: 2017-11-08 18:33:14
tags:
---

## 前提

productionが`https://app.example.com`で、ここでバックエンドのアプリケーションもwebpackのbundle.jsも一緒に配信する

developmentでもwebpack-dev-serverさえ使わなければ同じポートにできるけど、webpack-dev-serverのauto reloadとか使いたいよね

## やりかた

`webpack.config.js`にこう書く


```javascript
const webpack = require("webpack")

module.exports = {
    entry: "./front/index.js" /* この辺はプロジェクトによって違うよね */,
    output: {
        path: __dirname+"/dist",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "dist",
        // ここから本題
        proxy: {
            "/": "http://localhost:5000" // ここにbackendのURL(ここでは`http://localhost:5000`)を書く
        }
        // ここまで本題
    },
    // 省略
}
```

WebSocketが通るかどうかとかは検証してないのでもしかしたらその辺で詰むかもしれない。
おわり。