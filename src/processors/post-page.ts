import { EsaPostFiltered } from "./fetch-esa-posts";
import { templates } from "../templates";
import {promises as fs} from "fs"
import { OUTPUT_DIR } from "../config";

export async function processorPostPage(post: EsaPostFiltered) {
    const renderResult = templates.post({post: post})
    await fs.mkdir(`${OUTPUT_DIR}/articles/${post.slug}`, {recursive: true})
    await fs.writeFile(`${OUTPUT_DIR}/articles/${post.slug}/index.html`, renderResult)
    return `/articles/${post.slug}/index.html`
}