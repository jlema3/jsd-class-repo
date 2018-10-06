class Car {
  constructor(model, color) {
    this.model = model;
    this.color = color;
    this.fuel = 100;
  }
  drive() {
    this.fuel -= 1;
    return 'Vroom!';
  }
  refuel() {
    this.fuel = 100;
  }
}
