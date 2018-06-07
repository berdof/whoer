import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Input} from 'antd';

import './ModalAddTranslation.css';

export default class ModalAddTranslation extends Component {
  static propTypes = {
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeModalInputText: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    snippet: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    actionType: PropTypes.oneOf(['add', 'edit']).isRequired,
  };

  constructor(props) {
    super(props);
    this.onChangeName = this.props.onChangeModalInputText.bind(this, 'name');
    this.onChangeSnippet = this.props.onChangeModalInputText.bind(this, 'snippet');
  }

  render() {
    const {
      props: {
        visible,
        onOk,
        onCancel,
        snippet,
        name,
        actionType
      }
    } = this;

    const title = actionType === 'edit' ? 'Давай изменим запись, окей' : 'Давай создадим новый перевод';

    return (
        <Modal title={title}
               wrapClassName="vertical-center-modal"
               okText="Сохранить"
               cancelText="Скрыть"
               visible={visible}
               onOk={onOk}
               onCancel={onCancel}>
          {actionType === 'add' && <div className="row">
            <Input placeholder="Name"
                   value={name}
                   onChange={this.onChangeName}/>
          </div>}
          <div className="row">
            <Input placeholder="Snippet"
                   value={snippet}
                   onChange={this.onChangeSnippet}/>
          </div>
        </Modal>
    );
  }
}
