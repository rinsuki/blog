import { EsaPostFiltered } from "./fetch-esa-posts";
import { templates } from "../templates";
import { promises as fs } from "fs"
import { OUTPUT_DIR } from "../config";

export async function processorIndexPage(prefix_: string, posts: EsaPostFiltered[], external_options = {}) {
    const postsInOnePage = 10
    const pageCount = Math.ceil(posts.length / postsInOnePage)

    function getPagePath(page: number) {
        return page === 1 ? "" : `page/${page}/`
    }

    const prefix = prefix_ !== "" ? prefix_  + "/" : ""
    
    var files = []
    for(var pagePrefix=0; pagePrefix < posts.length; pagePrefix += postsInOnePage) {
        const page = Math.floor(pagePrefix / postsInOnePage) + 1
        const path = `/${prefix}${getPagePath(page)}`
        const renderResult = templates.index({
            ...external_options,
            posts: posts.slice(pagePrefix, pagePrefix + postsInOnePage),
            page: {
                current_url: path,
                current: page,
                total: pageCount,
                prev_link: `/${prefix}${getPagePath(page - 1)}`,
                next_link: `/${prefix}${getPagePath(page + 1)}`,
            }
        })
        const outDir = `${OUTPUT_DIR}${path}`
        await fs.mkdir(outDir, {recursive: true})
        await fs.writeFile(`${outDir}index.html`, renderResult)
        files.push(`${path}index.html`)
    }
    return files
}