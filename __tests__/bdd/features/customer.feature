Feature: Customer Management

  Scenario: Create a new customer
    Given I have customer data
    When I send a POST request to create a customer
    Then the response status code for creating a customer should be 201
    And the response should contain the created customer

  Scenario: Get customer by ID
    Given I have an existing customer ID for retrieval
    When I send a GET request to get the customer by ID
    Then the response status code for getting a customer by ID should be 200
    And the response should contain the customer data

  Scenario: Get customer by CPF
    Given I have an existing customer CPF for retrieval
    When I send a GET request to get the customer by CPF
    Then the response status code for getting a customer by CPF should be 200
    And the response should contain the customer data

  Scenario: List all customers
    Given there are customers in the system
    When I send a GET request to list all customers
    Then the response status code for listing customers should be 200
    And the response should contain a list of customers

  Scenario: Delete an existing customer
    Given I have an existing customer ID for deletion
    When I send a DELETE request to delete the customer
    Then the response status code for deleting a customer should be 200