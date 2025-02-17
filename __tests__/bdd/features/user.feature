Feature: User Management

  Scenario: Create a new user
    Given I have user data
    When I send a POST request to create a user
    Then the response status code for creating a user should be 201
    And the response should contain the created user

 	Scenario: Get user by ID
    Given I have an existing user ID for retrieval
    When I send a GET request to get the user by ID
    Then the response status code for getting a user by identifier should be 200
    And the response should contain the user data

  Scenario: Get user by email
    Given I have an existing user email
    When I send a GET request to get the user by email
    Then the response status code for getting a user by email should be 200
    And the response should contain the user data

  Scenario: List all users
    Given there are users in the system
    When I send a GET request to list all users
    Then the response status code for listing users should be 200
    And the response should contain a list of users

	Scenario: Update an existing user
    Given I have existing user data
    When I send a PUT request to update the user
    Then the response status code for updating a user should be 200
    And the response should contain the updated user

	Scenario: Delete an existing user
    Given I have an existing user ID for deletion
    When I send a DELETE request to delete the user
    Then the response status code for deleting a user should be 204