import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export const Trial = () => {
const [product, setProduct] = useState('')
    const db = getFirestore();
    

    const getProductData = async () => {
        try {
            const productTemp = await getDoc(
              doc(db, "allProduct", "f2f3bb64-753f-4588-b878-d07c1a904ec3")
            );
            setProduct(productTemp.data());
        } catch (error) {
            console.log(error)
            
    }
}


  return (
      <div>
          trial
          <h1>hello {product.productName }</h1>
          <Button onClick={()=>{getProductData()}}>
              press
          </Button>
      </div>
  )
}
