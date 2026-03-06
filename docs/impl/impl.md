--- 
id: impl
title: Reference Implementation
sidebar_position: 3
---

# Reference Implementation

The **Stablecoin Stack Foundation** provides a reference implementation for all published specifications. This implementation is intended solely as an educational resource — a means of understanding the specifications in a concrete, runnable form, and in some cases as a starting point for your own integrations.

> **This reference implementation is not production-ready.** It has not been hardened for adversarial environments, audited for security, or optimised for operational scale. Use it to learn, not to deploy.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Application framework | NestJS (TypeScript) |
| Message broker | Apache Kafka |
| Primary database | PostgreSQL + TypeORM |
| Cache / ephemeral state | Redis |
| Identity & access management | Keycloak |
| Containerization | Docker |
---

## Architecture

The system is composed of a set of backend microservices, a mobile wallet application, and a merchant-facing dashboard. The microservices are grouped into three functional categories.

### Basic Infrastructure

These services underpin the rest of the stack. They are stateful, long-running, and consumed by most other services.

- **transfer-history** — Watches the Settlement Contract and the token contracts of all supported stablecoins for on-chain events. It is the authoritative source of confirmed transaction data within the stack.
- **basic-data-server** — Centralises commonly referenced data: the list of supported tokens, registered acquirers, and the public wallet addresses of payment processors. This service is designed to be operated as a public, free endpoint and could be hosted and maintained directly by the Stablecoin Stack Foundation as shared infrastructure for the ecosystem.

### Transaction Broadcasting and Real-Time Updates

These services handle the lifecycle of a payment submission from the moment a signed payload is received through to on-chain confirmation.

- **broadcast-gateway** — The entry point for the wallet to interact with the system. Accepts incoming submission requests and delivers real-time status updates to the wallet over WebSockets.
- **broadcast-service** — Enqueues broadcast requests and tracks their status through each stage of submission. Real-time updates are pushed to connected clients at each status transition. Note: *submission completion* in this context means the relayer received no revert upon broadcasting the transaction — it does not imply transaction finality. Finality is confirmed separately, once a sufficient number of block confirmations have been observed and the corresponding event has been collected by **transfer-history**.
- **broadcast-submitter** — Submits signed payloads to the network (i.e., broadcasts transactions on-chain). This is the component that holds the relayer's funded account.
- **balance-and-history** — Maintains the known state of user wallets and provides real-time updates over WebSockets when transfers affecting those wallets are detected on-chain.

### Checkout Engine

These services support the merchant-facing payment flow, from session creation through to reconciliation.

- **core-checkout-engine** — Accepts requests from merchant servers to create payment sessions, generates charges, and reconciles them against on-chain confirmed transactions collected by **transfer-history**. Communication with merchant servers is protected by mutual TLS (mTLS).
- **ca-server** — Internal Certificate Authority responsible for issuing and managing the TLS certificates used to secure communication with **core-checkout-engine**.
- **login-server** — Provides merchants with a straightforward mechanism to obtain JWT tokens within the mTLS-protected context.
- **credentials-manager** — Administrative service that interacts with the Keycloak server for user management and with **ca-server** for certificate issuance and revocation. Used by payment processor administrative staff and by automated provisioning workflows.
- **merchant-dashboard** — The merchant-facing UI and its backend. Allows merchants to manage their account, view detailed statistics, and monitor a real-time order history.
- **checkout-public-widget** — A securely hosted checkout page, served directly by the payment processor. This is the page from which the wallet collects the information needed to assemble a payment payload. The page displays the purchased items supplied by the merchant and issues an **ephemeral token** — a short-lived, single-use token that a mobile wallet or any authorised client may use to retrieve the payment details. The ephemeral token's lifetime is intentionally brief to limit the window of exposure.

---

## Mobile Wallet

The reference wallet is built with **Flutter**, providing a clean, focused, gasless stablecoin wallet for Android and iOS. It is designed around the concept of **service providers**, allowing users to switch providers freely — choosing on the basis of fee competitiveness, reliability, reputation, personal trust, etc.

A *service provider* in this context is a registered acquirer who has opted in to having their data included in the public registry maintained by **basic-data-server**. By making provider selection a first-class user choice, the reference wallet embodies the open and non-exclusive nature of the acquiring model described in [SSF-SPEC-001](../specs/ssf-specs-001/001-instant-payment-with-permitted-token-transfer-submission.md) .