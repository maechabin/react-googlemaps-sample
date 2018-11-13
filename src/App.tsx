import * as React from 'react';
import './App.css';

/** 取得するProps */
interface AppProps {
  google: any;
}

/** マーカーの情報 */
interface Point {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
}

class App extends React.Component<AppProps, any> {
  gmapsRef = React.createRef<HTMLDivElement>();

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount(): void {
    this.initMap();
  }

  initMap(): void {
    const { google } = this.props;
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
    const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

    /** Mapオブジェクトに地図表示要素情報とオプション情報を渡し、インスタンス生成 */
    const map: google.maps.Map = new google.maps.Map(this.gmapsRef.current, mapOptions); // <= refで取得した要素

    /** Markerを表示する拠点リスト */
    const points: Point[] = [
      { title: 'maker1', position: { lat: -25.363, lng: 131.044 } },
      { title: 'maker2', position: { lat: -34.397, lng: 11.044 } },
      { title: 'maker3', position: { lat: 34.397, lng: 25.044 } },
      { title: 'maker4', position: { lat: 24.397, lng: 90.044 } },
    ];

    /** Markerを表示 */
    points.forEach((point: Point) => {
      /**
       * Markerを設定
       * Markerオプション
       * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
       */
      const marker: google.maps.Marker = new google.maps.Marker({
        map,
        draggable: true, // ドラッグできるか
        opacity: 0.7, // 透明度
        title: point.title,
      });

      /** マーカーに位置情報をセット */
      marker.setPosition(point.position);

      /** 位置情報を範囲に追加 */
      bounds.extend(marker.getPosition());

      /** 吹き出しを設定 */
      const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({
        content: point.title,
      });

      /** クリックs時の処理設定（吹き出し表示） */
      marker.addListener(
        'click',
        (): void => {
          infoWindow.open(map, marker);
        },
      );
    });

    /** すべてのMarkerを地図に収める */
    map.fitBounds(bounds);
  }

  render(): JSX.Element {
    const Fragment = React.Fragment;
    const style1 = { width: '100vw', height: '100vh' } as React.CSSProperties;
    const style2 = {
      position: 'absolute',
      bottom: '32px',
      zIndex: 100,
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '24px',
    } as React.CSSProperties;

    return (
      <Fragment>
        <div ref={this.gmapsRef} style={style1}>
          Google Maps
        </div>
        <div style={style2}>
          <a
            href="https://github.com/maechabin/react-googlemaps-sample"
            target="_blank"
            rel="noopener noreferrer">
            maechabin/react-googlemaps-sample - GitHub
          </a>
        </div>
      </Fragment>
    );
  }
}

export default App;
