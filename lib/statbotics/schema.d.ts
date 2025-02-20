/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v3/": {
    /** Read Root */
    get: operations["read_root_v3__get"];
  };
  "/v3/year/{year}": {
    /**
     * Query a single year
     * @description Returns a single Year object. Requires a four-digit year, e.g. `2019`.
     */
    get: operations["read_year_v3_year__year__get"];
  };
  "/v3/years": {
    /** Query multiple years */
    get: operations["read_years_v3_years_get"];
  };
  "/v3/team/{team}": {
    /**
     * Query a single team
     * @description Returns a single Team object. Requires a team number (no prefix).
     */
    get: operations["read_team_v3_team__team__get"];
  };
  "/v3/teams": {
    /**
     * Query multiple teams
     * @description Returns up to 1000 teams at a time. Specify limit and offset to page through results.
     */
    get: operations["read_teams_v3_teams_get"];
  };
  "/v3/team_year/{team}/{year}": {
    /**
     * Query a single team year
     * @description Returns a single Team Year object. Requires a team number and year.
     */
    get: operations["read_team_year_v3_team_year__team___year__get"];
  };
  "/v3/team_years": {
    /**
     * Query multiple team years
     * @description Returns up to 1000 team years at a time. Specify limit and offset to page through results.
     */
    get: operations["read_team_years_v3_team_years_get"];
  };
  "/v3/event/{event}": {
    /**
     * Query a single event
     * @description Returns a single Event object. Requires an event key, e.g. `2019ncwak`.
     */
    get: operations["read_event_v3_event__event__get"];
  };
  "/v3/events": {
    /**
     * Query multiple events
     * @description Returns up to 1000 events at a time. Specify limit and offset to page through results.
     */
    get: operations["read_events_v3_events_get"];
  };
  "/v3/team_event/{team}/{event}": {
    /**
     * Query a single team event
     * @description Returns a single Team Event object. Requires a team number and event key, e.g. `5511` and `2019ncwak`.
     */
    get: operations["read_team_event_v3_team_event__team___event__get"];
  };
  "/v3/team_events": {
    /**
     * Query multiple team events
     * @description Returns up to 1000 team events at a time. Specify limit and offset to page through results.
     */
    get: operations["read_team_events_v3_team_events_get"];
  };
  "/v3/match/{match}": {
    /**
     * Query a single match
     * @description Returns a single Match object. Requires a match key, e.g. `2019ncwak_f1m1`.
     */
    get: operations["read_match_v3_match__match__get"];
  };
  "/v3/matches": {
    /**
     * Query multiple matches
     * @description Returns up to 1000 matches at a time. Specify limit and offset to page through results.
     */
    get: operations["read_matches_v3_matches_get"];
  };
  "/v3/team_match/{team}/{match}": {
    /**
     * Query a single team match
     * @description Returns a single Team Match object. Requires a team number and match key, e.g. `5511` and `2019ncwak_f1m1`.
     */
    get: operations["read_team_match_v3_team_match__team___match__get"];
  };
  "/v3/team_matches": {
    /**
     * Query multiple team matches
     * @description Returns up to 1000 team matches at a time. Specify limit and offset to page through results.
     */
    get: operations["read_team_matches_v3_team_matches_get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Read Root */
  read_root_v3__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /**
   * Query a single year
   * @description Returns a single Year object. Requires a four-digit year, e.g. `2019`.
   */
  read_year_v3_year__year__get: {
    parameters: {
      path: {
        year: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Query multiple years */
  read_years_v3_years_get: {
    parameters: {
      query?: {
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string | null;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean | null;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number | null;
        /** @description Offset from the first result to return. */
        offset?: number | null;
      };
    };
    responses: {
      /** @description Returns a list of Years since 2002. Older data is not available. */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query a single team
   * @description Returns a single Team object. Requires a team number (no prefix).
   */
  read_team_v3_team__team__get: {
    parameters: {
      path: {
        team: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query multiple teams
   * @description Returns up to 1000 teams at a time. Specify limit and offset to page through results.
   */
  read_teams_v3_teams_get: {
    parameters: {
      query?: {
        /** @description Capitalized country name, e.g. `USA` or `Canada`. */
        country?: string | null;
        /** @description Capitalized two-letter state code, e.g. `NC`. */
        state?: string | null;
        /** @description One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`] */
        district?: string | null;
        /** @description Whether the team has played in the last year. */
        active?: boolean | null;
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number;
        /** @description Offset from the first result to return. */
        offset?: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query a single team year
   * @description Returns a single Team Year object. Requires a team number and year.
   */
  read_team_year_v3_team_year__team___year__get: {
    parameters: {
      path: {
        team: number;
        year: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query multiple team years
   * @description Returns up to 1000 team years at a time. Specify limit and offset to page through results.
   */
  read_team_years_v3_team_years_get: {
    parameters: {
      query?: {
        /** @description Team number (no prefix), e.g. 5511. */
        team?: number | null;
        /** @description Four-digit year */
        year?: number | null;
        /** @description Capitalized country name, e.g. `USA` or `Canada`. */
        country?: string | null;
        /** @description Capitalized two-letter state code, e.g. `NC`. */
        state?: string | null;
        /** @description One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`] */
        district?: string | null;
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string | null;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean | null;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number | null;
        /** @description Offset from the first result to return. */
        offset?: number | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query a single event
   * @description Returns a single Event object. Requires an event key, e.g. `2019ncwak`.
   */
  read_event_v3_event__event__get: {
    parameters: {
      path: {
        event: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query multiple events
   * @description Returns up to 1000 events at a time. Specify limit and offset to page through results.
   */
  read_events_v3_events_get: {
    parameters: {
      query?: {
        /** @description Four-digit year */
        year?: number | null;
        /** @description Capitalized country name, e.g. `USA` or `Canada`. */
        country?: string | null;
        /** @description Capitalized two-letter state code, e.g. `NC`. */
        state?: string | null;
        /** @description One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`] */
        district?: string | null;
        /** @description One of [`regional`, `district`, `district_cmp`, `cmp_division`, or `cmp_finals`]. */
        type?: string | null;
        /** @description Week of the competition season. 8 is CMP */
        week?: number | null;
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string | null;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean | null;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number | null;
        /** @description Offset from the first result to return. */
        offset?: number | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query a single team event
   * @description Returns a single Team Event object. Requires a team number and event key, e.g. `5511` and `2019ncwak`.
   */
  read_team_event_v3_team_event__team___event__get: {
    parameters: {
      path: {
        team: number;
        event: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query multiple team events
   * @description Returns up to 1000 team events at a time. Specify limit and offset to page through results.
   */
  read_team_events_v3_team_events_get: {
    parameters: {
      query?: {
        /** @description Team number (no prefix), e.g. 5511. */
        team?: number | null;
        /** @description Four-digit year */
        year?: number | null;
        /** @description Event key, e.g. `2019ncwak`. */
        event?: string | null;
        /** @description Capitalized country name, e.g. `USA` or `Canada`. */
        country?: string | null;
        /** @description Capitalized two-letter state code, e.g. `NC`. */
        state?: string | null;
        /** @description One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`] */
        district?: string | null;
        /** @description One of [`regional`, `district`, `district_cmp`, `cmp_division`, or `cmp_finals`]. */
        type?: string | null;
        /** @description Week of the competition season. 8 is CMP */
        week?: number | null;
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string | null;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean | null;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number | null;
        /** @description Offset from the first result to return. */
        offset?: number | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query a single match
   * @description Returns a single Match object. Requires a match key, e.g. `2019ncwak_f1m1`.
   */
  read_match_v3_match__match__get: {
    parameters: {
      path: {
        match: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query multiple matches
   * @description Returns up to 1000 matches at a time. Specify limit and offset to page through results.
   */
  read_matches_v3_matches_get: {
    parameters: {
      query?: {
        /** @description Team number (no prefix), e.g. 5511. */
        team?: number | null;
        /** @description Four-digit year */
        year?: number | null;
        /** @description Event key, e.g. `2019ncwak`. */
        event?: string | null;
        /** @description Week of the competition season. 8 is CMP */
        week?: number | null;
        /** @description Whether the match is an elimination match. */
        elim?: boolean | null;
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string | null;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean | null;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number | null;
        /** @description Offset from the first result to return. */
        offset?: number | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query a single team match
   * @description Returns a single Team Match object. Requires a team number and match key, e.g. `5511` and `2019ncwak_f1m1`.
   */
  read_team_match_v3_team_match__team___match__get: {
    parameters: {
      path: {
        team: number;
        match: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Query multiple team matches
   * @description Returns up to 1000 team matches at a time. Specify limit and offset to page through results.
   */
  read_team_matches_v3_team_matches_get: {
    parameters: {
      query?: {
        /** @description Team number (no prefix), e.g. 5511. */
        team?: number | null;
        /** @description Four-digit year */
        year?: number | null;
        /** @description Event key, e.g. `2019ncwak`. */
        event?: string | null;
        /** @description Week of the competition season. 8 is CMP */
        week?: number | null;
        /** @description Match key, e.g. `2019ncwak_f1m1`. */
        match?: string | null;
        /** @description Whether the match is an elimination match. */
        elim?: boolean | null;
        /** @description How to sort the returned values. Any column in the table is valid. */
        metric?: string | null;
        /** @description Whether to sort the returned values in ascending order. Default is ascending */
        ascending?: boolean | null;
        /** @description Maximum number of events to return. Default is 1000. */
        limit?: number | null;
        /** @description Offset from the first result to return. */
        offset?: number | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
