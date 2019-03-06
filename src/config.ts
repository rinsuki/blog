import axios from "axios"
import path from "path"

export const ESA_TOKEN = process.env.ESA_TOKEN!
if (ESA_TOKEN == null) {
    throw "ESA_TOKEN is required."
}

export const ESA_TEAM = process.env.ESA_TEAM!
if (ESA_TEAM == null) {
    throw "ESA_TEAM is required."
}

export const esa = axios.create({
    baseURL: `https://api.esa.io/v1/teams/${ESA_TEAM}`,
    headers: {
        Authorization: `Bearer ${ESA_TOKEN}`,
    }
})

export const ESA_CATEGORY = process.env.ESA_CATEGORY!
if (ESA_CATEGORY == null) {
    throw "ESA_CATEGORY is required."
}

export const OUTPUT_DIR = process.env.OUTPUT_DIR || path.join(__dirname, "..", "public")
