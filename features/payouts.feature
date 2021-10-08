Feature: END can payout from a single Circle account to multiple recipients
	As END
	I want to wire funds from the END Circle Account to multiple Investor Bank Accounts
	So that I can pay them when they want to remove their Investment

	Scenario: Circle Master Account initiates payout to multiple Investor Bank Accounts
    Given 3 Investor Bank Accounts are linked to END's Circle Account
    And we know the initial END Circle Account balance
    When END initiates a $100 payout to each of the 3 Investor Bank Accounts
    Then the END Circle Account balance should be $300 less than the initial balance
	