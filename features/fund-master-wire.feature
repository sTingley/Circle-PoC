Feature: END can move funds from a Bank Account to the Circle Master Wallet
	As END
	I want to move funds from a Bank Account to the Circle Master Wallet
	So that I can make future payouts to customers

	Scenario: Circle Master Wallet funded by Wire Transfer
		Given I have a valid Circle Master Wallet
		And I have a linked Bank Account
		When I wire $100 from the Bank Account
		Then the payment status is pending
