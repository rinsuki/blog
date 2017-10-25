---
title: HexoのサイトをTravis CIで自動デプロイ
date: 2017-10-25 13:40:00
tags:
---

タイトル通り。

この記事はHexoでとりあえず手元のマシンから`hexo deploy`をするとGitHub Pagesに反映されるようになったぐらいの環境で、Travis CIをセットアップして自動デプロイできるようにする方法を書いた記事です。

流れとしては

1. SSH鍵を生成して、公開鍵をGitHubリポジトリの [Deploy keys](https://developer.github.com/v3/guides/managing-deploy-keys/#deploy-keys) に登録
2. 秘密鍵をTravis CIの機能で暗号化
3. Travis CIで暗号化した秘密鍵を複合して指定の位置に配置, `hexo deploy`をする

という感じです。

また、この記事は`macOS 10.13 High Sierra`の環境下で書かれたので、他のOS等ではやり方が一部異なる可能性があります。

なお、**`2.`が終了するまではgitにコミットをしないでください。秘密鍵が漏洩する可能性があります。**

それではやっていきましょう。

## SSH鍵を生成

まず、CI用のファイルをまとめるディレクトリを作成します。私は`.ci-files`というディレクトリ名にしました。
今回は"通常人間が作業する際に必要ない物をプロジェクトルートにばらまいておくのは個人的に気持ち悪い"という私の宗教上の理由から作成しましたが、気にならないようでしたらプロジェクトルートにばらまいてしまっても構いません。

```sh
mkdir .ci-files
```

以下の説明はすべて`.ci-files`というディレクトリの中にCI用のファイルを置く前提で行きます。

そして、.ci-files内にSSH鍵を生成して、配置します。

```sh
ssh-keygen -f .ci-files/id_rsa
```

パスフレーズはなしで構いません。

これでSSH鍵は生成できました。

また、`.ci-files/id_rsa.pub` の最後に`あなたのPCのユーザー名@あなたのPC名`が付与されますので、気になるようでしたら削除してください。

## Deploy keysに指定

`.ci-files/id_rsa.pub`の内容をコピーして、該当リポジトリの`Settings`→`Deploy keys`→`Add deploy key`→`Key`の下のでかいテキストボックスにペーストしてください。
また、`Allow write access`のチェックボックスをONにしてください(これがないとTravis CIからpushできません)。
そうしたら、`Add key`をクリックしたあと、パスワードを聞かれた場合はパスワードを入力して、完了です。

![](/blog/images/deploy_keys.png)


## 秘密鍵の暗号化


秘密鍵を暗号化するためには、`travis`というコマンドをインストールしなければいけません。
`travis`コアンドはRubygemsで提供されているため、Rubyをインストールする必要があります。このへんはググってどうにかしてください。Linuxならパッケージマネージャにお尋ねすれば入れてくれるんじゃないですかね。MacはHomebrewでrbenvを入れてrbenvでrubyをインストールして...

Rubyがインストールできたら`gem install travis`で`travis`コマンドをインストールしましょう。

`travis`コマンドがインストールできたら、
- `travis login --auto`でログイン
- `travis init Node.js --node-js node`でTravis CIのもろもろを初期化
- `travis encrypt-file .ci-files/id_rsa` で`.ci-files/id_rsa`を暗号化
- 出力された`openssl`から始まるものをコピーして、`.travis.yml`の`script`に書く
```
script:
  - openssl aes-256-cbc -K $encrypted_xxxxxxxxxxxx_key -iv $encrypted_xxxxxxxxxxxx_iv -in id_rsa.enc -out .ci-files/id_rsa -d
  
```
  こんな感じで
- `.ci_files/id_rsa`を削除する

## Travis CIでの複合
さっきの<q>出力された`openssl`から始まるものをコピーして、`.travis.yml`の`script`に書く</q>のところで複合はできているので、あとは`~/.ssh/id_rsa`にコピーして`chmod 600 ~/.ssh/id_rsa`して`hexo deploy`するだけです。

gitの設定は自分名義にしたければやってください。