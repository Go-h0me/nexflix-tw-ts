import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'

import {Movie} from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'


//lay trong typing ra va tat ca cho vao props chay lay du lieu trong mang movie


interface Props {
  trendingNow: Movie[]
  netflixOriginals: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}


const Home = ({
  trendingNow,
  netflixOriginals,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  // console.log(netflixOriginals)

  const {loading} = useAuth()
const showModal = useRecoilValue(modalState)
//same bottom
// const [showModal,setShowModal] = useState(false)


  if(loading) return null

  return (
    <div
      className="relative h-screen bg-gradient-to-b  lg:h-[140vh]
    "
    >
      <Head>
        <title>Trying Every Day - Build NetFlix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        {/* truyen xuong day */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className=''>
          <Row title="Trending Now" movies={trendingNow}/>
          <Row title="Top Rated" movies={topRated}/>
          <Row title="Action Thrillers" movies={actionMovies}/>
          {/* MyList Components */}
          <Row title="Comedies" movies={comedyMovies}/>
          <Row title="Crazy Movies" movies={horrorMovies}/>
          <Row title="Romance Movies" movies={romanceMovies}/>
          <Row title="Documentaries" movies={documentaries}/>
          {/* title & movies lay trong props Row */}
        </section>
      </main>
      {showModal && <Modal/>}
    </div>
  )
}

export default Home

//lay du lieu tu key + api utils

export const getServerSideProps = async () => {
  const [
    trendingNow,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])
//fetch nhan lay trong api trong util tra ve json 


  return {
    props: {
      trendingNow: trendingNow.results,
      netflixOriginals: netflixOriginals.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
  
}
