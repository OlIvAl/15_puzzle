import 'jest-localstorage-mock';
import 'jest-styled-components';
import 'enzyme-adapter-react-16';
import 'enzyme-to-json/serializer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });