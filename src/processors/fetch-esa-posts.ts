import jsdom from "jsdom"
import { esa, ESA_CATEGORY } from "../config";

const RE_CREATED_AT=/(\d+)\/(\d+)\/(\d+)$/.compile();

export type EsaPostFiltered = EsaPost & {
    created_at: string;
    slug: string;
    path: string;
    excerpt?: string;
}

function postsFilter(posts: EsaPost[]): EsaPostFiltered[] {
    var retPosts = []
    for (const post of posts) {
        console.log(post.category)
        const r = RE_CREATED_AT.exec(post.category)
        if (r == null) continue
        const document = new jsdom.JSDOM(post.body_html).window.document
        document.body.querySelectorAll("[data-sourcepos]").forEach(e => {
            delete (e as HTMLElement).dataset.sourcepos
        })
        const body_html = document.body.innerHTML

        const originalId = new jsdom.JSDOM(post.body_md).window.document.querySelector("meta[name='original-id']") as HTMLMetaElement | null
        const slug = (originalId != null ? originalId.content : post.number).toString()
        const excerpt = body_html.includes("<!-- more -->") ? body_html.slice(0, body_html.indexOf("<!-- more -->")) : undefined

        retPosts.push({
            ...post,
            body_html,
            created_at: r[0],
            slug,
            path: "/articles/" + slug + "/",
            excerpt,
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