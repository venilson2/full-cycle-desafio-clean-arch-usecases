import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/customer.model";
import CustomerRepository from "../../../infrastructure/customer/customer.repository";
import FindCustomerUseCase from "./fin.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

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


  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer =  new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const input = {
      id: "123"
    }

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };

    const result = await usecase.execute(input);
    
    expect(result).toEqual(output);
  });
});