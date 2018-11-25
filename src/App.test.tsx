/// <reference types="@types/jest" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';
import App from './App';

import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

jest.mock('./maps', () => {
  return jest.fn().mockImplementation(() => {
    return {
      initMap: jest.fn(),
    };
  });
});

beforeEach(() => {
  (window as any).google = {
    maps: {
      InfoWindow: class {},
      LatLng: class {},
      LatLngBounds: class {
        extend() {}
      },
      Map: class {
        fitBounds() {}
      },
      Marker: class {
        getPosition() {}
        addListener() {}
      },
      Polyline: class {},
      MapTypeId: '',
      SymbolPath: '',
    },
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('componentDidMount', () => {
  // setup
  const app = new App('', '');
  const initMapSpy = jest.spyOn(app.map, 'initMap');

  // exercise
  app.componentDidMount();

  // verify
  expect(initMapSpy).toHaveBeenCalled();
  expect(initMapSpy).toHaveBeenCalledWith(app.gmapsRef.current);
});
