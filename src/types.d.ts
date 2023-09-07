export interface Genre {
  id: number;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  images: {
    backdrops: Image[];
    logos: Image[];
    poster: Image[];
  };
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: ProductionCountry[];
  recommendations: {
    page: number;
    results: MovieListResult[];
    total_pages: number;
    total_results: number;
  };
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: Video[];
  };
  vote_average: number;
  vote_count: number;
};

export type MovieDetailsWithCredits = MovieDetails & {
  credits: MovieCredits;
  videos: { results: Video[] };
  images: MovieImages;
};

type Cast = {
  adult: boolean;
  release_date: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: string;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieImages {
  backdrops: Image[];
  posters: Image[];
}

export interface MovieListResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieList {
  page: number;
  results: MovieListResult[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}

export type imgSizes = BackdropSizes | logoSizes | posterSizes | profileSizes;

type imgType =
  | { type: "backdrop"; size: BackdropSizes }
  | { type: "logo"; size: logoSizes }
  | { type: "profile"; size: profileSizes }
  | { type: "poster"; size: posterSizes }
  | { type: "still"; size: stillSizes };

export type BackdropSizes = "w300" | "w780" | "w1280" | "original";

export type logoSizes =
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w500"
  | "original";
export type posterSizes =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export type profileSizes = "w45" | "w185" | "h632" | "original";

export type stillSizes = "w92" | "w185" | "w300" | "original";

export type PersonDetails = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
};

export type MovieCredits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
export type MovieCreditsCast = {
  adult: boolean;
  backdrop_path: string | null;
  character: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  order: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type PersonDetailsMovieCredits = {
  id: number;
  cast: MovieCreditsCast[];
  crew: Crew[];
};
