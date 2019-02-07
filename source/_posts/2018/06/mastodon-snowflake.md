---
title: "メモ: MastodonのSnowflake IDからタイムスタンプを求める"
date: 2018-06-21 10:37:51
tags: 
  - memo
  - mastodon
---

MastodonのSnowflake ID(v2.0.0から投稿IDの生成に使われている)からタイムスタンプを求める方法について。**TwitterのSnowflakeとは別物**。

<!-- more -->

<https://github.com/tootsuite/mastodon/blob/master/lib/mastodon/snowflake.rb#L141-L146>

ここで処理が行なわれていて、

```js
unix_time_seconds = mastodon_snowflake_id / 65536 / 1000
```

で求められる。Twitterのsnowflakeと違ってmsec部分はただの乱数。