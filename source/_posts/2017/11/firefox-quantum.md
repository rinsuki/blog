---
title: Firefox QuantumがリリースされたのでChrome Canaryから移行してみる話
date: 2017-11-15 00:21:56
tags:
  - browser
---

タイトル通り。

<!-- more -->

## なんで移行したの

- Chromeなんか重い
- ChromeCanaryでvideoだけが画面に表示される状態にするとなんかおかしくなってつらい(Canaryを使うな)
- Chromeマテリアルデザインになりつつあってて:thinking_face:
- 人柱精神

## 移行作業

- TampermonkeyのスクリプトをChrome側でエクスポート
  - Tampermonkeyのダッシュボード→ユーティリティー→Zip→エクスポート
- Firefox Quantumをインストール(私の場合はクリーンな状態でインストールしたかったので`~/Library/Application Support/Firefox`を削除してからインストールした)
- インターネット生活に必要な拡張類をインストール
  - Tampermonkey <https://addons.mozilla.org/ja/firefox/addon/tampermonkey/>
    - さっきエクスポートしたのをインポート
  - はてなブックマーク拡張 <https://addons.mozilla.org/ja/firefox/addon/hatena-bookmark/>
  - uBlock Origin <https://addons.mozilla.org/ja/firefox/addon/ublock-origin/>
    - ABP Japanese Filterを無効化するのを忘れずに(これを忘れるといろいろなサイトが壊れる)
- Firefoxのストアにないもの
  - はてなのお知らせ
    - これは正直どうでもいいのでスルー
  - Personal Blocklist
    - これはないと非常に困る
    - あとでUserScriptで再実装したい(なお時間はない)

これでおわり。

## おわりに

とりあえず困ってないのでこれでやっていこうと思います。おわり。