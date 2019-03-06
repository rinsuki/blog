import { esa, ESA_CATEGORY, OUTPUT_DIR } from "./config";
import { processStaticFiles } from "./processors/static-files";
import { fetchEsaPosts } from "./processors/fetch-esa-posts";
import { processorPostPage } from "./processors/post-page";

// カテゴリ内のやつを取ってくる

Promise.all([
    processStaticFiles(),
    fetchEsaPosts().then(posts => Promise.all([
        Promise.all(posts.map(processorPostPage))
    ])).then(results => ([] as Array<string>).concat(...results))
] as Promise<string[]>[])
.then(p => ([] as Array<string>).concat(...p))
.then(p => {
    console.log(p)
}).catch(e => {
    console.error(e)
    process.exit(1)
})
