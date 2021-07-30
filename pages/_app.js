import 'styles/globals.css'
import Head from "components/commons/Head"
import Navbar from 'components/commons/Navbar/Navbar'
import {ManagedUIContext} from 'components/UIcontext'
import { ManagedCommerceContext } from 'components/CommerceContext'
import {UiWindows} from 'components/UIwindows'
import {globalStyles} from 'styles/styles-global'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head/>
      <ManagedCommerceContext>
        <ManagedUIContext>
          <Navbar/>
          <UiWindows>
            <section className="main-section">
              <Component {...pageProps} />
            </section>
          </UiWindows>
        </ManagedUIContext>
      </ManagedCommerceContext>

      <style jsx global>{globalStyles}</style>
    </>
  )
}

export default MyApp
