Feature: END can payout from a single Circle account to multiple recipients
	As END
	I want to wire funds from the END Circle Account to multiple Recipient Bank Accounts
	So that I can make future payouts to customers

	Scenario: Circle account 12345 initiates multi partner distribution 
    And all distribution targets have existing accounts
    And there are greater funds in  account 12345 then the total in the distribution request
    When the Actor starts a thing
    Then Circle account 12345 balance is less 250.00
