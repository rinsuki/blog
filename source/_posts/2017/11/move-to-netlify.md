---
title: GitHub Pagesからnetlify + 独自ドメイン運用に変えた
date: 2017-11-14 17:14:07
tags:
  - info
---

タイトル通り。リポジトリは変わらず <https://github.com/rinsuki/blog>。

<!-- more -->

## Netlifyってなんぞ

なんかすげーやつ。静的ファイルホスティングするならこれ使っとけみたいな感じらしい。
<https://www.netlify.com>

ちなみに一部では「ねっとりfy」とか「寝取りfy」とか言われている。~~かわいそう~~

GitHub PagesだとTravis CI的なものでビルドしてgh-pagesにプッシュして...とかやらないといけなくてしんどかったけど、netlifyはビルドとホスティングの部分を持ってくれる。

独自ドメインでもLet's EncryptでHTTPSにできるのが人によっては便利かも(GitHub Pagesで独自ドメイン + HTTPSをやりたいとなるとCloudflareを使わないといけなかった)。

ただ難点が一つあって、自前CDNのキャッシュにかからなかったときがすごい遅い。
1MBのpngファイルの転送に3秒前後かかったりする。キャッシュにかかってしまえばそこそこはやいので、まあという感じ。


一応GitHub Pagesの方にもJavaScriptでのリダイレクトを[しかけた](https://github.com/rinsuki/blog/blob/master/docs/404.html)。