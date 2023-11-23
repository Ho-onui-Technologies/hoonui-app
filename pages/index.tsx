import Container from '../components/container';
import Intro from '../components/landing/landing';
import Layout from '../components/layout';
import Head from 'next/head';

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Ho'onui Technologies LLC`}</title>
        </Head>
        <Container>
          <Intro />
        </Container>
      </Layout>
    </>
  )
}