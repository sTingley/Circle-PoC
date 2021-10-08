Feature: END can move funds into a blockchain address provided within Circle
	As END
	I want to move funds from an external blockchain address to a Circle blockchain address
	So that I can make future payouts to customers

	Scenario: Circle Master Account receives payment in crypto
    Given END's Circle Account has a blockchain wallet created
		And END's Circle blockchain wallet has a deposit address
    And we know the initial END Circle blockchain account balance
    When END receives a $333 payment in crypto
    Then the END Circle Account crypto account balance should increase by $333 in crypto
