# Circle-PoC

Circle Sales Representative says the following:

```
Circle is being used in production today. They support a wide variety of use cases such as NFT marketplaces, e-commerce, crypto exchanges, and a lot more. Their most notable customers that use their APIs are NBA Topshot / Dapper Labs, and FTX exchange.
```

## Notes

- Sandbox APIs mirror production environment 1-1
- `POST /v1/businessAccount/banks/wires` is for 1st party usage
- `POST /v1/banks/wires` is for 3rd party wire payments/payouts

## Constraints

- [ACH] For both payments and payouts, there is a per-transaction [limit of $25,000](https://developers.circle.com/docs/ach-guide#additional-info).
- [ACH] Sandbox environment: payout takes 16-22min to complete (but gets subtracted from balance within ~1min)
- [Wire] Sandbox environment: payout takes ~25min to complete
- If we send a previously used `idempotencyKey` (required in body of many `POST` requests), there is no indication it has already been used. Just returns `200 OK` status

### CRUD (create, read, update, delete)

Circle APIs do not currently support some basic CRUD functions

- Missing all `PUT` routes: `PUT /v1/banks/wires/{accountId}`, etc.
- Missing all `DELETE` routes: `DELETE /v1/banks/wires/{accountId}`, etc.
- Missing routes: `GET /v1/banks/wires` and `GET /v1/banks/wires`
  - This means we would have to manually store all created bank account IDs and query via `GET /v1/banks/wires/{accountId}`
- `GET /v1/banks/wires/{accountId}` does not return `metadata.beneficiaryEmail`, which is required in the body of `POST /v1/payouts`
- `GET /v1/balances` shows the sum of all wallets/accounts with no visibility into individual wallet balances
