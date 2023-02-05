import { deliveryCosts, defaultDeliveryValue } from 'utils/delivery-cost'

export const getDeliveryByCity = (city, department) => {
    const citiesOfDepartment = deliveryCosts.find(depto => depto.departamento === department)
    const cityDeliveryCost = citiesOfDepartment?.ciudades?.find(currentCity => currentCity.name === city)
    return cityDeliveryCost?.delivery ?? defaultDeliveryValue
}