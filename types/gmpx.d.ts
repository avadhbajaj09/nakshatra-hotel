// Type declarations for Google Maps Platform Extended Component Library web components
// https://github.com/googlemaps/extended-component-library

declare namespace JSX {
  interface IntrinsicElements {
    "gmpx-api-loader": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        key?: string;
        "solution-channel"?: string;
      },
      HTMLElement
    >;
    "gmpx-split-layout": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "row-layout-min-width"?: string;
      },
      HTMLElement
    >;
    "gmpx-icon-button": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        variant?: string;
      },
      HTMLElement
    >;
    "gmp-map": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        center?: string;
        zoom?: string;
        "map-id"?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
    "gmp-advanced-marker": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        position?: string;
      },
      HTMLElement
    >;
  }
}
