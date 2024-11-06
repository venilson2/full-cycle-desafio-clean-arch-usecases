import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
    });
  }

  async update(entity: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
}