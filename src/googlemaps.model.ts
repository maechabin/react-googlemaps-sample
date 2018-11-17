export interface GoogleMaps {
  google: {
    maps: {
      InfoWindow: {
        new (opts?: google.maps.InfoWindowOptions): google.maps.InfoWindow;
      };
      Map: {
        new (mapDiv: Element | null, opts?: google.maps.MapOptions): google.maps.Map;
      };
      MapTypeId: google.maps.MapTypeId;
      Marker: {
        new (opts?: google.maps.MarkerOptions): google.maps.Marker;
      };
      LatLngBounds: {
        new (
          sw?: google.maps.LatLng | google.maps.LatLngLiteral,
          ne?: google.maps.LatLng | google.maps.LatLngLiteral,
        ): google.maps.LatLngBounds;
      };
      LatLng: {
        new (lat: number, lng: number, noWrap?: boolean): google.maps.LatLng;
      };
      Polyline: {
        new (opts?: google.maps.PolylineOptions): google.maps.Polyline;
      };
      SymbolPath: google.maps.SymbolPath;
    };
  };
}

/** マーカーの情報 */
export interface Point {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
}

/** ライン上を動くシンボル */
export interface LineSymbol {
  path: google.maps.SymbolPath;
  scale: number;
  strokeColor: string;
}
