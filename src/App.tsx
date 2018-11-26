import * as React from 'react';
import Map from './maps';

class App extends React.Component<any, any> {
  /** mapを表示する要素 */
  readonly gmapsRef = React.createRef<HTMLDivElement>();

  /** Mapのインスタンスを生成 */
  readonly map = new Map();

  componentDidMount(): void {
    /** コンポーネントがマウントされたらMapを表示する */
    this.map.initMap(this.gmapsRef.current);

    /** Map上にマーカーを表示する */
    this.map.initMarker();

    /** Map上にポリラインを表示する */
    this.map.initPolyLine();
  }

  render(): JSX.Element {
    const Fragment = React.Fragment;
    const style1 = { width: '100%', height: '90vh' } as React.CSSProperties;
    const style2 = {
      paddingTop: '16px',
      textAlign: 'center',
      width: '100%',
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
