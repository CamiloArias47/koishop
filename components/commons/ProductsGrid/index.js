import ProductCard from 'components/commons/ProductCard'
import style from './style'
export default function ProductsGrid({products}){
    return <div className="cards-grid">
            {
                products.map( prod => <ProductCard key={prod.id} 
                                                    name={prod.name} 
                                                    img={prod.photo} 
                                                    price={`$${prod.price}`}/> )
            }
            <style jsx>{style}</style>
           </div>
}