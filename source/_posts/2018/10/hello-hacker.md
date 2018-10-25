---
title: 「Bitcoin払わないとお前の情報ばらまく」というメールが来たので、ヘッダー等を見てみる
date: 2018-10-25 18:14:56
tags: 
---

自作のアプリに無限スクロールを実装できて、天才では〜〜〜???という気持ちに浸っていたところ、「お前のアカウントを数カ月前にハックして、連絡先とかネットの閲覧履歴を保存した上に、コンピュータにTrojan入れといたからな。Bitcoin払えばTrojanも手に入れたコピーも消してやる」という趣旨のメール(英語)をいただきました。

このメールを受信したアカウントは古くから使っている`yahoo.co.jp`のメールアドレスなのですが、Fromも同じ`yahoo.co.jp`の自分のメールアドレスだったので、詳しくない人だったらおそらく本当にメールアカウントがハックされたと思ってしまうでしょう。

さて、それではメールヘッダーの中から、まずはSPFレコードの検証結果を見ていきましょう。

<!-- more -->

## Received-SPFヘッダー

```plain
Received-SPF: softfail (static.vnpt.vn: domain of transitioning ********@yahoo.co.jp does not designate ***.***.***.*** as permitted sender) receiver=static.vnpt.vn; client-ip=***.***.***.***; envelope-from=********@yahoo.co.jp;
```

このヘッダーから、SPFの検証にsoftfailしていること、またこのメールは`static.vnpt.vn`(IPアドレスは隠してあります)から送信されていることがわかります。

SPFの検証結果が「`softfail`」になるということを恥ずかしながら知らなかったので検索したのですが、どうやらSPFレコードの「~」から始まるレコードの検証には成功した、ということを表すようです(出典: <http://salt.iajapan.org/wpmu/anti_spam/admin/tech/explanation/spf/#60>)。
それでは、`yahoo.co.jp`のSPFレコードを見てみましょう。

```plain
$ dig yahoo.co.jp TXT

; <<>> DiG 9.10.6 <<>> yahoo.co.jp TXT
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 4104
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;yahoo.co.jp.                   IN      TXT

;; ANSWER SECTION:
yahoo.co.jp.            393     IN      TXT     "v=spf1 include:spf.yahoo.co.jp ~all"
```

ということで、なぜか`yahoo.co.jp`のSPFレコードには`~all`が付いていることがわかりました。つまり、このメールは100%`yahoo.co.jp`の本当の持ち主から送信されたとは言えないことがわかります。

また、IPアドレスはベトナムの物のようで、IPアドレスからの逆引き結果を正引きしても一致しませんでした。

### 送信元の推測

`static.vnpt.vn`というホスト名から推測する限り、恐らく静的IPアドレスの契約をすべてこの逆引きに設定してあるのだと思います。元のIPアドレスをwhoisしたらちゃんと`vnpt.vn`が出てきたので、おそらく`vnpt.vn`の顧客として見て問題ないでしょう。


Google検索で`vnpt.vn `と入力すると、サジェストの一行目に`spam`が出てくることからも、以前からスパマーに利用されていることが推測できます。

おまけ: どうやら`vnpt.vn` はベトナムでいうNTTのような立ち位置(<q>1991年の首相決定に基づき設立された18の国営企業グループの１つ</q> 引用: <http://www.vina-finance.com/words/VNPT.html> とのこと)らしく、防弾サーバー業者とかそういうわけではないようです。
2017年に「頑張ってスパムメール止めるよ」 `http://www.vnpt.vn/en/News/NewsEvents/View/tabid/219/newsid/46104/seo/VNPT-Vinaphone-signed-commitment-to-stop-spam-messages/Default.aspx` と言っていますが、私の元にスパムメールが届いたのを見る限りではまだ完全ではなさそうです。

## Dateヘッダー

`Date`ヘッダーはタイムゾーンが`+0600`になっていました。
ベトナムはUTC+0700とのことなので、近隣の国なのでしょうか。

## その他ヘッダー

また、`Message-ID`については `<[0-9A-F]{32}@[0-9A-Z]{9}>` のような記法になっていました。
`User-Agent`等はOutlook Express 6のものですが、迷惑メールでよく見かけるので、おそらく使い古された一般的なものでしょう。

# おまけ

- メール内に書かれたBitcoinアドレスを <https://www.blockchain.com/explorer> で見たところ、すでに一名送金している人がいたようでした。送金は10月25日の8時(恐らくUTCなので、JSTに直すと17時)ごろなので、少なくとも数時間は同じようなメールを送信しているのでしょう。
- Bitcoinアドレスで検索したところ、ほぼ同じメールを受信したと書いている人が複数いましたが、請求金額が微妙に違いました(どれも$800台)。単にその時のBTC⇔USD相場から計算しているだけなのか、意図的にユニークな値を入れて受信者を特定しようとしているのかは不明です。