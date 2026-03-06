---
id: vision-and-principles
title: Vision & Principles
sidebar_position: 1
---

# Vision & Principles

## Vision

We believe that cryptography is the most principled foundation upon which payment authentication can be built. A cryptographically signed payment commitment is, by its nature, unforgeable, verifiable without a trusted intermediary, and entirely under the control of the person making it. It is, in many respects, a more honest representation of consent than the identity-based, delegated authorisation models that underpin most of today's payment infrastructure.

Our vision is to move towards a **user-centric payment model** — one where the authority to move funds flows from the user's own key, not from an institution's permission. Where the validity of a payment commitment can be verified by anyone, not just by a closed network of processors. Where the user is a principal, not a subject.

We acknowledge the road ahead is not simple. The challenges are real: key management remains difficult for non-technical users, network access is uneven across the world, regulatory frameworks are still forming, and the tooling for everyday stablecoin payments is still maturing. We do not dismiss these challenges — we are motivated by them.

We are convinced, however, that the gains available to payment processing from cryptographic commitment models are enormous, and that waiting for perfect conditions before experimenting is itself a strategic error. **The time to experiment is now. The time to educate is now.** The foundations we lay today — in specifications, in reference implementations, in open tooling — will determine how accessible and interoperable this infrastructure becomes when adoption accelerates.

We dream of the day that paying with a cryptographically signed commitment is as unremarkable as tapping a debit card. We believe that day is closer than it appears.

---

## On Adoption

For communities with reliable and consistent access to mobile networks, stablecoins need not be proposed as a replacement for existing payment methods. The most realistic and respectful path to adoption is as **complementary rails** — an optional, parallel system that fits specific scenarios and addresses specific needs that existing infrastructure handles poorly: cross-border transfers, payments where the parties do not share a banking relationship, micropayments where card fees are prohibitive, or simply the preference for a payment method that does not require sharing personal financial data with a merchant.

For communities with limited or intermittent access to mobile networks, the picture is different and the stakes are higher. Offline transaction signing — the ability to construct and authenticate a payment commitment without a live network connection, and to broadcast it when connectivity is restored — may represent a genuinely transformative capability for these populations. The Stablecoin Stack Foundation recognises this as an important area of future work, and intends to dedicate specification and implementation effort to it in forthcoming releases.

---

## Core Principles

### User Experience First

Technical sophistication must not be a prerequisite for using the system. Complexity belongs in the infrastructure, not in the hands of the person making a payment. Every design decision — from gasless transactions to the checkout widget — is evaluated first against the question: *does this make things simpler or harder for the end user?*

### Gas Abstraction by Default

Users should not need to acquire, hold, or reason about native gas tokens in order to make a payment. The relayer model described in this stack's specifications places the operational burden of gas management on the service provider, where it belongs. Gasless payment is not a premium feature — it is the default.

### Cryptographic Authentication Over Identity-Based Authorisation

Payments are authorised by cryptographic signatures, not by the identity of the sender as known to a third party. This means the validity of a payment commitment can be verified without contacting an issuing authority, without a live identity check, and without the payer exposing personal credentials to the merchant or processor. The key is the credential.

### Experimentation and Education as Strategic Imperatives

The infrastructure described by these specifications is novel. Adoption requires not only good tooling but also a genuine shift in how developers, merchants, and users think about payment authentication. The Foundation is committed to producing open specifications, accessible reference implementations, and educational materials that lower the barrier to understanding and building on this model. We do not wait for consensus before sharing work in progress.

### Open-Source and Transparent Development

All specifications and reference implementations produced by the Foundation are published under open licences. The development process is conducted in public. There are no proprietary extensions, no closed reference implementations, and no tollgates on conformance information.

### Merchant-Grade Reliability

Experimentation does not mean unreliability. The system is designed to provide the predictability, auditability, and operational transparency that merchants require. Real-time settlement status, reconcilable on-chain events, and deterministic fee calculations are not optional enhancements — they are baseline requirements.