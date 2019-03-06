
interface EsaMiniUser {
    name: string
    screen_name: string
    icon: string
}

interface EsaPost {
    number: number
    name: string
    full_name: string
    wip: boolean
    body_md: string
    body_html: string
    created_at: string
    message: string
    url: string
    updated_at: string
    tags: string[],
    category: string,
    revision_number: number,
    created_by: EsaMiniUser,
    updated_by: EsaMiniUser,
}

type EsaPaginateResponse<Key extends string, ContainObject> = { [x in Key]: ContainObject } & {
    prev_page?: number;
    next_page?: number;
    total_count: number;
    page: number;
    per_page: number;
    max_per_page: number;
};
