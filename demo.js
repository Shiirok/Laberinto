const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse
} = Matter; //we deconstruct what we need from the library

const width = 800;
const height = 600;

const engine = Engine.create(); //<= we have to declare an engine
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine, //<= we tell to our render the engine to use
  options: {
    width: width,
    height: height,
    wireframes: false
  }
});
Render.run(render); //<= now we have to run our render or our "world"
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
  })
);

//Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
]; //we have to specify rectangles on the borders, otherwise if our shapes are not static, they would fall off the world.

World.add(world, walls);

//Random Shapes
for (let i = 0; i < 40; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 60, 60)
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          fillStyle: "green"
        }
      })
    );
  }
}
