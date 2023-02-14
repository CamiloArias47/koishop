import { ManagedUIContext } from 'components/UIcontext'
import { ManagedCommerceContext } from 'components/CommerceContext'
import { ManagedBuyFormContext } from 'components/BuyformContext'
import { UiWindows } from 'components/UIwindows'

import Head from 'components/commons/Head'
import Navbar from 'components/commons/Navbar/Navbar'

import 'styles/globals.css'
import { globalStyles } from 'styles/styles-global'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head/>
      <ManagedCommerceContext>
        <ManagedUIContext>
          <Navbar/>
            <ManagedBuyFormContext>
              <UiWindows>
                  <section className="main-section">
                    <Component {...pageProps} />
                  </section>
              </UiWindows>
            </ManagedBuyFormContext>
        </ManagedUIContext>
      </ManagedCommerceContext>

      <style jsx global>{globalStyles}</style>
    </>
  )
}

export default MyApp
