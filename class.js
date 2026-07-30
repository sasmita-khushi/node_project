class Car {
  static numberOfWheel = 4; //static property does not go to instance myCar
  constructor(name, age) {
    //special method in a class it executes automatically when we make a instance
    this.name = name;
    this.name = age;
  }

  run() {
    console.log("car is running");
  }
}

let myCar = new Car("maruti", 30);
//console.log(myCar);

myCar.run();

class Vehicle extends Car {
  constructor(type, brand) {
    super("Vehicle");
    this.type = type;
    this.brand = brand;
  }
}

let vehicle = new Vehicle("Car", "Honda");

vehicle.run();
