class ProtocolDataPoint {
  constructor(id, name, x, y, z, date, style, warning) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
    this.date = date;
    this.style = style;
    this.warning = warning;
  }
}

export default ProtocolDataPoint;
