import { useUI, 
         SIDEBAR_VIEWS } from 'components/UIcontext'
import { Sidebar } from './Sidebar'
import { Modal } from './Modal'
import { Toast } from './Toast'
import { Login } from 'components/commons/Login'
import { Register } from 'components/commons/Register'
import { UserSidebar } from './Sidebar/UserSidebar'
import { HamburgerViewSidebar } from './Sidebar/HamburgerSidebar'
import { CarSidebar } from './Sidebar/CarSidebar'

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
            { modalView === 'login' && <Login /> }
            { modalView === 'registro' && <Register/> }
        </Modal>
    ) : null
}

const ToastView = () => {
    const { displayToast, toast } = useUI();
     
    if(!displayToast) return null;

    return <Toast msg={toast.msg} title={toast.title}/>
}

export const UiWindows = ({children})=>{
    return(
        <>
            <SideBarView/>
            <ModalView/>
            <ToastView />
            {children}
        </>
    )
}