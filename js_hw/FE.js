const horse = {
  name: "적토마",
  age: 3,
  rider: null,
};
const person = {
  name: "아기사자",
  age: 13,
};

horse.rider = person;

horse.introduction = function () {
  console.log("Hi! My name is " + this.name, "Hi! My age is" + this.age);
};

person.introduction = function () {
  console.log("Hi! My name is " + this.name, "Hi! My age is" + this.age);
};
horse.introduction();
person.introduction();
