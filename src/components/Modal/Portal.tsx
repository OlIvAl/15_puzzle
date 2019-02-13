import React, {CSSProperties} from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

interface IProps {

}

export default
class Portal extends React.Component<IProps> {
  el: HTMLDivElement;

  constructor(props: IProps) {
    super(props);

    this.el = document.createElement('div');
    this.el.style.position = 'fixed';
    this.el.style.top = '0';
    this.el.style.left = '0';
    this.el.style.width = '100%';
    this.el.style.height = '100vh';
    this.el.style.display = 'flex';
    this.el.style.justifyContent = 'center';
    this.el.style.alignItems = 'center';
  }

  componentDidMount() {
    (modalRoot as HTMLDivElement).appendChild(this.el);
  }

  componentWillUnmount() {
    (modalRoot as HTMLDivElement).removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}