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
