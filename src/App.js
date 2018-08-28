import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.gmapsRef = React.createRef();
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    /**
     * 地図を表示する際のオプション（初期表示）
     * Mapsのオプション一覧
     * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    const mapOptions = {
      center: new this.props.google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: this.props.google.maps.MapTypeId.ROADMAP,
    };

    /** 範囲（境界）のインスタンスを作成するクラス */
    const bounds = new this.props.google.maps.LatLngBounds();

    /** Mapオブジェクトに地図表示要素情報とオプション情報を渡し、インスタンス生成 */
    const map = new this.props.google.maps.Map(this.gmapsRef.current, mapOptions); // <= refで取得した要素

    /** Markerを表示する拠点リスト */
    const points = [
      { title: 'maker1', position: { lat: -25.363, lng: 131.044 } },
      { title: 'maker2', position: { lat: -34.397, lng: 11.044 } },
      { title: 'maker3', position: { lat: 34.397, lng: 25.044 } },
      { title: 'maker4', position: { lat: 24.397, lng: 90.044 } },
    ];

    /** Markerを表示 */
    points.forEach((point) => {
      /**
       * Markerを設定
       * Markerオプション
       * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
       */
      const marker = new this.props.google.maps.Marker({
        position: point.position,
        map,
        draggable: true, // ドラッグできるか
        opacity: 0.7, // 透明度
        title: point.title,
      });

      /** 位置情報を範囲に追加 */
      bounds.extend(marker.position);

      /** 吹き出しを設定 */
      const infowindow = new this.props.google.maps.InfoWindow({
        content: point.title,
      });

      /** クリックs時の処理設定（吹き出し表示） */
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    });

    /** すべてのMarkerを地図に収める */
    map.fitBounds(bounds);
  }

  render() {
    const style = {
      position: 'absolute',
      bottom: '32px',
      zIndex: 100,
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '24px',
    };

    return [
      <div ref={this.gmapsRef} style={{ width: '100vw', height: '100vh' }}>
        Google Maps
      </div>,
      <div style={style}>
        <a href="https://github.com/maechabin/react-googlemaps-sample" target="_blank">
          maechabin/react-googlemaps-sample - GitHub
        </a>
      </div>,
    ];
  }
}

export default App;
