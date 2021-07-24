import 'styles/globals.css'
import Head from "components/commons/Head"
import Navbar from 'components/commons/Navbar/Navbar'
import {ManagedUIContext} from 'components/UIcontext'
import {UiWindows} from 'components/UIwindows'
import {globalStyles} from 'styles/styles-global'

//import useUser from 'hooks/useUser'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head/>
      <ManagedUIContext>
        <Navbar/>
        <UiWindows>
          <section className="main-section">
            <Component {...pageProps} />
          </section>
        </UiWindows>
      </ManagedUIContext>

      <style jsx global>{globalStyles}</style>
    </>
  )
}

export default MyApp
