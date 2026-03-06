import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import Feature1Svg from '@site/static/img/undraw_docusaurus_mountain.svg'; //'@site/static/img/feature1.svg';
import Feature2Svg from '@site/static/img/undraw_docusaurus_mountain.svg';//'@site/static/img/feature2.svg';
import Feature3Svg from '@site/static/img/undraw_docusaurus_mountain.svg';//'@site/static/img/feature3.svg';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Stablecoin Stack</h1>
        <p>Frictionless, on-chain payments that feel like traditional banking.</p>
        <button className={styles.primaryButton}>Get Started</button>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2>Our Stack</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <Feature1Svg className={styles.featureSvg} />
            <h3>Checkout Platform</h3>
            <p>Seamless USDC/ERC2612 payments with EIP712 signature validation.</p>
          </div>
          <div className={styles.feature}>
            <Feature2Svg className={styles.featureSvg} />
            <h3>Mobile Wallet</h3>
            <p>Scan, confirm, and pay — no gas fees or blockchain knowledge required.</p>
          </div>
          <div className={styles.feature}>
            <Feature3Svg className={styles.featureSvg} />
            <h3>Merchant Dashboard</h3>
            <p>Track transactions, generate offline QR payments, and manage settlements.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2>Support Our Work</h2>
        <p>We rely on community contributions and GitHub Sponsors to keep building.</p>
        <a href="https://github.com/sponsors/stablecoin-stack" className={styles.primaryButton}>
          Sponsor Us
        </a>
      </section>

      {/* Contact / Join Section */}
      <section className={styles.contactSection}>
        <h2>Get in Touch</h2>
        <p>Questions or partnership inquiries? Reach out directly.</p>
        <a href="/docs/donate" className={styles.secondaryButton}>Contact / Donate</a>
      </section>
    </main>
  );
}