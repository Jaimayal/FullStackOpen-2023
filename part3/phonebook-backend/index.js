require("dotenv").config();
const Person = require("./models/Person");
const morgan = require("morgan");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((entries) => {
      response.send(entries);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      console.log(person);
      if (person) {
        response.send(person);
      }

      response.status(404).send({
        error: "Person was not found",
      });
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Person.find({})
    .then((entries) => {
      response.send(`
    				<p>Phonebook has info for ${entries.length}</p>
    				<p>${new Date()}</p>
				`);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const entry = request.body;
  if (!entry) {
    return response.status(400).send({
      error: "You must include an entry",
    });
  }

  if (!entry.name) {
    return response.status(400).send({
      error: "Name cannot be empty",
    });
  }

  if (!entry.number) {
    return response.status(400).send({
      error: "Number cannot be empty",
    });
  }

  const toSave = new Person({
    name: entry.name,
    number: entry.number,
  });

  toSave
    .save()
    .then((result) => {
      response.status(201).send("The person was saved successfully");
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      response.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndUpdate(id, { number: body.number }, { new: true })
    .then((result) => {
      response.send(result);
    })
    .catch((error) => next(error));
});

const errorMiddleware = (error) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({
      error: error.message,
    });
  }

  next(error);
};

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
