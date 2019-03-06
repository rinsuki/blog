import pug from "pug"
import path from "path"

export const templates = {
    index: pug.compileFile(path.join(__dirname, "..", "layout", "index.pug")),
    post: pug.compileFile(path.join(__dirname, "..", "layout", "post.pug")),
}
