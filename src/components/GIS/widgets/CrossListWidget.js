import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';
import { getLines, getCrossAndSpanThings } from '../services/service';
class CrossListWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crossAndSpanThingsList: [],
    };
  }
  componentDidMount() {
    this.crossAndSpanThings();
  }
  closeWidget() {
    const { NSCEarth } = this.props;
    NSCEarth.widgetManager.removeWidget('CrossListWidget');
  }
  crossAndSpanThings() {
    const { crossAndSpanThingsList } = this.state;
    if (crossAndSpanThingsList.length === 0) {
      getLines().then(res => {
        let arr = [];
        let list = res.data;
        let len = list.length;
        if (list) {
          list.forEach((item, index) => {
            let data = getCrossAndSpanThings(item.linecode);
            Promise.all([data]).then(([res]) => {
              arr = arr.concat(res.data);
              len--;
              if (len === 0) {
                console.log(arr);
                this.setState({
                  crossAndSpanThingsList: arr,
                });
              }
            });
          });
        }
      });
    }
  }
  render() {
    return (
      <Card
        title="交叉跨越列表"
        size="small"
        extra={
          <Button
            shape="circle"
            icon="close"
            onClick={this.closeWidget.bind(this)}
          />
        }
        style={{ width: 300 }}
      >
        <div>交叉跨越列表</div>
      </Card>
    );
  }
}
const treeData = [
  {
    title: '电力线',
  },
  {
    title: '通信线',
  },
  {
    title: '公路',
  },
  {
    title: '铁路',
  },
  {
    title: '管道',
  },
  {
    title: '电缆',
  },
  {
    title: '河流',
  },
  {
    title: '电缆隧道',
  },
  {
    title: '综合管廊',
  },
  {
    title: '房屋',
  },
  {
    title: '林木区',
  },
];
export default CrossListWidget;
