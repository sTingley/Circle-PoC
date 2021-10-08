Feature: END can move funds into a blockchain address provided within Circle
	As END
	I want be able to receive funds from an external blockchain address to a Circle blockchain address
	So that I can make payouts from the Circle blockchain addresses

	Scenario: Circle Master Account receives payment in crypto
    Given ENDs Circle Account has a blockchain wallet created
		And ENDs Circle blockchain wallet has a deposit address
    And The initial END Circle blockchain account balance is known
    When END receives a $1 payment of USDC
    Then ENDs Circle Account crypto account balance should increase by $1
