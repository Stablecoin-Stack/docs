# SSF-SPEC-000 — The Stablecoin Stack: System Overview and Architecture

| Field | Value |
|-------|-------|
| **Document ID** | SSF-SPEC-000 |
| **Title** | The Stablecoin Stack: System Overview and Architecture |
| **Version** | 1.0.0 |
| **Status** | Draft |
| **Date** | 2026-03-04 |
| **Supersedes** | — |
| **Author(s)** |Adalton Reis \<reis@stablecoinstack.org\> |
| **Reviewers** |  —  |
| **Organization** | Stablecoin Stack Foundation |
| **Contact** | contact@stablecoinstack.org |
| **Public Address** | `0x0000000000000000000000000000000000000000` |
| **License** | Apache License 2.0 |

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [Motivation](#2-motivation)
   - 2.1 [The Case for Cryptographic Payment Commitments](#21-the-case-for-cryptographic-payment-commitments)
   - 2.2 [The Role of Stablecoins](#22-the-role-of-stablecoins)
   - 2.3 [Challenges and the Imperative to Act Now](#23-challenges-and-the-imperative-to-act-now)
3. [Vision and Design Philosophy](#3-vision-and-design-philosophy)
   - 3.1 [User-Centric by Design](#31-user-centric-by-design)
   - 3.2 [Payer Sovereignty](#32-payer-sovereignty)
   - 3.3 [Gas Abstraction as a Baseline](#33-gas-abstraction-as-a-baseline)
   - 3.4 [Complementary Rails, Not Replacement](#34-complementary-rails-not-replacement)
   - 3.5 [Open by Default](#35-open-by-default)
4. [Scope of the Stablecoin Stack](#4-scope-of-the-stablecoin-stack)
   - 4.1 [What the Stack Specifies](#41-what-the-stack-specifies)
   - 4.2 [What the Stack Does Not Specify](#42-what-the-stack-does-not-specify)
5. [Normative References](#5-normative-references)
6. [Conventions and Terminology](#6-conventions-and-terminology)
7. [System Architecture](#7-system-architecture)
   - 7.1 [Principal Actors](#71-principal-actors)
   - 7.2 [Component Overview](#72-component-overview)
   - 7.3 [Trust Boundaries](#73-trust-boundaries)
8. [Component Specifications](#8-component-specifications)
   - 8.1 [Settlement Contract](#81-settlement-contract)
   - 8.2 [Checkout Engine](#82-checkout-engine)
   - 8.3 [Broadcast Layer](#83-broadcast-layer)
   - 8.4 [Event Indexing and History](#84-event-indexing-and-history)
   - 8.5 [Basic Data Service](#85-basic-data-service)
   - 8.6 [Client Wallet](#86-client-wallet)
   - 8.7 [Merchant Dashboard](#87-merchant-dashboard)
9. [The Acquiring Model](#9-the-acquiring-model)
   - 9.1 [Overview](#91-overview)
   - 9.2 [Acquirer Registration](#92-acquirer-registration)
   - 9.3 [Fee Distribution](#93-fee-distribution)
   - 9.4 [Service Provider Discovery](#94-service-provider-discovery)
10. [End-to-End Payment Flow](#10-end-to-end-payment-flow)
    - 10.1 [Phase A — Session Creation](#101-phase-a--session-creation)
    - 10.2 [Phase B — Payload Construction and Signing](#102-phase-b--payload-construction-and-signing)
    - 10.3 [Phase C — Submission and Off-Chain Validation](#103-phase-c--submission-and-off-chain-validation)
    - 10.4 [Phase D — On-Chain Settlement](#104-phase-d--on-chain-settlement)
    - 10.5 [Phase E — Confirmation and Reconciliation](#105-phase-e--confirmation-and-reconciliation)
11. [Security Model](#11-security-model)
    - 11.1 [Threat Model](#111-threat-model)
    - 11.2 [Dual-Signature Binding](#112-dual-signature-binding)
    - 11.3 [Replay Protection](#113-replay-protection)
    - 11.4 [Payer-Agnostic Execution and its Implications](#114-payer-agnostic-execution-and-its-implications)
    - 11.5 [Ephemeral Token Security](#115-ephemeral-token-security)
    - 11.6 [mTLS for Merchant Communication](#116-mtls-for-merchant-communication)
    - 11.7 [Administrative Privilege Boundaries](#117-administrative-privilege-boundaries)
12. [Conformance](#12-conformance)
    - 12.1 [Fully Compliant Stack](#121-fully-compliant-stack)
    - 12.2 [Partial Conformance](#122-partial-conformance)
    - 12.3 [Companion Specifications](#123-companion-specifications)
13. [Future Work](#13-future-work)
14. [Versioning](#14-versioning)
15. [Change Log](#15-change-log)
16. [License](#16-license)

---

## 1. Abstract

This document is the foundational specification of the **Stablecoin Stack** — a proposed open architecture for processing stablecoin payments on Ethereum-compatible networks. It establishes the motivation, design philosophy, system architecture, component responsibilities, end-to-end payment flow, security model, and conformance requirements for the full stack.

The Stablecoin Stack is built on a central proposition: that cryptographic signatures are a superior foundation for payment authorisation compared to identity-based delegation models, and that the tooling to make this practical for everyday users is both achievable and urgently needed. All architectural decisions described herein follow directly from this proposition.

This document is the entry point for the specification series. Companion specifications address individual components in greater detail. Readers seeking to understand the system as a whole should begin here.

---

## 2. Motivation

### 2.1 The Case for Cryptographic Payment Commitments

The dominant model of payment authorisation today is one of delegated trust: a user instructs a financial institution, which in turn authorises a payment on their behalf. The user's intent is represented by a credential — a card number, a PIN, a one-time code — which is transmitted to and verified by a chain of intermediaries. At no point in this flow does the payment itself carry a verifiable proof of the payer's consent. The proof lives in the intermediary's records.

This architecture has served commerce well for decades. It is also, however, fundamentally asymmetric: the intermediaries hold the authoritative record of consent, and the user holds nothing. Disputes, reversals, and fraud mitigation are resolved by institutional decision, not by cryptographic proof.

The Stablecoin Stack proposes a different model. A **cryptographically signed payment commitment** is a piece of data that carries its own proof of authenticity. It does not require a third party to vouch for it. Anyone with access to the public key can verify that the holder of the corresponding private key produced it. The payer's intent is encoded in the data itself, bound to the specific parameters of the specific payment, and unforgeable without the payer's key.

This is not merely a technical preference. It is a meaningful shift in the locus of authority: from institution to individual, from delegated trust to verifiable proof. We believe this shift has profound implications for the accessibility, portability, and integrity of payment infrastructure — implications that are only beginning to be understood.

### 2.2 The Role of Stablecoins

Cryptographically signed payment commitments require a programmable money layer — a form of value transfer that can be authorised by a signature and executed by a smart contract. Native cryptocurrencies provide this, but their price volatility makes them unsuitable as a unit of account for commerce.

**Stablecoins** — tokens whose value is pegged to a stable reference asset, typically a fiat currency — resolve this tension. They combine the programmability and self-custody properties of on-chain tokens with the price stability required for practical commerce. For the purposes of this specification, a compliant stablecoin is any ERC-20 token that additionally implements the **ERC-2612 permit extension**, enabling off-chain signed approvals without a separate on-chain allowance transaction.

ERC-2612 is central to the Stablecoin Stack's gasless payment model. The permit mechanism allows a payer to sign an authorisation off-chain — no transaction required, no gas spent — and for a relayer to submit the resulting proof on-chain on their behalf. The payer never touches the network directly.

### 2.3 Challenges and the Imperative to Act Now

The Foundation does not approach this space with naive optimism. The challenges facing practical stablecoin payment adoption are real and significant:

- **Key management** remains the most serious usability barrier. Losing a private key means losing access to funds, with no institutional recourse. Meaningful progress requires better tooling, better defaults, and better education — not hand-waving.
- **Network access** is uneven. Reliable mobile connectivity, which this system's primary flow requires, is not universal. The Foundation acknowledges this limitation explicitly and has identified offline transaction signing as a priority area for future specification work.
- **Regulatory clarity** is still developing in most jurisdictions. Operators of compliant stacks must navigate this landscape with care and legal counsel.
- **Ecosystem maturity** — wallets, merchant tooling, and consumer familiarity — requires sustained investment to develop.

Despite these challenges, the Foundation holds that the correct response is not to wait. The infrastructure being specified here is novel. Building it, testing it, documenting it, and sharing it openly is itself the work. **Experimentation and education are not preparatory steps before the real work begins — they are the real work.** Every deployed instance, every open-source contribution, and every specification published advances the state of collective understanding.

---

## 3. Vision and Design Philosophy

Every architectural decision in the Stablecoin Stack derives from a small number of explicit design principles. This section states those principles and explains their architectural consequences.

### 3.1 User-Centric by Design

Technical complexity must not be a barrier to participation. The end user — the person making a payment — should encounter a flow that is as simple as any other mobile payment: open a wallet, confirm a transaction, done. All complexity — signature construction, nonce management, fee calculation, gas payment — is absorbed by the infrastructure and hidden behind well-designed interfaces.

This principle applies equally to merchants. A merchant integrating the Stablecoin Stack should not need to understand ERC-2612 or EIP-712. They should interact with an API that accepts standard e-commerce concepts: charges, sessions, webhooks, and reconciliation reports.

### 3.2 Payer Sovereignty

The authority to authorise a payment belongs exclusively to the payer, and that authority is expressed through cryptographic signature. No component of the stack — not the processor, not the relayer, not the checkout engine — can move funds on a payer's behalf without a valid signed authorisation. The signature is the payment commitment; everything else is infrastructure for delivering and executing it.

A corollary of this principle is that **the system is payer-agnostic**: the identity of the account that submits a transaction to the network is irrelevant to its validity. Provided the signatures are correct, the payment executes. This enables the gasless relayer model and removes any coupling between the payer's identity and their ability to transact.

### 3.3 Gas Abstraction as a Baseline

Requiring users to hold native gas tokens creates friction that is, in the context of a payment system, entirely artificial. The user wishes to pay a merchant; the requirement to first acquire ETH (or another native token) to pay for the privilege of doing so is a systems problem, not a user problem. The Stablecoin Stack resolves this at the architectural level: gas is always paid by the Relayer, which recovers costs through the processing fee. The user holds only the stablecoin they wish to spend.

### 3.4 Complementary Rails, Not Replacement

The Stablecoin Stack does not position itself as a replacement for existing payment infrastructure. For communities with reliable mobile network access, it is a set of **complementary rails** — an optional, additional payment method that is particularly well-suited to cross-border transfers, privacy-preserving payments, contexts where the parties lack a shared banking relationship, and scenarios where programmable settlement logic adds value.

For communities with limited connectivity, the vision extends further. The Foundation intends to specify and implement offline transaction signing in future work, which could make cryptographically-committed payments available in environments where real-time network access cannot be assumed.

### 3.5 Open by Default

All specifications, reference implementations, and supporting materials produced by the Foundation are published under open licences. There are no proprietary extensions, no closed conformance test suites, and no tollgates on the information required to build a compliant implementation. The Foundation's competitive advantage is not control of the specification — it is the quality of the specification and the infrastructure that surrounds it.

---

## 4. Scope of the Stablecoin Stack

### 4.1 What the Stack Specifies

The Stablecoin Stack specification series covers:

- the on-chain Settlement Contract responsible for permit verification, token transfer, fee distribution, and acquirer registration;
- the payload structures, signing conventions, and submission protocol by which a client presents a payment authorisation to a processor;
- the Checkout Engine interface through which merchants create payment sessions and receive settlement confirmation;
- the Broadcast Layer through which signed payloads are validated off-chain and relayed on-chain;
- the Event Indexing service that monitors on-chain activity and feeds confirmed transactions back into the off-chain system;
- the Basic Data Service that provides shared reference data to all components;
- the Client Wallet interface requirements for producing compliant signed payloads and interacting with the Broadcast Layer; and
- the Acquiring Model that defines how third-party acquirers participate in the system and earn fees.

### 4.2 What the Stack Does Not Specify

The following are explicitly out of scope for the current specification series:

- **Key management and custody**: how private keys are generated, stored, backed up, or recovered is a wallet implementation concern and is not specified here.
- **Token issuance and redemption**: the mechanisms by which stablecoins are minted, backed, and redeemed are outside the scope of this specification.
- **Regulatory compliance**: operators are responsible for ensuring their deployments comply with applicable laws. The Foundation provides no legal guidance.
- **Network-layer security below TLS**: physical and network security of the infrastructure on which components are deployed is an operator responsibility.
- **Offline transaction signing**: this is identified as future work in Section 13.

---

## 5. Normative References

| Reference | Description |
|-----------|-------------|
| ERC-20 | Token Standard — Ethereum Improvement Proposal 20 |
| ERC-2612 | Permit Extension for EIP-20 Signed Approvals |
| EIP-712 | Typed Structured Data Hashing and Signing |
| ECDSA | Elliptic Curve Digital Signature Algorithm (FIPS 186-4) |
| SEC 1 v2.0 | Elliptic Curve Cryptography — SECG Standard |
| RFC 2119 | Key words for use in RFCs to Indicate Requirement Levels |
| RFC 4648 | The Base16, Base32, and Base64 Data Encodings |
| RFC 5246 | The Transport Layer Security (TLS) Protocol Version 1.2 |
| RFC 8446 | The Transport Layer Security (TLS) Protocol Version 1.3 |
| RFC 8705 | OAuth 2.0 Mutual-TLS Client Authentication |
| [SSF-SPEC-001](../ssf-specs-001/001-instant-payment-with-permitted-token-transfer-submission.md) | Instant Payment With Permitted Token Transfer — Submission |
| [SSF-SPEC-002](../ssf-specs-002/002-settlement-contract.md) | The Settlement Contract — Canonical |

---

## 6. Conventions and Terminology

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHOULD**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in RFC 2119.

| Term | Definition |
|------|------------|
| Stablecoin Stack | The full set of components, protocols, and interfaces specified by this document series. |
| Payment Processor | An operator that deploys and runs a conformant instance of the Stablecoin Stack. Responsible for running the Broadcast Layer, Checkout Engine, and Relayer. |
| Relayer | The account that submits signed transactions on-chain on behalf of payers, absorbing gas costs. Operated by the Payment Processor. |
| Merchant | A business or individual that accepts stablecoin payments by integrating with the Checkout Engine. |
| Payer | The individual who holds the stablecoin and signs the payment commitment. |
| Acquirer | A registered third-party participant entitled to a share of the processing fee on payments they referred. Acquirers interact with the Settlement Contract directly via the `buyAcquiringPack` function. |
| Service Provider | An Acquirer who has opted in to public discovery via the Basic Data Service. Visible to wallets as a selectable payment provider. |
| Settlement Contract | The on-chain Solidity smart contract that verifies permit and binding signatures, executes token transfers, and distributes fees. Specified in SSF-SPEC-002. |
| Permit Signature | An ERC-2612 off-chain signature authorising the Settlement Contract to call `permit()` on a token contract, granting a token allowance. |
| Binding Signature | An EIP-712 signature over the full operation parameters, authorising the processor to submit a specific payment or acquirer registration operation. |
| Charge | A processor-issued record representing an expected payment of a specific amount, in a specific token, to a specific merchant, within a specific time window. |
| Session | The lifecycle context of a single charge, from creation through to settlement or expiry. |
| Order Reference  | A 16-bytes reference, created by the merchant for tracking purposes. Embedded in the on-chain `PermittedTransfer` (concatenated with the `AcquirerID`) event and used for settlement reconciliation. |
| Payload ID        | Client-generated identifier correlating this submission with a specific broadcasting intent. Both the client and the processor MUST use this ID to ensure request idempotency; the processor MUST validate that this ID is known, currently unprocessed, and unique to the broadcast session.. |
| Acquirer ID | A 16-byte (`bytes16`) UUID that uniquely identifies a registered Acquirer within the Settlement Contract. |
| Zero-UUID | The Acquirer ID consisting entirely of zero bytes. Used to indicate the absence of an Acquirer on a given payment. |
| Ephemeral Token | A short-lived, single-use token issued by the Checkout Widget that authorises a wallet to retrieve session payment details. |
| EVM Address | A 20-byte Ethereum account identifier, encoded as a 42-character hex string (`0x` + 40 lowercase hex digits). |

---

## 7. System Architecture

### 7.1 Principal Actors

The Stablecoin Stack involves four principal actors whose interactions drive every payment flow:

| Actor | Role |
|-------|------|
| **Merchant** | Creates charges and receives settlement confirmation. Integrates with the Checkout Engine over mTLS. Does not interact directly with the blockchain. |
| **Payer** | Holds the stablecoin, signs the payment commitment, and submits the payload via a compliant wallet. Never submits transactions directly to the network. |
| **Payment Processor** | Operates the off-chain infrastructure (Checkout Engine, Broadcast Layer, Relayer). Acts as the trusted intermediary between Merchants and the on-chain Settlement Contract. |
| **Acquirer** | A registered third party who distributes the payment service to payers and earns a share of the processing fee. May operate as a public Service Provider. |

### 7.2 Component Overview

A fully conformant Stablecoin Stack deployment consists of the following components:

| Component | Category | Specification |
|-----------|----------|---------------|
| Settlement Contract | On-chain | SSF-SPEC-002 |
| core-checkout-engine | Checkout Engine | SSF-SPEC-001, this document |
| checkout-public-widget | Checkout Engine | This document |
| ca-server | Checkout Engine (infrastructure) | This document |
| login-server | Checkout Engine (infrastructure) | This document |
| credentials-manager | Checkout Engine (infrastructure) | This document |
| merchant-dashboard | Checkout Engine (merchant UI) | This document |
| wallet-gateway | Broadcast Layer | SSF-SPEC-001, this document |
| broadcast-service | Broadcast Layer | This document |
| broadcast-submitter | Broadcast Layer | This document |
| balance-and-history | Broadcast Layer | This document |
| transfer-history | Event Indexing | This document |
| basic-data-server | Shared Infrastructure | This document |
| Client Wallet | Client | SSF-SPEC-001 |

### 7.3 Trust Boundaries

Understanding the trust model is essential for reasoning about the security properties of the system.

**Fully trusted by the payer:**
- The payer's own private key and the wallet software that manages it. No other component is trusted to act on the payer's behalf without a valid signature.

**Trusted by the merchant, within a verified mTLS session:**
- The core-checkout-engine, which receives charge creation requests and delivers settlement confirmation.

**Trusted to relay faithfully, but not trusted with funds:**
- The Payment Processor and Relayer. They can submit transactions, but cannot construct valid signatures without the payer's key. A malicious Processor cannot forge a payment.

**Trusted as a shared public resource:**
- The basic-data-server. It holds no private state and serves only public reference data. Its integrity is a reputational concern, not a cryptographic one.

**Trust-minimised — verified on-chain:**
- The Settlement Contract. Its behaviour is determined by its code, verified independently by the blockchain network. No component of the off-chain system can alter its execution.

---

## 8. Component Specifications

### 8.1 Settlement Contract

The Settlement Contract is the trust anchor of the entire system. It is the only component whose correctness can be verified without trusting any operator. All payment value flows through it; all fee distribution is executed by it; all acquirer registrations are recorded in it.

Its responsibilities are:

- verifying the Permit Signature against the ERC-2612 token contract;
- verifying the Binding Signature against the processor's authorisation;
- preventing replay attacks by recording consumed Binding Signature hashes in `usedHashes`;
- transferring the full payment amount from the payer via `permit()` and `transferFrom()`;
- computing and distributing fees to the processor and, if applicable, the acquirer;
- crediting the principal amount to the merchant beneficiary; and
- registering new acquirers upon receipt of a valid `buyAcquiringPack` call.

The Settlement Contract MUST be deployed by the Payment Processor and its address MUST be published as part of the processor's public configuration in the Basic Data Service. The full interface specification is provided in **SSF-SPEC-002**.

### 8.2 Checkout Engine

The Checkout Engine is the merchant-facing subsystem. It manages the lifecycle of payment sessions from charge creation through to final reconciliation. It is the component that knows the business context of a payment — what was purchased, by whom it was requested, and whether it has been paid.

The Checkout Engine comprises:

**core-checkout-engine** — The central service. Exposes an API to merchant servers for session creation, charge management, and reconciliation queries. Receives confirmed settlement events from the transfer-history service and marks the corresponding charges as settled. Communication with merchants is secured by mutual TLS (mTLS).

**checkout-public-widget** — A payment page hosted by the Payment Processor. This is the user-facing surface where the wallet retrieves session details. The widget displays the merchant-supplied order information and issues an Ephemeral Token that the wallet uses to fetch the payment parameters needed to assemble a signed payload. The widget does not accept payment directly; it serves only as a secure information delivery mechanism between the Checkout Engine and the wallet.

**ca-server** — An internal Certificate Authority that issues and manages the client and server certificates used in the mTLS sessions between merchant servers and the core-checkout-engine.

**login-server** — Provides merchants with a mechanism to obtain JWT bearer tokens within the mTLS context, simplifying programmatic API access.

**credentials-manager** — Administrative service for certificate lifecycle management and user administration. Interfaces with the ca-server and with the Keycloak identity service. Used by Payment Processor administrators and by automated provisioning workflows.

**merchant-dashboard** — The merchant-facing web interface. Provides account management, real-time order monitoring, fee reporting, and statistical views of payment activity.

### 8.3 Broadcast Layer

The Broadcast Layer is responsible for the receipt, validation, queuing, submission, and real-time status reporting of signed payment payloads. It is the off-chain counterpart to the Settlement Contract, and the component with which the client wallet interacts directly.

**wallet-gateway** — The external entry point for wallet connections. Accepts payload submissions and maintains persistent WebSocket connections to deliver real-time status updates. All wallet-to-processor communication passes through this component. This component also provides nonce retrieval and fee calculation. While these two last functions can be executed by the client wallet alone, by performing an on-chain call, the Stablecoin Stack aims at providing a model such that the wallet does depend on blockchain integration. This choice minimises the friction on building and maintaining client wallet therefore it is aligned with the general purpose of this Foundation.

**broadcast-service** — Manages the internal lifecycle of a submission. Enqueues validated payloads for broadcasting and tracks each submission through a defined set of states. State transitions are published in real time to connected wallets via the wallet-gateway. The following distinction is critical: **submission completion** means the Relayer received no revert when broadcasting the transaction to the network — it does not mean the transaction has achieved finality. Finality is confirmed later, when the corresponding event is collected by the transfer-history service after a sufficient number of block confirmations.

**broadcast-submitter** — The component that holds the Relayer's funded account and submits signed payloads on-chain. This is the only component in the off-chain stack that issues Ethereum transactions.

**balance-and-history** — Maintains a real-time view of known wallet balances and transaction history for wallets registered with the system. Delivers on-chain transfer notifications to wallets over WebSocket connections.

### 8.4 Event Indexing and History

**transfer-history** — Monitors the Settlement Contract and all supported ERC-2612 token contracts for on-chain events. It is the authoritative source of confirmed, finalised transaction data within the off-chain stack. When a `PermittedTransfer` event is observed with sufficient block confirmation depth, transfer-history publishes the confirmation to the Checkout Engine, which uses the `ref` field to reconcile the corresponding charge. This service has no write authority over any other component; it is a read-and-publish relay.

### 8.5 Basic Data Service

**basic-data-server** — A publicly accessible, read-only service that provides shared reference data consumed by multiple components of the stack. Its primary data sets are:

- the list of ERC-2612-compliant stablecoins supported by the processor;
- the registry of registered Acquirers who have opted in to public discovery (Service Providers); and
- the public wallet addresses and configuration of the Payment Processor.

This service is intentionally designed to be operable as a shared public resource. The Foundation intends to operate a canonical instance as a free public good for the ecosystem, covering multiple compliant processor deployments.

### 8.6 Client Wallet

A compliant Client Wallet is any application that can:

- retrieve payment session details from the checkout-public-widget using an Ephemeral Token;
- read the payer's ERC-2612 nonce from the token contract;
- construct and sign a valid `PermitParams` structure using EIP-712;
- construct and sign a valid `PayWithPermitParams` structure using EIP-712;
- assemble a complete `TransferRequest` payload as specified in SSF-SPEC-001;
- submit the payload to the wallet-gateway and maintain a WebSocket connection for status updates; and
- present the payment status to the user in a clear and timely manner.

The wallet MUST NOT transmit the payer's private key or seed phrase to any remote service at any time. All signing MUST be performed locally on the user's device.

The reference wallet is implemented in Flutter and is designed around a **Service Provider** selection model, allowing users to choose their preferred Acquirer on the basis of fee, reputation, or personal preference.

### 8.7 Merchant Dashboard

The merchant-dashboard provides merchants with a self-service interface to manage their integration with the Checkout Engine. It does not interact with the blockchain directly. Its backend delegates all payment session and reconciliation logic to the core-checkout-engine. Merchants access it using credentials managed by the credentials-manager.

---

## 9. The Acquiring Model

### 9.1 Overview

The Stablecoin Stack incorporates a first-class acquiring model that allows third-party participants — **Acquirers** — to distribute the payment service and earn a share of the processing fee. This model is analogous to the acquirer role in traditional card payment networks, but implemented transparently and on-chain.

Acquirers are identified by a `bytes16` UUID **Acquirer ID**. When a payer includes an Acquirer ID in a payment, the Settlement Contract automatically distributes the acquiring fee to the registered acquirer's balance. This distribution is atomic with the payment itself and is reflected in the on-chain `CommissionGenerated` event.

### 9.2 Acquirer Registration

Registration is performed by calling `buyAcquiringPack` on the Settlement Contract, accompanied by:

- payment of the registration fee (`acquiringPrice`) in an accepted stablecoin;
- selection of a fee percentage, subject to the `maxAcquiringFee` ceiling; and
- the wallet address to be registered as the acquirer.

The payer and the account being registered do not need to be the same address, enabling delegated or sponsored registration.

Upon successful registration, a new Acquirer ID is assigned on-chain and the `AcquirerCreated` event is emitted. The full registration flow is specified in SSF-SPEC-002.

### 9.3 Fee Distribution

Every payment processed by the Settlement Contract is subject to two fee components:

| Fee | Type | Recipient |
|-----|------|-----------|
| Base Fee (`baseFeeAmount`) | Absolute, in token units | Payment Processor fee recipient |
| Acquiring Fee | Percentage of principal | Registered Acquirer (if Acquirer ID is non-zero) |

The acquiring fee is applied only when the payment includes a non-zero Acquirer ID. Payments without an Acquirer ID use the **Zero-UUID** as a convention to suppress the acquiring fee component without reverting.

Fee computation helpers (`calculateFees` and `breakdownTransferAmount`) are provided on the Settlement Contract to allow checkout integrations and wallets to present accurate total amounts to payers prior to signing.

### 9.4 Service Provider Discovery

An Acquirer who wishes to be discoverable by wallet users MAY publish their information to the Basic Data Service, where they appear as a **Service Provider**. This opt-in mechanism allows wallets to present users with a curated list of available providers, enabling selection based on fee rates, reputation, or other criteria.

This model gives users meaningful choice without requiring them to understand the underlying acquiring infrastructure. From the user's perspective, they are simply selecting a payment service they trust.

---

## 10. End-to-End Payment Flow

This section describes the complete payment flow, from charge creation by the merchant to final settlement confirmation. All references to payload structures and signature conventions should be read in conjunction with SSF-SPEC-001. All references to on-chain function behaviour should be read in conjunction with SSF-SPEC-002.

### 10.1 Phase A — Session Creation

1. The Merchant Server sends a charge creation request to the **core-checkout-engine** over a mutually authenticated TLS session. The request includes the payment amount, the accepted token, the merchant's beneficiary address, and any order metadata.
2. The core-checkout-engine generates a unique 32-byte **Order Reference** (`ref`), a **Payload ID**, and a `deadline` timestamp. A new charge session is created and persisted in the awaiting-payment state.
3. The core-checkout-engine returns the Checkout Widget URL and an **Ephemeral Token** to the Merchant Server. The merchant presents this to the payer via QR code, deep-link, or redirect.

### 10.2 Phase B — Payload Construction and Signing

4. The **Client Wallet** redeems the Ephemeral Token against the **checkout-public-widget** to retrieve the payment parameters: token address, beneficiary address, amount, `ref`, and `deadline`. The Ephemeral Token is invalidated upon first use.
5. The wallet reads the payer's current ERC-2612 permit nonce from the token contract.
6. The wallet constructs `PermitParams` (owner, spender, value, nonce, deadline) and signs the ERC-2612 Permit typed-data using EIP-712, producing the **Permit Signature**.
7. The wallet constructs `PayWithPermitParams` (token, beneficiary, ref, permitParams) and signs it using EIP-712, producing the **Binding Signature**.

### 10.3 Phase C — Submission and Off-Chain Validation

8. The wallet assembles the complete `TransferRequest` payload and submits it to the **wallet-gateway**. A WebSocket connection is maintained for real-time status updates.
9. The **broadcast-service** enqueues the submission and the **wallet-gateway** acknowledges receipt.
10. The Payment Processor performs structural, semantic, and cryptographic validation as specified in SSF-SPEC-001, Section 7. Any validation failure results in immediate rejection with a categorised error.

### 10.4 Phase D — On-Chain Settlement

11. The **broadcast-submitter** (Relayer) broadcasts the transaction by calling `transferWithPermit` on the Settlement Contract, paying gas from its own funded account.
12. The Settlement Contract verifies the Binding Signature and checks that its hash is not present in `usedHashes`. It then calls `permit()` on the token contract using the Permit Signature, granting itself an allowance.
13. The Settlement Contract calls `transferFrom` to collect the full amount from the payer. It computes and distributes fees, credits the principal to the beneficiary, records the Binding Signature hash in `usedHashes`, and emits the `PermittedTransfer` event (and `CommissionGenerated` if an Acquirer was involved). All of this occurs atomically within a single transaction.
14. The broadcast-service receives the transaction hash and updates the submission status to reflect that the transaction has been broadcast without revert. This status update is delivered to the wallet over WebSocket. **This does not represent final settlement.**

### 10.5 Phase E — Confirmation and Reconciliation

15. The **transfer-history** service observes the `PermittedTransfer` event on-chain. After a configurable number of block confirmations, it publishes the confirmed event to the core-checkout-engine.
16. The **core-checkout-engine** matches the event's `orderReference` (`ref`) against its session registry and marks the corresponding charge as settled.
17. The core-checkout-engine dispatches a settlement webhook to the **Merchant Server**, carrying the final status and the on-chain reference.
18. The **balance-and-history** service detects the confirmed transfer and delivers a final settlement notification to the wallet over WebSocket.

---

## 11. Security Model

### 11.1 Threat Model

The Stablecoin Stack is designed to resist the following classes of adversarial behaviour:

| Threat | Mitigation |
|--------|-----------|
| Forged payment commitment | ECDSA signature; only the payer's private key can produce a valid Permit or Binding Signature |
| Replay of a valid signature | `usedHashes` registry in the Settlement Contract; ERC-2612 nonce on the token contract |
| Parameter substitution (change recipient, amount, or token after signing) | Binding Signature covers all operation parameters; any modification invalidates the signature |
| Processor submitting a payment to the wrong beneficiary | Beneficiary is embedded in the Binding Signature; alteration invalidates the signature |
| Expired permit executed after deadline | Settlement Contract enforces `block.timestamp ≤ deadline`; token contract enforces the same |
| Session replay (same payloadId submitted twice) | Processor enforces single-use payloadId at the off-chain validation layer |
| Malicious Relayer double-spending | Impossible without a valid Binding Signature; the Relayer holds no signing authority |
| Merchant server impersonation | mTLS mutual authentication between merchant servers and core-checkout-engine |
| Ephemeral token interception | Short lifetime and single-use invalidation; contains no signing authority |

### 11.2 Dual-Signature Binding

The security of the payment flow rests on two independent ECDSA signatures, each serving a distinct purpose:

The **Permit Signature** authorises a specific token contract to grant an allowance to the Settlement Contract. It is validated by the ERC-2612 token contract inside its `permit()` function. Its scope is limited to the allowance grant; it does not determine where funds go or how much is taken in fees.

The **Binding Signature** authorises the processor to execute a specific operation — including the token, the beneficiary, the amount, the fee structure, and the order reference — against the Settlement Contract. It is validated by the Settlement Contract itself. Without a valid Binding Signature, the Settlement Contract MUST revert.

Neither signature alone is sufficient to execute a payment. A valid Permit Signature without a valid Binding Signature results in an allowance with no execution. A valid Binding Signature without a valid Permit Signature results in a settlement attempt with no allowance — the `transferFrom` call will fail.

### 11.3 Replay Protection

Replay protection is enforced at two independent layers:

- **ERC-2612 nonce** — the token contract tracks a per-owner nonce. Each issued permit increments the nonce, invalidating all previously issued permits for that owner. This prevents a Permit Signature from being reused.
- **`usedHashes` registry** — the Settlement Contract records the EIP-712 digest of every consumed Binding Signature. Any subsequent transaction presenting the same digest MUST revert. This prevents a Binding Signature from being reused even if a new permit with identical parameters were issued.

Both controls MUST be active in a conformant implementation. They are complementary, not redundant.

### 11.4 Payer-Agnostic Execution and its Implications

The payer-agnostic model — wherein the Settlement Contract does not validate the identity of `msg.sender` — is an intentional design choice that enables the gasless relayer model. Its security implication is that **any party in possession of both valid signatures can submit the transaction**. This is acceptable because:

1. the signatures bind the payment to specific parameters, including the beneficiary and the amount;
2. the `usedHashes` registry ensures the same signatures cannot be used more than once; and
3. submitting a valid transaction on behalf of a payer is not harmful to the payer — it is precisely what they authorised.

The consequence is that the security of the payer's funds depends entirely on the confidentiality of their signed payloads prior to submission. Clients MUST submit payloads over TLS and MUST NOT persist signed payloads in environments accessible to untrusted parties.

### 11.5 Ephemeral Token Security

The Ephemeral Token issued by the checkout-public-widget is a time-bounded, single-use credential. It authorises its holder to read the payment parameters for a specific session. It confers no signing authority and contains no private key material. Its principal security properties are:

- **Short lifetime**: the token MUST expire within a processor-configured window, RECOMMENDED to be no longer than 5 minutes.
- **Single use**: the token MUST be invalidated upon first successful redemption.
- **No signing authority**: possession of an Ephemeral Token does not enable payment. The payer's private key is still required to produce valid signatures.

### 11.6 mTLS for Merchant Communication

Communication between Merchant Servers and the core-checkout-engine is protected by mutual TLS. Both parties present certificates issued by the ca-server, ensuring that:

- the Merchant Server is communicating with a legitimate core-checkout-engine instance (server authentication); and
- the core-checkout-engine is accepting requests only from authorised Merchant Servers (client authentication).

JWT bearer tokens obtained via the login-server provide application-layer authorisation within the authenticated TLS session.

### 11.7 Administrative Privilege Boundaries

The Settlement Contract is designed with a strict separation between administrative and custodial authority. The Administrator (the Payment Processor account) MUST be able to:

- set `baseFeeAmount`, `maxAcquiringFee`, `acquiringPrice`, and the fee recipient address.

The Administrator MUST NOT be able to:

- transfer tokens held in the contract's balance on behalf of any participant;
- modify the `usedHashes` registry; or
- alter the registered wallet address or fee percentage of an existing Acquirer without their consent.

This constraint MUST be enforced at the contract code level and verified by independent audit.

---

## 12. Conformance

### 12.1 Fully Compliant Stack

A **fully conformant** Stablecoin Stack deployment MUST include:

- a deployed Settlement Contract that satisfies all requirements of SSF-SPEC-002;
- a Checkout Engine that satisfies all interface requirements specified in this document and SSF-SPEC-001;
- a Broadcast Layer that validates, queues, and submits payloads in accordance with SSF-SPEC-001;
- a transfer-history service that monitors and reports confirmed on-chain events; and
- a Basic Data Service accessible to wallets and other components.

A fully conformant Client Wallet MUST satisfy all wallet requirements stated in SSF-SPEC-001 and this document.

### 12.2 Partial Conformance

Components MAY be implemented and deployed independently. A conformant Settlement Contract MAY be used with a non-reference Checkout Engine. A conformant wallet MAY interact with any Settlement Contract and Broadcast Layer that satisfies the specified interfaces. Partial conformance MUST be declared explicitly by the implementer, with clear indication of which specifications are and are not satisfied.

### 12.3 Companion Specifications

This document is the entry point for the specification series. The following companion specifications provide detailed normative requirements for individual components:

| ID | Title | Status |
|----|-------|--------|
| [SSF-SPEC-001](../ssf-specs-001/001-instant-payment-with-permitted-token-transfer-submission.md) | Instant Payment With Permitted Token Transfer — Submission | Draft |
| [SSF-SPEC-002](../ssf-specs-002/002-settlement-contract.md)  | The Settlement Contract — Canonical | Draft |

Additional specifications covering the Checkout Engine API, the Broadcast Layer protocol, the Basic Data Service API, and the wallet integration interface are planned for subsequent releases.

---

## 13. Future Work

The following areas are identified as priorities for future specification and implementation work by the Foundation:

**Offline Transaction Signing** — Enabling payers to construct and sign a payment commitment without a live network connection, and to submit it when connectivity is restored. This capability is of particular importance for populations with limited or intermittent mobile network access and represents a meaningful expansion of the system's accessibility.

**Multi-Network Support** — The current specifications target Ethereum-compatible networks. Extending conformance to non-EVM networks with simillar or equivalent programmable token standards is a planned area of future work.

**Checkout Engine API Specification** — A formal specification of the API exposed by the core-checkout-engine to merchant servers, covering session creation, charge lifecycle management, webhook delivery, and reconciliation queries.

**Broadcast Layer Protocol Specification** — A formal specification of the WebSocket protocol used between the wallet and the wallet-gateway, covering message formats, state machine definitions, and error handling.

**Wallet Certification Programme** — A conformance test suite and certification programme for third-party wallet implementations, enabling users to verify that a given wallet correctly implements the signing and submission protocols.

**Acquirer Incentive Structures** — Further specification of the fee tier and pricing models available to acquirers, enabling more sophisticated market structures while preserving the on-chain enforceability of fee caps.

**Ref field**  — The `ref` currently holds two values that serve distinct and non-dependant purposes. It holds the `order reference`, whic A future vertion

---

## 14. Versioning

This specification follows [Semantic Versioning 2.0.0](https://semver.org). Version increments carry the following meaning:

| Segment | Meaning |
|---------|---------|
| **MAJOR** | A backwards-incompatible change to the system architecture, component interfaces, security model, or conformance requirements. |
| **MINOR** | Addition of new components, flows, or requirements that do not break existing conformant implementations. |
| **PATCH** | Editorial corrections, clarifications, and non-normative changes that do not affect conformance. |

All companion specifications are versioned independently but MUST declare the version of SSF-SPEC-000 to which they conform.

---

## 15. Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-04 | Adalton Reis | Initial release. |

---

## 16. License

Copyright © 2026 Stablecoin Stack Foundation. All rights reserved.

This specification is published under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0). Unless required by applicable law or agreed to in writing, material distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.