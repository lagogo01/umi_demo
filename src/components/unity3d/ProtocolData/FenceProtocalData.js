import Color from './Color';
import ProtocolDataPoint from './ProtocolDataPoint';
class FenceProtocalData {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.color = Color;
  }

  getColorInstance() {
    return new Color();
  }

  getPointInstance() {
    return [new ProtocolDataPoint()];
  }
}

export default FenceProtocalData;
