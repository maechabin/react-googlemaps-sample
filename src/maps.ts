import { Point, LineSymbol } from './googlemaps.model';

class Maps {
  /** Markerを表示する拠点リスト */
  points: Point[] = [
    { title: 'maker1', position: { lat: -25.363, lng: 131.044 } },
    { title: 'maker2', position: { lat: -32.397, lng: 20.044 } },
    { title: 'maker3', position: { lat: 34.397, lng: 25.044 } },
    { title: 'maker4', position: { lat: 48.397, lng: 90.044 } },
    { title: 'maker5', position: { lat: 29.32, lng: 135.9 } },
  ];

  /** ポリライン */
  line: google.maps.Polyline | null = null;

  public initMap(mapDiv: HTMLDivElement | null): void {
    /**
     * 地図を表示する際のオプション（初期表示）
     * Mapsのオプション一覧
     * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    /** 範囲（境界）のインスタンスを作成するクラス */
    const bounds = new google.maps.LatLngBounds();

    /** Mapオブジェクトに地図表示要素情報とオプション情報を渡し、インスタンス生成 */
    const map = new google.maps.Map(mapDiv, mapOptions); // <= refで取得した要素

    /** Markerを表示 */
    this.points.forEach(
      (point: Point): void => {
        /**
         * Markerを設定
         * Markerオプション
         * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
         */
        const marker = new google.maps.Marker({
          map,
          draggable: true, // ドラッグできるか
          opacity: 0.7, // 透明度
          position: point.position,
          title: point.title,
        });

        /** 位置情報を範囲に追加 */
        bounds.extend(marker.getPosition());

        /** 吹き出しを設定 */
        const infoWindow = new google.maps.InfoWindow({
          content: point.title,
        });

        /** クリック時の処理（吹き出し表示） */
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        /** マーカードラッグ時の処理（ポリラインのアップデート） */
        marker.addListener('dragend', (event: google.maps.MouseEvent) => {
          const title = point.title;
          this.points = this.points.map((point: Point) => {
            if (point.title === title) {
              return {
                ...point,
                position: {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                },
              };
            }
            return point;
          });

          this.initPolyLine(map);
        });
      },
    );

    /** すべてのMarkerを地図に収める */
    map.fitBounds(bounds);

    /** ポリラインを表示する */
    this.initPolyLine(map);
  }

  public initPolyLine(map: google.maps.Map): void {
    /**
     * 既存のポリラインを削除
     * https://developers.google.com/maps/documentation/javascript/examples/polyline-remove
     * */
    if (this.line !== null) {
      this.line.setMap(null);
    }

    /**
     * polyline上を動くシンボル
     * https://developers.google.com/maps/documentation/javascript/symbols#animate
     * */
    const lineSymbol: LineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: '#113345',
    };

    /** polylineを表示 */
    this.line = new google.maps.Polyline({
      path: this.points
        .map((point: Point) => {
          return point.position;
        })
        .concat([this.points[0].position]),
      icons: [
        {
          icon: lineSymbol,
          offset: '100%',
        },
      ],
      strokeColor: '#ccc',
      map,
    });

    /** ポリラインを表示 */
    this.line.setMap(map);

    /** アニメーションを実行 */
    this.animateCircle(this.line);
  }

  /**
   * シンボルをpolylineに沿ってアニメーションさせる
   * */
  private animateCircle(line: google.maps.Polyline): void {
    let count = 0;
    window.setInterval((): void => {
      count = (count + 1) % 200;

      const icons = line.get('icons');
      icons[0].offset = count / 2 + '%';
      line.set('icons', icons);
    }, 40);
  }
}

export default Maps;
