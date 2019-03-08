import { EsaPostFiltered } from "./fetch-esa-posts";
import { processorIndexPage } from "./index-page";

export async function processorTagPage(posts: EsaPostFiltered[]) {
    var tagDic = {} as {[key: string]: EsaPostFiltered[]}
    for (const post of posts) {
        for (const tag of post.tags) {
            if (tagDic[tag] == null) tagDic[tag] = []
            tagDic[tag].push(post)
        }
    }
    return await Promise.all(Object.entries(tagDic).map(([tag, posts]) => {
        return processorIndexPage(`tags/${tag}`, posts, {tag})
    })).then(r => ([] as Array<string>).concat(...r))
}