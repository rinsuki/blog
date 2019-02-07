---
title: Let's Encrypt のワイルドカード証明書をCloudflareのDNSを使っている環境で自動取得する話
date: 2018-03-20 23:38:08
tags:
  - memo
  - letsencrypt
  - cloudflare
  - https
---

ついにLet's Encryptでワイルドカード証明書がサポートされました。
とりあえずうちのサーバーでも取ってみたのでそれのメモです。

<!-- more -->

## 1. certbotをpipで落とす

ArchLinuxとかそういうのを除けばだいたいお使いのディストリのパッケージマネージャにはおおよそ(2018年3月20日現在では)ワイルドカード証明書の発行(正確にはACMEv2)に対応したcertbotは降ってきていないと思うので、ここでは Python のためのパッケージマネージャ pip を使って最新の certbot をインストールします。

```
// お好きな方法でPython 3.xとPython 3.x用のpipをインストールする
// debian だったら apt install python3-pip とか
# pip3 install certbot
# certbot --version # 0.22.0以上なら ACMEv2 対応
```

## 2. certbotがcloudflareのDNSを読み書きするためのプラグインを入れる

ワイルドカード証明書を Let's Encrypt で発行する際は、DNSでの認証が必須です。
通常だとターミナルに出力された認証用コードを手動でDNSレコードを変更して反映させるなどの苦行を強いられますが、 certbotが対応しているクラウドDNSサーバーを利用しているならプラグインを入れて使えばOKです。

現時点では、Cloudflareの他にもRoute53やGoogle Cloud DNSのようなDNSサーバーに対応しているようです。

```
# pip3 install certbot-dns-cloudflare
```

## 3. cloudflareから API key を取得する

Cloudflareにログインした状態で <https://www.cloudflare.com/a/profile> を開くと 下のほうにAPI Keyとかいうのがあると思うので、その下の「Global API Key」の横にある「View API Key」を押す。
すると(2018/03/21時点では)パスワード入力フィールドとGoogle reCAPTCHAが表示されるのでcloudflareのアカウントとreCAPTCHA のチェックを入れて「View API key」をクリックする。
したらばAPI keyが表示されると思うので、以下の `<APIKey>` のところをそれに置換して適当なところ(ここでは仮に`/path/to/credentials/cloudflare.ini`とでもする)に保存する。

```
dns_cloudflare_email = <Cloudflareに登録してあるメールアドレス>
dns_cloudflare_api_key = <APIKey>
```

保存したら`chmod 600 /path/to/credentials/cloudflare.ini`しておく。

## 4. certbot certonlyで証明書を取得する

```
# certbot certonly --server https://acme-v02.api.letsencrypt.org/directory --dns-cloudflare --dns-cloudflare-credentials /path/to/credentials/cloudflare.ini -d 'example.com' -d '*.example.com'
```

`example.com`とか`/path/to/うんぬん`の部分は環境によって変えること。

これで成功すると

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator dns-cloudflare, Installer None
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for rinsuki.net
dns-01 challenge for rinsuki.net
Waiting 10 seconds for DNS changes to propagate
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/rinsuki.net-0001/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/rinsuki.net-0001/privkey.pem
   Your cert will expire on 2018-06-18. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```
みたいなログが出る。よかったですね。いい話。

## Q. は?うまく行かねーんだが

エラーメッセージからそれっぽいところを探し出してGoogle検索すると大体の場合先人の解決結果が書いてあるぞ(日本語で書いてあるとは言ってない)