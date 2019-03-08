import { esa, ESA_CATEGORY, OUTPUT_DIR } from "./config";
import { processStaticFiles } from "./processors/static-files";
import { fetchEsaPosts } from "./processors/fetch-esa-posts";
import { processorPostPage } from "./processors/post-page";
import { processorIndexPage } from "./processors/index-page";
import { processorTagPage } from "./processors/tag-page";

Promise.all([
    // 静的リソースの処理
    processStaticFiles(),
    // 取得して…
    fetchEsaPosts().then(posts => Promise.all([
        // 個別ページの処理
        Promise.all(posts.map(processorPostPage)),
        // index
        processorIndexPage("", posts),
        // タグページ
        processorTagPage(posts),
    ])).then(results => ([] as Array<string>).concat(...results))
] as Promise<string[]>[])
.then(p => ([] as Array<string>).concat(...p))
.then(p => {
    console.log(p)
}).catch(e => {
    console.error(e)
    process.exit(1)
})
