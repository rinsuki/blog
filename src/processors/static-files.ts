import path from "path"
import stylus from "stylus"
import {promises as fs} from "fs"
import glob from "glob"
import { OUTPUT_DIR } from "../config";

export async function processStaticFiles(): Promise<string[]> {

    const staticSrc = path.join(__dirname, "..", "..", "static")

    type ProcessObj = {
        [key: string]: [string, (path: string) => Promise<string>] | "black-hole" | undefined
    }
    const processRules: ProcessObj = {
        styl: ["css", async (path) => {
            const content = await fs.readFile(path)
            return stylus(content.toString("UTF-8"))
                .set("filename", path)
                .render()
        }],
        sh: "black-hole",
    }

    var files = []

    for (const file of glob.sync(path.join(staticSrc, "**", "*.*"))) {
        const name = file.replace(staticSrc, "")
        await fs.mkdir(`${OUTPUT_DIR}/static/${path.dirname(name)}`, {recursive: true})
        const p = processRules[path.extname(file).replace(".", "")]
        if (Array.isArray(p)) {
            const outFile = name.replace(path.extname(name), `.${p[0]}`)
            await fs.writeFile(`${OUTPUT_DIR}/static/${outFile}`, await p[1](file))
            files.push(path.join("/static/", outFile))
        } else if (p == null) {
            await fs.copyFile(file, `${OUTPUT_DIR}/static/${name}`)
            files.push(path.join("/static", name))
        }
    }
    return files
}