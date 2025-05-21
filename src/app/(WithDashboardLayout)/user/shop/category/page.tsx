import ManageCategories from '@/components/modules/shop/category';
import { getAllCategories } from '@/services/Category';
import React from 'react';

const ProductCategoryPage =async () => {
    const {data, meta} = await getAllCategories()
    console.log(data ,meta);
    
    return (
        <div>
            <ManageCategories categories={data}/>
        </div>
    );
};

export default ProductCategoryPage;