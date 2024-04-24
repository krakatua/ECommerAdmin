import HomeHeader from "@/components/HomeHeader";
import Homestats from "@/components/HomeStats";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <Homestats/>
    </Layout>
  );
}
