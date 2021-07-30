import  Image  from 'next/image'
export default function Category({categories}){
    const catsDivs = categories.map( cat => {
        return(
            <div key={cat.id}>
                {cat.name}
                <Image src={cat.photo} width="32" height="32"/>
            </div>
        )
    }) 
    return(
        <div>
            {catsDivs}
        </div>
    )
}

export async function getStaticProps(context) {
    return {
      props: {
          categories:[
            {
                "name": "LoadFisre",
                "photo": "https://firebasestorage.googleapis.com/v0/b/koishop-dev.appspot.com/o/categories%2Fcat5.jpg?alt=media&token=bf52336e-d97e-4a2e-afcb-07a497fd48a7",
                "id": "hkjUSmNlnT4QRM8JNlW9"
            },
            {
                "photo": "https://firebasestorage.googleapis.com/v0/b/koishop-dev.appspot.com/o/categories%2Fcat1.jpg?alt=media&token=181e842a-05b4-41e4-a2a5-978ddd67d6da",
                "name": "LoadInitial",
                "id": "mClrEi5Kajk9Rdbwo9wv"
            },
          ]
      }, // will be passed to the page component as props
    }
  }