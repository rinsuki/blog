---
title: 1周年を迎えたiMastのこれまでとこれから
date: 2018-12-24 09:00:00
tags:
  - mastodon
  - iMast
  - release
  - info
---

この記事は[Mastodon Advent Calendar 2018 - Qiita](https://qiita.com/advent-calendar/2018/mastodon)の24日目の記事です。若干遅くなりすみません。
ちなみに去年のMastodonアドベントカレンダーで書いた記事はこちら。 <http://rinsuki.hatenablog.jp/entry/2017/12/01/001743>

今日の9:00にiMast 3.1がリリースされます。一応[イヴ・サンタクロース](https://dic.nicovideo.jp/a/%E3%82%A4%E3%83%B4%E3%83%BB%E3%82%B5%E3%83%B3%E3%82%BF%E3%82%AF%E3%83%AD%E3%83%BC%E3%82%B9)さんの誕生日合わせというつもりです。パッチノートはGitHub <https://github.com/cinderella-project/iMast/releases/tag/3.1b93> を参照してください。

さて、この記事ではiMastのこれまでを振り返り、またこれからやりたいことを書いていきます。

<!-- more -->

# そもそもiMastって何よ

iMastは、iOSデバイス(iPhone/iPad/iPod touch)上で動くMastodonクライアントです。
App Storeは[こちら](https://itunes.apple.com/jp/app/imast/id1229461703?mt=8)。
iPhone 5sのような小さい端末でもタイムラインに投稿がたくさん出せること、β版の更新がわりとあること(AppStore版は…)、何かそのへんに開発者がいること、Siri Shortcutsからの投稿(v3.1〜)やiOSの「今日」ウィジェットからの投稿などのユニークな点が取り柄だと思っていますが、ユーザーがなぜiMastを利用しているのかはわかりません。

# iMastのこれまで

開発最初期〜去年末のことは去年のアドベントカレンダーの記事 <http://rinsuki.hatenablog.jp/entry/2017/12/01/001743>で語っているので省略します。
いまだにライセンスが決まっていないのはApp Store側とのいろいろな兼ね合いの影響です…

## iMast 2.8リリース

iMast 2.8では、表でもわりと更新がありましたが、裏でもいろいろやっていました。

- 複数枚画像添付ができるようになりました。って今リリースノート見たらApp Store版に書き忘れてたっぽいですね…
あのUIは、iPadで二重にPopoverを出すために苦労した思い出があります(結局あれは透明なViewControllerを一層重ねている)。
が、あのUIも横画面だとベストではないとは思っているので、近々<sup>[いつ?]</sup>手を入れたいと思っています。
- Swiftを3.2から4にアップデートし、Codable (JSON等をネイティブのクラスにマッピングする仕組み)を利用し始めました。
当時は大変でしたが、その後の楽さを考えるとあの時やっておいてよかったと思います。

## 〜iMast 3.0リリース

一周年記念であるiMast 3.0のリリースが2018年8月10日、私の愛する渋谷凛さんの誕生日でありかつiMastのAppStore初期バージョン(2.0)のリリース日からちょうど一年の日にリリースされました。
本当はiMast 3.0ではやりたいことがもっとたくさんあったのですが、様々な都合(マシンのストレージが遅くてやる気が出ないなど)で実現するのが間に合わず、理想ではない形でリリースすることになってしまい非常に微妙な気持ちです(今は4.0でやろうといろいろ考えていますが、それも微妙なところです 🤔)。
ですが、プッシュ通知等の最低限欲しかった機能は3.0に積めたので、非常にいいアップデートになったと思っています。

##  〜iMast 3.1リリース

バージョン番号で見ればたったの0.1ですし、更新内容的にもそんなにでかいのはありませんが(検索機能と英語対応と新HTMLパーサーぐらい?)、開発環境は大きく変わりました。
まず、開発マシンが HDD の Mac mini から NVMe SSD を積んだ Macbook Pro になり開発効率が大幅に上がった上、持ち運びが可能になったので[イベント会場などでライブコーディングをした後β版をビルドし配布](https://github.com/cinderella-project/iMast/releases/tag/3.1b70)などということもできるようになりました(最近は年末だからか App Store Connect のビルドの処理が遅いので配布までは厳しそうですが...)。

また、3.1のβ終盤から、Macbook Pro の参戦により使われなくなった Mac mini によって一日一回**JSTでの**朝7時ごろにnightly buildを回すようになり、

- 開発者: ビルドを手動で回す必要がなくなる、
- βテスター: 開発者が実装した変更をはやめに受け取れる (最新のビルドがぶっ壊れた時はTestFlightの仕組みで90日以内のビルドなら自由にダウングレードできる)

という利点が生まれました。

また、Mastodonにもアカウントを作り <https://mstdn.rinsuki.net/@imast_ios_nightly_build> 、nightly buildが成功/失敗したり、そもそも変更がなくてnightly buildが行われなかったときにトゥートするようにしています。
これにより、βテスターの「この前までは毎日来てたのに今日は来てないなあ、なんでだろう」といったようなモヤモヤを晴らせたらいいと思っています(実際に晴れてるかは知らない)。

(Q. 朝7時ってnightではないのでは A. 開発者はJSTではない独自タイムゾーンで生きているので、JST 07:00 はnight)

# iMastのこれから

## 3.2に向けて?

現時点では何をするか決まっていませんが、恐らく細々とした変更や機能追加を含んだアップデートのiMast 3.2を年度が変わる前後あたりまでにリリースしたいと思っています(もしかしたら平成ギリギリになるかも)。
もしかしたらPleroma特有の挙動への対応も入るかも?

## その先の4.0に向けて

4.0では、本来3.0でやるつもりだったUIのリニューアルをしたいと考えています。
iMastの最初期からある現在の「4タブ(HTL+通知+LTL+その他)+アカウント変更」では様々な不便な点も見えてきたので、いろいろ手を入れたいと考えてはいますが、iMastの他にもやりたいことはありますし、その辺も考えると4.0に間に合うかも微妙なところだと思っています。間に合ったらいいなぐらいの気持ちでいてください。

# おわりに

ここまでお読みいただきありがとうございました。iMastはこれからもMastodonと共に進化を続けていくつもりです。
基本的にiMastには私が使う機能しか実装されていませんが、もしこれ欲しい〜という機能がありましたら [@rinsuki@mstdn.rinsuki.net](https://mstdn.rinsuki.net/@rinsuki) もしくは [@imast_ios@mstdn.rinsuki.net](https://mstdn.rinsuki.net/@imast_ios) までリプライを飛ばしてみてください(期待はしないでください)。

明日はいよいよ最終日、なんかめっちゃ書いててえらい [@S_H_@gamelinks007.net](https://gamelinks007.net/@S_H_) さんです。