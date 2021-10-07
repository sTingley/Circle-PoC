Feature: END can move funds from a Bank Account to the Circle Master Wallet
	As END
	I want to move funds from a Bank Account to the Circle Master Wallet
	So that I can make future payouts to customers

	Scenario: Circle Master Wallet funded by Wire Transfer
		Given I have a valid Circle Master Wallet
		When I wire $100 from a Bank Account
		Then the Circle Master Wallet balance should increase by $100
