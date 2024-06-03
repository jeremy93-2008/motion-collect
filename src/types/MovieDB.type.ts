export interface IMovieDB {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface Movie {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    name: string
    original_language: string
    original_title: string
    overview: string
    description?: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface FullMovie {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    // @ts-ignore
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieJustWatch {
    id: number
    results: MovieJustWatchResults
}

export interface MovieJustWatchResults {
    AE: JustWatchEntry
    AG: JustWatchEntry
    AL: JustWatchEntry
    AO: JustWatchEntry
    AR: JustWatchEntry
    AT: JustWatchEntry
    AU: JustWatchEntry
    AZ: JustWatchEntry
    BA: JustWatchEntry
    BB: JustWatchEntry
    BE: JustWatchEntry
    BF: JustWatchEntry
    BG: JustWatchEntry
    BH: JustWatchEntry
    BO: JustWatchEntry
    BR: JustWatchEntry
    BS: JustWatchEntry
    BZ: JustWatchEntry
    CA: JustWatchEntry
    CH: JustWatchEntry
    CI: JustWatchEntry
    CL: JustWatchEntry
    CO: JustWatchEntry
    CR: JustWatchEntry
    CV: JustWatchEntry
    CZ: JustWatchEntry
    DE: JustWatchEntry
    DK: JustWatchEntry
    DO: JustWatchEntry
    EC: JustWatchEntry
    EE: JustWatchEntry
    EG: JustWatchEntry
    ES: JustWatchEntry
    FI: JustWatchEntry
    GB: JustWatchEntry
    GR: JustWatchEntry
    GT: JustWatchEntry
    HK: JustWatchEntry
    HN: JustWatchEntry
    HR: JustWatchEntry
    HU: JustWatchEntry
    ID: JustWatchEntry
    IE: JustWatchEntry
    IL: JustWatchEntry
    IN: JustWatchEntry
    IS: JustWatchEntry
    IT: JustWatchEntry
    JM: JustWatchEntry
    JO: JustWatchEntry
    JP: JustWatchEntry
    KR: JustWatchEntry
    LB: JustWatchEntry
    LC: JustWatchEntry
    LT: JustWatchEntry
    LU: JustWatchEntry
    LV: JustWatchEntry
    MD: JustWatchEntry
    ME: JustWatchEntry
    MK: JustWatchEntry
    ML: JustWatchEntry
    MU: JustWatchEntry
    MX: JustWatchEntry
    MY: JustWatchEntry
    MZ: JustWatchEntry
    NE: JustWatchEntry
    NI: JustWatchEntry
    NL: JustWatchEntry
    NO: JustWatchEntry
    NZ: JustWatchEntry
    OM: JustWatchEntry
    PA: JustWatchEntry
    PE: JustWatchEntry
    PG: JustWatchEntry
    PH: JustWatchEntry
    PL: JustWatchEntry
    PT: JustWatchEntry
    PY: JustWatchEntry
    RO: JustWatchEntry
    RS: JustWatchEntry
    SA: JustWatchEntry
    SE: JustWatchEntry
    SG: JustWatchEntry
    SI: JustWatchEntry
    SK: JustWatchEntry
    SN: JustWatchEntry
    SV: JustWatchEntry
    TC: JustWatchEntry
    TH: JustWatchEntry
    TT: JustWatchEntry
    TW: JustWatchEntry
    TZ: JustWatchEntry
    UA: JustWatchEntry
    UG: JustWatchEntry
    US: JustWatchEntry
    UY: JustWatchEntry
    VE: JustWatchEntry
    ZA: JustWatchEntry
    ZM: JustWatchEntry
    ZW: JustWatchEntry
}

export interface JustWatchEntry {
    link: string
    buy?: JustWatchEntryProvider[]
    rent?: JustWatchEntryProvider[]
    flatrate?: JustWatchEntryProvider[]
}

export interface JustWatchEntryProvider {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}

export interface FullTV {
    adult: boolean
    backdrop_path: string
    created_by: CreatedBy[]
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: any
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export interface CreatedBy {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
}

export interface Genre {
    id: number
    name: string
}

export interface LastEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
}

export interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface Season {
    air_date?: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}
