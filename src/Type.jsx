import TypeIt from "typeit-react";

const TypeComponent = () => {
  return (
    <div className="App">
      <TypeIt
        options={{ loop: true }}
        as={"h1"}
        getBeforeInit={(instance) => {
          instance
            .type("I prefer exploring.")
            .pause(1500)
            .delete(10)
            .pause(1500)
            .type("learning.")
            .pause(1500)
            .move(-10)
            .pause(500)
            .delete(6)
            .pause(500)
            .type("pursue my")
            .move(10)
            .pause(1500)
            .delete(9)
            .pause(500)
            .type("passion.")
            .pause(3000);

          return instance;
        }}
        style={{
          fontSize: 'calc(1.5rem + 1vw)', // Adjust font size based on viewport width
          textAlign: 'center', // Center align the text
        }}
      />
    </div>
  );
};

export default TypeComponent;