import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';

class ProductsDb {

    constructor() {
        this.firebaseConfig = {
            apiKey: process.env.APIKEY,
            authDomain: process.env.AUTHDOMAIN,
            projectId: process.env.PROJECTID,
            storageBucket: process.env.STORAGEBUCKET,
            messagingSenderId: process.env.MESSAGINGSENDERID,
            appId: process.env.APPID,
        };

        const firebaseApp = initializeApp(this.firebaseConfig);
        this.db = getFirestore(firebaseApp)
    }

    async getProducts() {
        const productsCol = collection(this.db, 'products');
        const productsSnapshot = await getDocs(productsCol);
        const productsList = productsSnapshot.docs.map(doc => {
            let data = doc.data()
            data.id = doc.id
            return data
        });
        return productsList;
    }

    async createProduct(product) {
        const productsCol = collection(this.db, 'products');
        const createdProduct = await addDoc(productsCol, product);
        return createdProduct.id;
    }

    async updateProduct(product, id) {
        const productRef = doc(this.db, 'products', id);
        await updateDoc(productRef, product);

        return id;
    }

    async deleteProduct(id) {
        const productRef = doc(this.db, 'products', id);
        await deleteDoc(productRef);

        return id;
    }

}

export default ProductsDb;