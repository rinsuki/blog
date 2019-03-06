import jsdom from "jsdom"
import { esa, ESA_CATEGORY } from "../config";

const RE_CREATED_AT=/(\d+)\/(\d+)\/(\d+)$/.compile();

export type EsaPostFiltered = EsaPost & {
    created_at: string;
    slug: string;
    path: string;
}

function postsFilter(posts: EsaPost[]): EsaPostFiltered[] {
    var retPosts = []
    for (const post of posts) {
        console.log(post.category)
        const r = RE_CREATED_AT.exec(post.category)
        if (r == null) continue
        const document = new jsdom.JSDOM(post.body_md).window.document
        const originalId = document.querySelector("meta[name='original-id']") as HTMLMetaElement | null
        const slug = (originalId != null ? originalId.content : post.number).toString()
        retPosts.push({
            ...post,
            created_at: r[0],
            slug,
            path: "/articles/" + slug + "/",
        })
    }
    return retPosts
}

export async function fetchEsaPosts() {
    const postsReq = await esa.get<EsaPaginateResponse<"posts", EsaPost[]>>("posts", {
        params: {
            q: `in:"${ESA_CATEGORY}" wip:false`,
        },
    })
    return postsFilter(postsReq.data.posts)
}