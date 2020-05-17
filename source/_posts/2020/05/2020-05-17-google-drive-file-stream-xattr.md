---
title: Google Drive File Stream 内のファイルIDを取る
date: 2020-05-17 09:23:48
tags:
  - memo
  - GoogleDrive
  - GoogleDriveFileStream
---

Google Drive File Stream でマウントされるファイルに対して `xattr -p user.drive.ほげふが /Volumes/GoogleDrive/path/to/file` をすると、Google Drive上のファイルIDが取れたりする。

まあ要はstackoverflowのこれ <https://stackoverflow.com/q/51439810> なんだけど、これは実は Google Colaboratory <https://colab.research.google.com> でも使える。

ただし、Google Colabolatory 環境には `xattr` コマンドが入っていないので、`apt install xattr` で入れる必要がある。
入れてしまえさえすればMac環境と同じように見える。

<!-- more -->

![](https://cloud-ng.rinsuki.net/mstdn-rinsuki-net/media_attachments/files/000/503/449/original/cec027ca688d4f27.png)

で、例えば Web で開かせたい時には `echo https://drive.google.com/file/d/$(xattr -p user.drive.id /path/to/file)/view` とかやればよい。

ちなみにプロパティ一覧は GDFS のバイナリをstringsして`user.drive.`でgrepをかけると出てくる。`xattr`で一覧を出そうとしても出てこないっぽいので注意。

参考までに手元の環境↓

```
$ strings /Applications/Google\ Drive\ File\ Stream.app/Contents/MacOS/Google\ Drive\ File\ Stream | grep user.drive
user.drive.gdoc
user.drive.id
user.drive.email
user.drive.team_drive_id
user.drive.pinned
user.drive.can_manage_team_drive_members
user.drive.mime_type
user.drive.thumbnail
user.drive.
user.drive.md5
user.drive.uncommitted
user.drive.itemprotostr
user.drive.is_virtual_folder
user.drive.progress
user.drive.shortcut.target.stableid
user.drive.stableid
```

例えば `user.drive.uncomitted` はアップロードが完了してないと `1` 、アップロードが完了すると `0` が返ったりする。

便利。

