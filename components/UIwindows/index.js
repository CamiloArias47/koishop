import { useUI, 
         SIDEBAR_VIEWS,
         MODAL_VIEWS } from 'components/UIcontext'
import { Sidebar } from './Sidebar'
import { Modal } from './Modal'
import { ToastFrame, Toast } from './Toast'
import { Login } from 'components/commons/Login'
import { Register } from 'components/commons/Register'
import ModalNewBuy from 'components/commons/CheckoutTabs/modalNewBuy'
import { UserSidebar } from './Sidebar/UserSidebar'
import { HamburgerViewSidebar } from './Sidebar/HamburgerSidebar'
import { CarSidebar } from './Sidebar/CarSidebar'
import { BlockWindow } from 'components/UIwindows/BlockWindow'

const SideBarView = ()=>{
    const { displaySidebar, sidebarView } = useUI();
    return displaySidebar ? (
        <Sidebar>
            { sidebarView === SIDEBAR_VIEWS.USER && <UserSidebar/>}
            { sidebarView === SIDEBAR_VIEWS.CART_VIEW && <CarSidebar/>}
            { sidebarView === SIDEBAR_VIEWS.HAMBURGER && <HamburgerViewSidebar/>}
            { sidebarView !== SIDEBAR_VIEWS.USER && "" }
        </Sidebar>
    ) : null
}

const ModalView = () => {
    const {  displayModal, modalView} = useUI();

    return displayModal ? (
        <Modal> 
            { modalView === MODAL_VIEWS.LOGIN_VIEW && <Login /> }
            { modalView === MODAL_VIEWS.REGISTER_VIEW && <Register/> }
            { modalView === MODAL_VIEWS.COMFIRM_BUY_AGAIN && <ModalNewBuy/> }  
        </Modal>
    ) : null
}

const ToastView = () => {
    const { displayToast, toast } = useUI();

    if(!displayToast) return null

    let allToast = toast.map( toastData => {
        return <Toast key={toastData?.date} msg={toastData?.msg} title={toastData?.title} position={toastData?.date}/>
    })

    return <ToastFrame>{allToast}</ToastFrame>
}

const ShowWaitingWindow = () => {
    const { displayBlockWindow } = useUI();
     
    if(!displayBlockWindow) return null;

    return <BlockWindow/>
}

export const UiWindows = ({children})=>{
    return(
        <>
            <SideBarView/>
            <ModalView/>
            <ToastView />
            <ShowWaitingWindow/>
            {children}
        </>
    )
}