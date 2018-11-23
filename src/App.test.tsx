/// <reference types="@types/jest" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import { any } from 'prop-types';

(window as any).google = {
  maps: {
    InfoWindow: class {},
    LatLng: class {},
    LatLngBounds: class {
      extend() {}
    },
    Map: class {
      initMap() {}
      fitBounds() {}
    },
    Marker: class {
      getPosition() {}
      addListener() {}
    },
    Polyline: class {},
    MapTypeId: any,
    SymbolPath: any,
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('componentDidMount', () => {
  // setup
  const component = mount(<App />);
  const initMapSpy = jest.spyOn((component as any).map, 'initMap');

  // exercise
  (component as any).instance().componentDidMount();

  // verify
  expect(initMapSpy).toHaveBeenCalled();
});
