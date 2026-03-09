import type { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/introduction" >
            Checkout the demo
          </Link>
        </div>
      </div>
    </header>
  );
}

// export default function Home(): ReactNode {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }


export default function Home(): JSX.Element {
  return (
    <Layout title="Specification">
      <main
        style={{
          padding: '4rem 1rem',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h1>Canonical Protocol Specification</h1>

        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
          Technical documentation and standards defining the Canonical protocol stack.
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <Link
            className="button button--primary button--lg"
            to="/ssf-spec-001/overview/introduction"
            style={{ marginRight: '1rem' }}
          >
            Read the Specification
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="https://github.com/Stablecoin-Stack/specs/blob/main/CONTRIBUTING.md"
          >
            Contribute
          </Link>
        </div>

        <p style={{ opacity: 0.8 }}>
          This specification is developed as an open standard.
        </p>

        <p>
          <Link to="https://stablecoinstack.org/support">
            Support the project
          </Link>
        </p>
      </main>
    </Layout>
  );
}