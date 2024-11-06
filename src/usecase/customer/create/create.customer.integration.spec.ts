import { Sequelize } from "sequelize-typescript";
import CreateCustomerUseCase from "./create.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/customer.model";
import CustomerRepository from "../../../infrastructure/customer/customer.repository";

describe("Integration test create customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});